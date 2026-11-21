// One-off migration: moves identity to Cognito and images to S3, so the app
// can run fully on the Cognito + API Gateway/Lambda + S3 architecture.
// Idempotent — safe to re-run (already-migrated users/docs are skipped).
//
// Usage (run inside the frontend container, with AWS creds injected):
//   docker compose exec \
//     -e AWS_ACCESS_KEY_ID=... -e AWS_SECRET_ACCESS_KEY=... -e AWS_REGION=us-east-2 \
//     -e COGNITO_USER_POOL_ID=us-east-2_p38HjKWPB -e IMAGES_BUCKET=foodhub-images-229251310842 \
//     frontend node scripts/migrate-to-cognito.mjs
import crypto from "node:crypto";
import { MongoClient, ObjectId } from "mongodb";
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  AdminGetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME ?? "foodhub_local";
const userPoolId = process.env.COGNITO_USER_POOL_ID;
const imagesBucket = process.env.IMAGES_BUCKET;
const region = process.env.AWS_REGION ?? "us-east-2";

for (const [name, value] of Object.entries({ MONGODB_URI: uri, COGNITO_USER_POOL_ID: userPoolId, IMAGES_BUCKET: imagesBucket })) {
  if (!value) {
    console.error(`Falta la variable de entorno ${name}.`);
    process.exit(1);
  }
}

const cognito = new CognitoIdentityProviderClient({ region });
const s3 = new S3Client({ region });

const EXT = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

function randomPassword() {
  const lower = "abcdefghijkmnpqrstuvwxyz";
  const upper = lower.toUpperCase();
  const nums = "23456789";
  const symbols = "!@#$%^&*";
  const pick = (s) => s[crypto.randomInt(s.length)];
  let pwd = pick(upper) + pick(lower) + pick(nums) + pick(symbols);
  for (let i = 0; i < 8; i++) pwd += pick(lower + upper + nums);
  return pwd;
}

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 30000 });
await client.connect();
const db = client.db(dbName);

try {
  // --- Step 1: users -> Cognito -------------------------------------------------
  const pendingUsers = await db.collection("users").find({ cognitoSub: { $exists: false } }).toArray();
  console.log(`Usuarios a migrar a Cognito: ${pendingUsers.length}`);

  const idMap = new Map(); // old Mongo _id (string) -> new Cognito sub
  const credentials = [];

  for (const user of pendingUsers) {
    const email = user.email;
    if (!email) {
      console.warn(`  usuario ${user._id} sin email, se omite`);
      continue;
    }
    let sub;
    try {
      const created = await cognito.send(
        new AdminCreateUserCommand({
          UserPoolId: userPoolId,
          Username: email,
          UserAttributes: [
            { Name: "email", Value: email },
            { Name: "email_verified", Value: "true" },
          ],
          MessageAction: "SUPPRESS",
        })
      );
      sub = created.User.Attributes.find((a) => a.Name === "sub").Value;
      const password = randomPassword();
      await cognito.send(
        new AdminSetUserPasswordCommand({ UserPoolId: userPoolId, Username: email, Password: password, Permanent: true })
      );
      credentials.push({ email, password });
      console.log(`  creado ${email} -> ${sub}`);
    } catch (err) {
      if (err.name === "UsernameExistsException") {
        const got = await cognito.send(new AdminGetUserCommand({ UserPoolId: userPoolId, Username: email }));
        sub = got.UserAttributes.find((a) => a.Name === "sub").Value;
        console.log(`  ${email} ya existía en Cognito, reuso sub ${sub}`);
      } else {
        throw err;
      }
    }
    idMap.set(user._id.toString(), sub);
    await db.collection("users").updateOne({ _id: user._id }, { $set: { cognitoSub: sub, updatedAt: new Date() } });
  }

  // --- Step 2: remap ownerId across collections ----------------------------------
  const ownerCollections = ["restaurants", "pages", "menus", "subscriptions", "payments"];
  for (const [oldId, newSub] of idMap) {
    for (const coll of ownerCollections) {
      const res = await db.collection(coll).updateMany({ ownerId: oldId }, { $set: { ownerId: newSub } });
      if (res.modifiedCount > 0) console.log(`  ${coll}: ${res.modifiedCount} doc(s) ownerId ${oldId} -> ${newSub}`);
    }
  }

  // --- Step 3: images -> S3 ------------------------------------------------------
  const imageCache = new Map(); // old images._id (string) -> new S3 key

  async function migrateImageRef(oldId) {
    if (!oldId) return undefined;
    const cacheKey = oldId.toString();
    if (imageCache.has(cacheKey)) return imageCache.get(cacheKey);

    const imgId = oldId instanceof ObjectId ? oldId : ObjectId.isValid(oldId) ? new ObjectId(oldId) : undefined;
    if (!imgId) return undefined;
    const imgDoc = await db.collection("images").findOne({ _id: imgId });
    if (!imgDoc) return undefined;

    const ext = EXT[imgDoc.contentType] ?? "jpg";
    const s3Key = `public/${crypto.randomUUID()}.${ext}`;
    const raw = imgDoc.data;
    const buffer = Buffer.isBuffer(raw) ? raw : Buffer.from(raw.buffer ?? raw);
    await s3.send(
      new PutObjectCommand({
        Bucket: imagesBucket,
        Key: s3Key,
        Body: buffer,
        ContentType: imgDoc.contentType,
        CacheControl: "public, max-age=31536000, immutable",
      })
    );
    imageCache.set(cacheKey, s3Key);
    console.log(`  imagen ${cacheKey} -> ${s3Key}`);
    return s3Key;
  }

  function withKey(rest, fieldName, key) {
    return key ? { ...rest, [fieldName]: key } : rest;
  }

  // restaurants: logoImageId, coverImageId
  const restaurants = await db
    .collection("restaurants")
    .find({ $or: [{ logoImageId: { $exists: true } }, { coverImageId: { $exists: true } }] })
    .toArray();
  for (const r of restaurants) {
    const set = {};
    const unset = {};
    if (r.logoImageId) {
      const key = await migrateImageRef(r.logoImageId);
      if (key) set.logoImageKey = key;
      unset.logoImageId = "";
    }
    if (r.coverImageId) {
      const key = await migrateImageRef(r.coverImageId);
      if (key) set.coverImageKey = key;
      unset.coverImageId = "";
    }
    await db.collection("restaurants").updateOne({ _id: r._id }, { $set: set, $unset: unset });
  }
  console.log(`restaurants con imágenes migradas: ${restaurants.length}`);

  // pages: about/dailyOffer/whyUs.imageId, mainDishes[]/blogPosts[].imageId, testimonials[].photoId
  const pages = await db.collection("pages").find({}).toArray();
  let pagesTouched = 0;
  for (const p of pages) {
    const set = {};
    const unset = {};
    let touched = false;

    if (p.about?.imageId) {
      const { imageId, ...rest } = p.about;
      set.about = withKey(rest, "imageKey", await migrateImageRef(imageId));
      touched = true;
    }
    if (p.dailyOffer?.imageId) {
      const { imageId, ...rest } = p.dailyOffer;
      set.dailyOffer = withKey(rest, "imageKey", await migrateImageRef(imageId));
      touched = true;
    }
    if (p.whyUs?.imageId) {
      const { imageId, ...rest } = p.whyUs;
      set.whyUs = withKey(rest, "imageKey", await migrateImageRef(imageId));
      touched = true;
    }
    if (Array.isArray(p.mainDishes) && p.mainDishes.some((d) => d.imageId)) {
      set.mainDishes = [];
      for (const d of p.mainDishes) {
        const { imageId, ...rest } = d;
        set.mainDishes.push(withKey(rest, "imageKey", imageId ? await migrateImageRef(imageId) : undefined));
      }
      touched = true;
    }
    if (Array.isArray(p.testimonials) && p.testimonials.some((t) => t.photoId)) {
      set.testimonials = [];
      for (const t of p.testimonials) {
        const { photoId, ...rest } = t;
        set.testimonials.push(withKey(rest, "photoKey", photoId ? await migrateImageRef(photoId) : undefined));
      }
      touched = true;
    }
    if (Array.isArray(p.blogPosts) && p.blogPosts.some((b) => b.imageId)) {
      set.blogPosts = [];
      for (const b of p.blogPosts) {
        const { imageId, ...rest } = b;
        set.blogPosts.push(withKey(rest, "imageKey", imageId ? await migrateImageRef(imageId) : undefined));
      }
      touched = true;
    }

    if (touched) {
      await db.collection("pages").updateOne({ _id: p._id }, { $set: set, ...(Object.keys(unset).length ? { $unset: unset } : {}) });
      pagesTouched += 1;
    }
  }
  console.log(`pages con contenido migrado: ${pagesTouched}`);

  // menus: items[].photoId
  const menus = await db.collection("menus").find({ "items.photoId": { $exists: true } }).toArray();
  for (const m of menus) {
    const newItems = [];
    for (const it of m.items) {
      const { photoId, ...rest } = it;
      newItems.push(withKey(rest, "photoKey", photoId ? await migrateImageRef(photoId) : undefined));
    }
    await db.collection("menus").updateOne({ _id: m._id }, { $set: { items: newItems } });
  }
  console.log(`menus con fotos migradas: ${menus.length}`);

  if (credentials.length > 0) {
    console.log("\n=== Contraseñas nuevas (guardalas, no se vuelven a mostrar) ===");
    for (const c of credentials) console.log(`${c.email}  ${c.password}`);
  }
  console.log("\nMigración completa.");
} finally {
  await client.close();
}

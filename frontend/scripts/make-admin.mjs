// One-off promotion script — there's no UI for this on purpose, admin role
// assignment should stay a deliberate manual action.
//
// Usage (run inside the frontend container, where MONGODB_URI is already set):
//   docker compose exec frontend node scripts/make-admin.mjs someone@example.com
import { MongoClient } from "mongodb";

const email = process.argv[2]?.trim().toLowerCase();
if (!email) {
  console.error("Uso: node scripts/make-admin.mjs <email>");
  process.exit(1);
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI no está definida en el entorno.");
  process.exit(1);
}

const client = new MongoClient(uri);
try {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB_NAME ?? "foodhub_local");
  const result = await db
    .collection("users")
    .updateOne({ email }, { $set: { role: "admin", updatedAt: new Date() } });

  if (result.matchedCount === 0) {
    console.error(`No existe ningún usuario con email ${email}.`);
    process.exit(1);
  }
  console.log(`${email} ahora es admin.`);
} finally {
  await client.close();
}

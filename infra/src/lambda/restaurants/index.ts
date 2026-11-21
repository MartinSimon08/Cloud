import type { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2 } from "aws-lambda";
import { ObjectId } from "mongodb";
import { getDb } from "../../lib/db";
import { getCaller } from "../../lib/auth";
import { ensureUser } from "../../lib/ensureUser";
import { json } from "../../lib/http";
import { generateUniqueSlug, slugify, isSlugAvailable } from "../../lib/slug";
import { parseImageKey, str } from "../../lib/parseUtils";
import type { MenuDoc, PageDoc, RestaurantDoc } from "../../lib/models";

export async function handler(
  event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<APIGatewayProxyResultV2> {
  try {
    const caller = getCaller(event);
    const db = await getDb();
    await ensureUser(db, caller);
    const restaurants = db.collection<RestaurantDoc>("restaurants");

    switch (event.routeKey) {
      case "GET /restaurants": {
        const docs = await restaurants.find({ ownerId: caller.sub }).toArray();
        return json(200, docs);
      }

      case "POST /restaurants": {
        const body = parseBody(event.body);
        if (!body.name || typeof body.name !== "string") {
          return json(400, { error: "name es requerido" });
        }

        const nameTaken = await restaurants.findOne({
          ownerId: caller.sub,
          name: { $regex: `^${escapeRegex(body.name.trim())}$`, $options: "i" },
        });
        if (nameTaken) {
          return json(409, { error: "Ya tenés un restaurante con ese nombre." });
        }

        const now = new Date();
        const slug = await generateUniqueSlug(db, body.name);
        const doc: Omit<RestaurantDoc, "_id"> = {
          ownerId: caller.sub,
          slug,
          name: body.name,
          description: typeof body.description === "string" ? body.description : "",
          address: str(body.address),
          createdAt: now,
          updatedAt: now,
        };
        const result = await restaurants.insertOne(doc as RestaurantDoc);
        return json(201, { ...doc, _id: result.insertedId });
      }

      case "GET /restaurants/{id}":
      case "PUT /restaurants/{id}":
      case "DELETE /restaurants/{id}": {
        const objectId = parseObjectId(event.pathParameters?.id);
        if (!objectId) return json(400, { error: "id inválido" });

        const existing = await restaurants.findOne({ _id: objectId });
        if (!existing) return json(404, { error: "no encontrado" });
        if (existing.ownerId !== caller.sub) return json(403, { error: "prohibido" });

        if (event.routeKey === "GET /restaurants/{id}") {
          return json(200, existing);
        }

        if (event.routeKey === "PUT /restaurants/{id}") {
          const body = parseBody(event.body);
          const update: Partial<RestaurantDoc> = { updatedAt: new Date() };
          if (typeof body.name === "string") update.name = body.name;
          if (typeof body.description === "string") update.description = body.description;
          if (typeof body.address === "string") update.address = body.address;
          if (typeof body.phone === "string") update.phone = body.phone;
          if (typeof body.phoneEnabled === "boolean") update.phoneEnabled = body.phoneEnabled;
          if (typeof body.email === "string") update.email = body.email;
          if (typeof body.emailEnabled === "boolean") update.emailEnabled = body.emailEnabled;
          if (typeof body.hours === "string") update.hours = body.hours;
          if (typeof body.hoursEnabled === "boolean") update.hoursEnabled = body.hoursEnabled;
          if (typeof body.mapsUrl === "string") update.mapsUrl = body.mapsUrl;
          if (typeof body.mapsUrlEnabled === "boolean") update.mapsUrlEnabled = body.mapsUrlEnabled;
          if (typeof body.instagram === "string") update.instagram = body.instagram;
          if (typeof body.instagramEnabled === "boolean") update.instagramEnabled = body.instagramEnabled;
          if (typeof body.facebook === "string") update.facebook = body.facebook;
          if (typeof body.facebookEnabled === "boolean") update.facebookEnabled = body.facebookEnabled;
          if (typeof body.whatsapp === "string") update.whatsapp = body.whatsapp;
          if (typeof body.whatsappEnabled === "boolean") update.whatsappEnabled = body.whatsappEnabled;
          const logoImageKey = parseImageKey(body.logoImageKey);
          if (logoImageKey) update.logoImageKey = logoImageKey;
          const coverImageKey = parseImageKey(body.coverImageKey);
          if (coverImageKey) update.coverImageKey = coverImageKey;
          if (typeof body.slug === "string" && body.slug.trim()) {
            const nextSlug = slugify(body.slug);
            if (nextSlug !== existing.slug) {
              if (!(await isSlugAvailable(db, nextSlug, objectId))) {
                return json(409, { error: "Esa URL ya está en uso por otro restaurante." });
              }
              update.slug = nextSlug;
            }
          }

          await restaurants.updateOne({ _id: objectId }, { $set: update });
          return json(200, { ...existing, ...update });
        }

        // DELETE: blocked while the restaurant still has pages or menus.
        const pageCount = await db.collection<PageDoc>("pages").countDocuments({ restaurantId: objectId });
        if (pageCount > 0) {
          return json(409, { error: "Primero eliminá las páginas del restaurante." });
        }
        const menuCount = await db.collection<MenuDoc>("menus").countDocuments({ restaurantId: objectId });
        if (menuCount > 0) {
          return json(409, { error: "Primero eliminá los menús del restaurante." });
        }

        await Promise.all([
          restaurants.deleteOne({ _id: objectId }),
          db.collection("subscriptions").deleteOne({ restaurantId: objectId }),
          db.collection("payments").deleteMany({ restaurantId: objectId }),
        ]);
        return json(204, null);
      }

      default:
        return json(404, { error: "route not found" });
    }
  } catch (err) {
    console.error(err);
    return json(500, { error: "internal error" });
  }
}

function parseBody(body: string | undefined): Record<string, unknown> {
  if (!body) return {};
  try {
    const parsed = JSON.parse(body);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function parseObjectId(id: string | undefined): ObjectId | undefined {
  if (!id || !ObjectId.isValid(id)) return undefined;
  return new ObjectId(id);
}

function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

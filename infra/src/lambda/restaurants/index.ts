import type { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2 } from "aws-lambda";
import { ObjectId } from "mongodb";
import { getDb } from "../../lib/db";
import { getCaller } from "../../lib/auth";
import { ensureUser } from "../../lib/ensureUser";
import { json } from "../../lib/http";
import type { RestaurantDoc } from "../../lib/models";

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
          return json(400, { error: "name is required" });
        }
        const now = new Date();
        const doc: Omit<RestaurantDoc, "_id"> = {
          ownerId: caller.sub,
          name: body.name,
          description: typeof body.description === "string" ? body.description : "",
          address: typeof body.address === "string" ? body.address : undefined,
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
        if (!objectId) return json(400, { error: "invalid id" });

        const existing = await restaurants.findOne({ _id: objectId });
        if (!existing) return json(404, { error: "not found" });
        if (existing.ownerId !== caller.sub) return json(403, { error: "forbidden" });

        if (event.routeKey === "GET /restaurants/{id}") {
          return json(200, existing);
        }

        if (event.routeKey === "PUT /restaurants/{id}") {
          const body = parseBody(event.body);
          const update: Partial<RestaurantDoc> = { updatedAt: new Date() };
          if (typeof body.name === "string") update.name = body.name;
          if (typeof body.description === "string") update.description = body.description;
          if (typeof body.address === "string") update.address = body.address;
          await restaurants.updateOne({ _id: objectId }, { $set: update });
          return json(200, { ...existing, ...update });
        }

        // DELETE: cascade-delete the restaurant's menus first.
        await db.collection("menus").deleteMany({ restaurantId: objectId });
        await restaurants.deleteOne({ _id: objectId });
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

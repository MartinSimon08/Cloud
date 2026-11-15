import type { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2 } from "aws-lambda";
import { ObjectId } from "mongodb";
import { getDb } from "../../lib/db";
import { getCaller } from "../../lib/auth";
import { ensureUser } from "../../lib/ensureUser";
import { json } from "../../lib/http";
import type { MenuDoc, MenuItem, RestaurantDoc } from "../../lib/models";

export async function handler(
  event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<APIGatewayProxyResultV2> {
  try {
    const caller = getCaller(event);
    const db = await getDb();
    await ensureUser(db, caller);
    const menus = db.collection<MenuDoc>("menus");
    const restaurants = db.collection<RestaurantDoc>("restaurants");

    switch (event.routeKey) {
      case "GET /restaurants/{id}/menus": {
        const restaurantId = parseObjectId(event.pathParameters?.id);
        if (!restaurantId) return json(400, { error: "invalid id" });
        const restaurant = await restaurants.findOne({ _id: restaurantId });
        if (!restaurant) return json(404, { error: "not found" });
        if (restaurant.ownerId !== caller.sub) return json(403, { error: "forbidden" });

        const docs = await menus.find({ restaurantId }).toArray();
        return json(200, docs);
      }

      case "POST /restaurants/{id}/menus": {
        const restaurantId = parseObjectId(event.pathParameters?.id);
        if (!restaurantId) return json(400, { error: "invalid id" });
        const restaurant = await restaurants.findOne({ _id: restaurantId });
        if (!restaurant) return json(404, { error: "not found" });
        if (restaurant.ownerId !== caller.sub) return json(403, { error: "forbidden" });

        const body = parseBody(event.body);
        if (!body.name || typeof body.name !== "string") {
          return json(400, { error: "name is required" });
        }
        const now = new Date();
        const doc: Omit<MenuDoc, "_id"> = {
          restaurantId,
          ownerId: restaurant.ownerId,
          name: body.name,
          description: typeof body.description === "string" ? body.description : "",
          items: parseItems(body.items),
          createdAt: now,
          updatedAt: now,
        };
        const result = await menus.insertOne(doc as MenuDoc);
        return json(201, { ...doc, _id: result.insertedId });
      }

      case "GET /menus/{menuId}":
      case "PUT /menus/{menuId}":
      case "DELETE /menus/{menuId}": {
        const menuId = parseObjectId(event.pathParameters?.menuId);
        if (!menuId) return json(400, { error: "invalid id" });

        const existing = await menus.findOne({ _id: menuId });
        if (!existing) return json(404, { error: "not found" });
        if (existing.ownerId !== caller.sub) return json(403, { error: "forbidden" });

        if (event.routeKey === "GET /menus/{menuId}") {
          return json(200, existing);
        }

        if (event.routeKey === "PUT /menus/{menuId}") {
          const body = parseBody(event.body);
          const update: Partial<MenuDoc> = { updatedAt: new Date() };
          if (typeof body.name === "string") update.name = body.name;
          if (typeof body.description === "string") update.description = body.description;
          if (body.items !== undefined) update.items = parseItems(body.items);
          await menus.updateOne({ _id: menuId }, { $set: update });
          return json(200, { ...existing, ...update });
        }

        // DELETE
        await menus.deleteOne({ _id: menuId });
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

function parseItems(raw: unknown): MenuItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" && item !== null && typeof (item as Record<string, unknown>).name === "string"
    )
    .map((item) => ({
      id: typeof item.id === "string" && item.id ? item.id : randomId(),
      name: item.name as string,
      description: typeof item.description === "string" ? item.description : undefined,
      price: typeof item.price === "number" ? item.price : 0,
      category: typeof item.category === "string" ? item.category : undefined,
    }));
}

function randomId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

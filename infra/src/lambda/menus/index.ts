import type { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2 } from "aws-lambda";
import { ObjectId } from "mongodb";
import { getDb } from "../../lib/db";
import { getCaller } from "../../lib/auth";
import { ensureUser } from "../../lib/ensureUser";
import { json } from "../../lib/http";
import { parseItems } from "../../lib/menuItems";
import { MENU_TEMPLATE_VALUES } from "../../lib/templateValues";
import { featureCovers, isSubscriptionActive } from "../../lib/billing";
import { isAdminOwner } from "../../lib/adminAuth";
import type { MenuDoc, RestaurantDoc, SubscriptionDoc } from "../../lib/models";

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
        if (!restaurantId) return json(400, { error: "id inválido" });
        const restaurant = await restaurants.findOne({ _id: restaurantId });
        if (!restaurant) return json(404, { error: "no encontrado" });
        if (restaurant.ownerId !== caller.sub) return json(403, { error: "prohibido" });

        const docs = await menus.find({ restaurantId }).toArray();
        return json(200, docs);
      }

      case "POST /restaurants/{id}/menus": {
        const restaurantId = parseObjectId(event.pathParameters?.id);
        if (!restaurantId) return json(400, { error: "id inválido" });
        const restaurant = await restaurants.findOne({ _id: restaurantId });
        if (!restaurant) return json(404, { error: "no encontrado" });
        if (restaurant.ownerId !== caller.sub) return json(403, { error: "prohibido" });

        const body = parseBody(event.body);
        if (!body.name || typeof body.name !== "string") {
          return json(400, { error: "name es requerido" });
        }
        const menuTemplate =
          typeof body.menuTemplate === "string" && MENU_TEMPLATE_VALUES.includes(body.menuTemplate as MenuDoc["menuTemplate"])
            ? (body.menuTemplate as MenuDoc["menuTemplate"])
            : MENU_TEMPLATE_VALUES[0];

        const now = new Date();
        const doc: Omit<MenuDoc, "_id"> = {
          restaurantId,
          ownerId: restaurant.ownerId,
          name: body.name,
          description: typeof body.description === "string" ? body.description : "",
          menuTemplate,
          published: false,
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
        if (!menuId) return json(400, { error: "id inválido" });

        const existing = await menus.findOne({ _id: menuId });
        if (!existing) return json(404, { error: "no encontrado" });
        if (existing.ownerId !== caller.sub) return json(403, { error: "prohibido" });

        if (event.routeKey === "GET /menus/{menuId}") {
          return json(200, existing);
        }

        if (event.routeKey === "PUT /menus/{menuId}") {
          const body = parseBody(event.body);
          const update: Partial<MenuDoc> = { updatedAt: new Date() };
          if (typeof body.name === "string") update.name = body.name;
          if (typeof body.description === "string") update.description = body.description;
          if (typeof body.menuTemplate === "string" && MENU_TEMPLATE_VALUES.includes(body.menuTemplate as MenuDoc["menuTemplate"])) {
            update.menuTemplate = body.menuTemplate as MenuDoc["menuTemplate"];
          }
          if (body.items !== undefined) update.items = parseItems(body.items);

          if (typeof body.published === "boolean") {
            if (body.published) {
              // Admin accounts are exempt from the paywall.
              if (!(await isAdminOwner(db, existing.ownerId))) {
                const subscription = await db
                  .collection<SubscriptionDoc>("subscriptions")
                  .findOne({ restaurantId: existing.restaurantId });
                if (!isSubscriptionActive(subscription) || !featureCovers(subscription!.feature, "menu")) {
                  return json(402, {
                    error: "Necesitás un plan activo con Menú incluido para activarlo. Activalo desde Plan y facturación.",
                  });
                }
              }
              // Only one menu can be active per restaurant at a time.
              await menus.updateMany(
                { restaurantId: existing.restaurantId, _id: { $ne: menuId } },
                { $set: { published: false, updatedAt: new Date() } }
              );
            }
            update.published = body.published;
          }

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

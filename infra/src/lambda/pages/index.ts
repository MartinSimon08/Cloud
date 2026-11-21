import type { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2 } from "aws-lambda";
import { ObjectId } from "mongodb";
import { getDb } from "../../lib/db";
import { getCaller } from "../../lib/auth";
import { ensureUser } from "../../lib/ensureUser";
import { json } from "../../lib/http";
import {
  parseHero,
  parseAbout,
  parseMainDishes,
  parseDailyOffer,
  parseWhyUs,
  parseTestimonials,
  parseBlogPosts,
} from "../../lib/restaurantContent";
import { PAGE_TEMPLATE_VALUES } from "../../lib/templateValues";
import { featureCovers, isSubscriptionActive } from "../../lib/billing";
import { isAdminOwner } from "../../lib/adminAuth";
import type { PageDoc, RestaurantDoc, SubscriptionDoc } from "../../lib/models";

export async function handler(
  event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<APIGatewayProxyResultV2> {
  try {
    const caller = getCaller(event);
    const db = await getDb();
    await ensureUser(db, caller);
    const pages = db.collection<PageDoc>("pages");
    const restaurants = db.collection<RestaurantDoc>("restaurants");

    switch (event.routeKey) {
      case "GET /restaurants/{id}/pages": {
        const restaurantId = parseObjectId(event.pathParameters?.id);
        if (!restaurantId) return json(400, { error: "id inválido" });
        const restaurant = await restaurants.findOne({ _id: restaurantId });
        if (!restaurant) return json(404, { error: "no encontrado" });
        if (restaurant.ownerId !== caller.sub) return json(403, { error: "prohibido" });

        const docs = await pages.find({ restaurantId }).toArray();
        return json(200, docs);
      }

      case "POST /restaurants/{id}/pages": {
        const restaurantId = parseObjectId(event.pathParameters?.id);
        if (!restaurantId) return json(400, { error: "id inválido" });
        const restaurant = await restaurants.findOne({ _id: restaurantId });
        if (!restaurant) return json(404, { error: "no encontrado" });
        if (restaurant.ownerId !== caller.sub) return json(403, { error: "prohibido" });

        const body = parseBody(event.body);
        if (!body.name || typeof body.name !== "string") {
          return json(400, { error: "name es requerido" });
        }
        const pageTemplate =
          typeof body.pageTemplate === "string" && PAGE_TEMPLATE_VALUES.includes(body.pageTemplate as PageDoc["pageTemplate"])
            ? (body.pageTemplate as PageDoc["pageTemplate"])
            : PAGE_TEMPLATE_VALUES[0];

        const now = new Date();
        const doc: Omit<PageDoc, "_id"> = {
          restaurantId,
          ownerId: restaurant.ownerId,
          name: body.name,
          pageTemplate,
          published: false,
          createdAt: now,
          updatedAt: now,
        };
        const result = await pages.insertOne(doc as PageDoc);
        return json(201, { ...doc, _id: result.insertedId });
      }

      case "GET /pages/{pageId}":
      case "PUT /pages/{pageId}":
      case "DELETE /pages/{pageId}": {
        const pageId = parseObjectId(event.pathParameters?.pageId);
        if (!pageId) return json(400, { error: "id inválido" });

        const existing = await pages.findOne({ _id: pageId });
        if (!existing) return json(404, { error: "no encontrado" });
        if (existing.ownerId !== caller.sub) return json(403, { error: "prohibido" });

        if (event.routeKey === "GET /pages/{pageId}") {
          return json(200, existing);
        }

        if (event.routeKey === "PUT /pages/{pageId}") {
          const body = parseBody(event.body);
          const update: Partial<PageDoc> = { updatedAt: new Date() };
          if (typeof body.name === "string") update.name = body.name;
          if (typeof body.pageTemplate === "string" && PAGE_TEMPLATE_VALUES.includes(body.pageTemplate as PageDoc["pageTemplate"])) {
            update.pageTemplate = body.pageTemplate as PageDoc["pageTemplate"];
          }
          if (body.hero !== undefined) update.hero = parseHero(body.hero);
          if (body.about !== undefined) update.about = parseAbout(body.about);
          if (body.mainDishes !== undefined) update.mainDishes = parseMainDishes(body.mainDishes);
          if (body.dailyOffer !== undefined) update.dailyOffer = parseDailyOffer(body.dailyOffer);
          if (body.whyUs !== undefined) update.whyUs = parseWhyUs(body.whyUs);
          if (body.testimonials !== undefined) update.testimonials = parseTestimonials(body.testimonials);
          if (body.blogPosts !== undefined) update.blogPosts = parseBlogPosts(body.blogPosts);

          if (typeof body.published === "boolean") {
            if (body.published) {
              // Admin accounts are exempt from the paywall.
              if (!(await isAdminOwner(db, existing.ownerId))) {
                const subscription = await db
                  .collection<SubscriptionDoc>("subscriptions")
                  .findOne({ restaurantId: existing.restaurantId });
                if (!isSubscriptionActive(subscription) || !featureCovers(subscription!.feature, "page")) {
                  return json(402, {
                    error: "Necesitás un plan activo con Página incluida para publicar. Activalo desde Plan y facturación.",
                  });
                }
              }
              // Only one page can be published per restaurant at a time.
              await pages.updateMany(
                { restaurantId: existing.restaurantId, _id: { $ne: pageId } },
                { $set: { published: false, updatedAt: new Date() } }
              );
            }
            update.published = body.published;
          }

          await pages.updateOne({ _id: pageId }, { $set: update });
          return json(200, { ...existing, ...update });
        }

        // DELETE
        await pages.deleteOne({ _id: pageId });
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

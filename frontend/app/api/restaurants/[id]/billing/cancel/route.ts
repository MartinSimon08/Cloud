import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { getCallerFromRequest } from "@/lib/cognitoAuth";
import type { RestaurantDoc, SubscriptionDoc } from "@/lib/models";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: Request, ctx: Ctx) {
  const caller = await getCallerFromRequest(req);
  if (!caller) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const restaurantId = parseObjectId((await ctx.params).id);
  if (!restaurantId) return NextResponse.json({ error: "id inválido" }, { status: 400 });

  const db = await getDb();
  const restaurant = await db.collection<RestaurantDoc>("restaurants").findOne({ _id: restaurantId });
  if (!restaurant || restaurant.ownerId !== caller.sub) return NextResponse.json({ error: "no encontrado" }, { status: 404 });

  const subscriptions = db.collection<SubscriptionDoc>("subscriptions");
  const existing = await subscriptions.findOne({ restaurantId });
  if (!existing) return NextResponse.json({ error: "este restaurante no tiene un plan" }, { status: 404 });

  // Cancellation is immediate in this simulation — no grace period until the
  // period end, to keep the "pagás para usar" gate simple to reason about.
  const updated = await subscriptions.findOneAndUpdate(
    { restaurantId },
    { $set: { status: "canceled", updatedAt: new Date() } },
    { returnDocument: "after" }
  );

  return NextResponse.json(updated);
}

function parseObjectId(id: string | undefined): ObjectId | undefined {
  if (!id || !ObjectId.isValid(id)) return undefined;
  return new ObjectId(id);
}

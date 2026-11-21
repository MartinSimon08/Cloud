import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { getCallerFromRequest } from "@/lib/cognitoAuth";
import { computePeriodEnd, isSubscriptionActive, quotePrice, type PriceQuote } from "@/lib/billing";
import { isAdminOwner } from "@/lib/adminAuth";
import type { BillingCycle, PaymentDoc, PlanFeature, RestaurantDoc, SubscriptionDoc } from "@/lib/models";

type Ctx = { params: Promise<{ id: string }> };

const FEATURES: PlanFeature[] = ["page", "menu", "both"];
const CYCLES: BillingCycle[] = ["monthly", "annual"];

async function loadOwnedRestaurant(
  db: Awaited<ReturnType<typeof getDb>>,
  restaurantId: ObjectId,
  ownerId: string
): Promise<RestaurantDoc | null> {
  const restaurant = await db.collection<RestaurantDoc>("restaurants").findOne({ _id: restaurantId });
  if (!restaurant || restaurant.ownerId !== ownerId) return null;
  return restaurant;
}

export async function GET(req: Request, ctx: Ctx) {
  const caller = await getCallerFromRequest(req);
  if (!caller) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const restaurantId = parseObjectId((await ctx.params).id);
  if (!restaurantId) return NextResponse.json({ error: "id inválido" }, { status: 400 });

  const db = await getDb();
  const restaurant = await loadOwnedRestaurant(db, restaurantId, caller.sub);
  if (!restaurant) return NextResponse.json({ error: "no encontrado" }, { status: 404 });

  if (await isAdminOwner(caller.sub)) {
    return NextResponse.json({
      subscription: null,
      isActive: true,
      payments: [],
      quotes: [],
      isAdmin: true,
    });
  }

  const [subscription, payments] = await Promise.all([
    db.collection<SubscriptionDoc>("subscriptions").findOne({ restaurantId }),
    db.collection<PaymentDoc>("payments").find({ restaurantId }).sort({ paidAt: -1 }).toArray(),
  ]);

  const quotes: PriceQuote[] = FEATURES.flatMap((feature) => CYCLES.map((billingCycle) => quotePrice(feature, billingCycle)));

  return NextResponse.json({
    subscription,
    isActive: isSubscriptionActive(subscription),
    payments,
    quotes,
    isAdmin: false,
  });
}

export async function POST(req: Request, ctx: Ctx) {
  const caller = await getCallerFromRequest(req);
  if (!caller) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const restaurantId = parseObjectId((await ctx.params).id);
  if (!restaurantId) return NextResponse.json({ error: "id inválido" }, { status: 400 });

  const db = await getDb();
  const restaurant = await loadOwnedRestaurant(db, restaurantId, caller.sub);
  if (!restaurant) return NextResponse.json({ error: "no encontrado" }, { status: 404 });

  if (await isAdminOwner(caller.sub)) {
    return NextResponse.json({ error: "Las cuentas admin ya tienen acceso completo, no necesitan contratar un plan." }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));
  const feature = FEATURES.includes(body.feature) ? (body.feature as PlanFeature) : undefined;
  const billingCycle = CYCLES.includes(body.billingCycle) ? (body.billingCycle as BillingCycle) : undefined;
  if (!feature || !billingCycle) {
    return NextResponse.json({ error: "feature y billingCycle son requeridos" }, { status: 400 });
  }

  const quote = quotePrice(feature, billingCycle);

  const now = new Date();
  const subscriptions = db.collection<SubscriptionDoc>("subscriptions");

  // Renewing before the current period ends extends it from its actual
  // expiration date instead of resetting from today — otherwise paying a day
  // early would throw away the days already paid for. A lapsed/canceled plan
  // (or a first subscription) starts the new period from today as usual.
  const existingSub = await subscriptions.findOne({ restaurantId });
  const periodStart = isSubscriptionActive(existingSub, now) ? existingSub!.currentPeriodEnd : now;

  const subscriptionUpdate: Omit<SubscriptionDoc, "_id" | "createdAt"> = {
    restaurantId,
    ownerId: caller.sub,
    feature,
    billingCycle,
    status: "active",
    basePrice: quote.basePrice,
    monthlyEquivalent: quote.monthlyEquivalent,
    amount: quote.amount,
    currentPeriodStart: periodStart,
    currentPeriodEnd: computePeriodEnd(periodStart, billingCycle),
    updatedAt: now,
  };

  const result = await subscriptions.findOneAndUpdate(
    { restaurantId },
    { $set: subscriptionUpdate, $setOnInsert: { createdAt: now } },
    { upsert: true, returnDocument: "after" }
  );
  const subscription = result!;

  const payment: Omit<PaymentDoc, "_id"> = {
    subscriptionId: subscription._id,
    restaurantId,
    ownerId: caller.sub,
    feature,
    billingCycle,
    amount: quote.amount,
    periodStart: subscription.currentPeriodStart,
    periodEnd: subscription.currentPeriodEnd,
    paidAt: now,
  };
  const paymentResult = await db.collection<PaymentDoc>("payments").insertOne(payment as PaymentDoc);

  return NextResponse.json(
    { subscription, payment: { ...payment, _id: paymentResult.insertedId } },
    { status: 201 }
  );
}

function parseObjectId(id: string | undefined): ObjectId | undefined {
  if (!id || !ObjectId.isValid(id)) return undefined;
  return new ObjectId(id);
}

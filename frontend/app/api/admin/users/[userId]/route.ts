import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";
import { isSubscriptionActive } from "@/lib/billing";
import type { MenuDoc, PageDoc, PaymentDoc, RestaurantDoc, SubscriptionDoc, UserDoc } from "@/lib/models";

type Ctx = { params: Promise<{ userId: string }> };

export async function GET(req: Request, ctx: Ctx) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "prohibido" }, { status: 403 });

  const { userId } = await ctx.params;
  if (!ObjectId.isValid(userId)) return NextResponse.json({ error: "id inválido" }, { status: 400 });

  const db = await getDb();
  const user = await db.collection<UserDoc>("users").findOne({ _id: new ObjectId(userId) });
  if (!user) return NextResponse.json({ error: "no encontrado" }, { status: 404 });

  const restaurants = await db.collection<RestaurantDoc>("restaurants").find({ ownerId: userId }).toArray();
  const restaurantIds = restaurants.map((r) => r._id);
  const [pages, menus, subscriptions, payments] = await Promise.all([
    db.collection<PageDoc>("pages").find({ restaurantId: { $in: restaurantIds } }).toArray(),
    db.collection<MenuDoc>("menus").find({ restaurantId: { $in: restaurantIds } }).toArray(),
    db.collection<SubscriptionDoc>("subscriptions").find({ restaurantId: { $in: restaurantIds } }).toArray(),
    db.collection<PaymentDoc>("payments").find({ restaurantId: { $in: restaurantIds } }).toArray(),
  ]);

  const mrr = subscriptions.filter((s) => isSubscriptionActive(s)).reduce((sum, s) => sum + s.monthlyEquivalent, 0);
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

  const restaurantsWithContent = restaurants.map((r) => {
    const subscription = subscriptions.find((s) => s.restaurantId.equals(r._id)) ?? null;
    const restaurantTotalPaid = payments.filter((p) => p.restaurantId.equals(r._id)).reduce((sum, p) => sum + p.amount, 0);
    return {
      ...r,
      _id: r._id.toString(),
      pages: pages
        .filter((p) => p.restaurantId.equals(r._id))
        .map((p) => ({ ...p, _id: p._id.toString(), restaurantId: p.restaurantId.toString() })),
      menus: menus
        .filter((m) => m.restaurantId.equals(r._id))
        .map((m) => ({ ...m, _id: m._id.toString(), restaurantId: m.restaurantId.toString() })),
      subscription,
      totalPaid: restaurantTotalPaid,
    };
  });

  return NextResponse.json({
    _id: user._id.toString(),
    email: user.email,
    role: user.role === "admin" ? "admin" : "user",
    createdAt: user.createdAt,
    mrr,
    totalPaid,
    restaurants: restaurantsWithContent,
  });
}

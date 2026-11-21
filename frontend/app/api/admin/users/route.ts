import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";
import type { UserDoc } from "@/lib/models";

interface CountRow {
  _id: string;
  count: number;
}

interface MrrRow {
  _id: string;
  mrr: number;
  activeCount: number;
}

export async function GET(req: Request) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "prohibido" }, { status: 403 });

  const db = await getDb();
  const now = new Date();
  const [users, restaurantCounts, pageCounts, menuCounts, mrrRows] = await Promise.all([
    db.collection<UserDoc>("users").find().sort({ createdAt: -1 }).toArray(),
    db.collection("restaurants").aggregate<CountRow>([{ $group: { _id: "$ownerId", count: { $sum: 1 } } }]).toArray(),
    db.collection("pages").aggregate<CountRow>([{ $group: { _id: "$ownerId", count: { $sum: 1 } } }]).toArray(),
    db.collection("menus").aggregate<CountRow>([{ $group: { _id: "$ownerId", count: { $sum: 1 } } }]).toArray(),
    db
      .collection("subscriptions")
      .aggregate<MrrRow>([
        { $match: { status: "active", currentPeriodEnd: { $gt: now } } },
        { $group: { _id: "$ownerId", mrr: { $sum: "$monthlyEquivalent" }, activeCount: { $sum: 1 } } },
      ])
      .toArray(),
  ]);

  const restaurantsById = new Map(restaurantCounts.map((r) => [r._id, r.count]));
  const pagesById = new Map(pageCounts.map((r) => [r._id, r.count]));
  const menusById = new Map(menuCounts.map((r) => [r._id, r.count]));
  const mrrById = new Map(mrrRows.map((r) => [r._id, r.mrr]));
  const activeSubsById = new Map(mrrRows.map((r) => [r._id, r.activeCount]));

  const result = users.map((u) => ({
    _id: u._id.toString(),
    email: u.email,
    role: u.role === "admin" ? "admin" : "user",
    createdAt: u.createdAt,
    restaurantsCount: restaurantsById.get(u._id.toString()) ?? 0,
    pagesCount: pagesById.get(u._id.toString()) ?? 0,
    menusCount: menusById.get(u._id.toString()) ?? 0,
    mrr: mrrById.get(u._id.toString()) ?? 0,
    activeSubscriptionsCount: activeSubsById.get(u._id.toString()) ?? 0,
  }));

  return NextResponse.json(result);
}

import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getCallerFromRequest } from "@/lib/cognitoAuth";
import { ensureUser } from "@/lib/ensureUser";
import type { UserDoc } from "@/lib/models";

export async function GET(req: Request) {
  const caller = await getCallerFromRequest(req);
  if (!caller) return NextResponse.json({ user: null }, { status: 401 });

  const db = await getDb();
  await ensureUser(db, caller);
  const user = await db.collection<UserDoc>("users").findOne({ cognitoSub: caller.sub });

  return NextResponse.json({
    user: { email: caller.email ?? user?.email ?? "", role: user?.role === "admin" ? "admin" : "user" },
  });
}

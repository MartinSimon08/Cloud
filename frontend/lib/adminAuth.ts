import { getDb } from "@/lib/db";
import { getCallerFromRequest, type CognitoCaller } from "@/lib/cognitoAuth";
import type { UserDoc } from "@/lib/models";

/**
 * Looks the role up fresh from the DB on every call instead of trusting a
 * role baked into the Cognito token, so revoking admin access takes effect
 * immediately without waiting for the token to expire.
 */
export async function requireAdmin(req: Request): Promise<CognitoCaller | null> {
  const caller = await getCallerFromRequest(req);
  if (!caller) return null;

  const db = await getDb();
  const user = await db.collection<UserDoc>("users").findOne({ cognitoSub: caller.sub });
  if (!user || user.role !== "admin") return null;
  return caller;
}

/**
 * Admin accounts get full access without a paid plan — looked up fresh from
 * the DB (same reasoning as requireAdmin) so it can't be bypassed via a
 * stale token.
 */
export async function isAdminOwner(ownerId: string): Promise<boolean> {
  const db = await getDb();
  const user = await db.collection<UserDoc>("users").findOne({ cognitoSub: ownerId });
  return user?.role === "admin";
}

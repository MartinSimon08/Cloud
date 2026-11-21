import type { Db } from "mongodb";

/**
 * Admin accounts are exempt from the billing paywall. Role is always read
 * fresh from Mongo (never trusted from the JWT) so revoking admin takes
 * effect immediately — same rationale as the Next.js side (lib/adminAuth.ts).
 */
export async function isAdminOwner(db: Db, ownerId: string): Promise<boolean> {
  const user = await db.collection("users").findOne({ cognitoSub: ownerId });
  return user?.role === "admin";
}

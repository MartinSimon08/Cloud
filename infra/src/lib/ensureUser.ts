import type { Db } from "mongodb";
import type { Caller } from "./auth";

/**
 * Idempotent upsert of a `users` profile doc keyed by Cognito sub. Cognito
 * remains the source of truth for identity/auth; this is just a place to
 * hang future app-specific profile data and is not used for ownership checks.
 */
export async function ensureUser(db: Db, caller: Caller): Promise<void> {
  const now = new Date();
  await db.collection("users").updateOne(
    { cognitoSub: caller.sub },
    {
      $setOnInsert: {
        cognitoSub: caller.sub,
        email: caller.email ?? "",
        createdAt: now,
      },
      $set: { updatedAt: now },
    },
    { upsert: true }
  );
}

import type { Db } from "mongodb";
import type { CognitoCaller } from "@/lib/cognitoAuth";

/**
 * Idempotent upsert of a `users` profile doc keyed by Cognito sub — mirrors
 * infra/src/lib/ensureUser.ts (used by the Lambda side). Cognito remains the
 * source of truth for identity/auth; this is just where `role` (admin vs
 * user) is tracked, since Cognito itself doesn't know about it.
 */
export async function ensureUser(db: Db, caller: CognitoCaller): Promise<void> {
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

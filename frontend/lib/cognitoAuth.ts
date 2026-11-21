import { CognitoJwtVerifier } from "aws-jwt-verify";
import { cookies } from "next/headers";

export const ID_TOKEN_COOKIE = "fh_id_token";

export interface CognitoCaller {
  sub: string;
  email?: string;
}

function getVerifier() {
  const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
  if (!userPoolId || !clientId) {
    throw new Error("Missing NEXT_PUBLIC_COGNITO_USER_POOL_ID / NEXT_PUBLIC_COGNITO_CLIENT_ID env vars");
  }
  return CognitoJwtVerifier.create({ userPoolId, tokenUse: "id", clientId });
}

async function verify(token: string): Promise<CognitoCaller | null> {
  try {
    const payload = await getVerifier().verify(token);
    const email = typeof payload.email === "string" ? payload.email : undefined;
    return { sub: payload.sub, email };
  } catch {
    return null;
  }
}

/** Verifies the `Authorization: Bearer <idToken>` header sent by the client's fetch wrapper. */
export async function getCallerFromRequest(req: Request): Promise<CognitoCaller | null> {
  const header = req.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  return verify(header.slice(7));
}

/**
 * Verifies the ID token mirrored into a (non-httpOnly, client-set) cookie on
 * sign-in, for Server Components that need to know "is the visitor the
 * owner" (e.g. the public page preview banner) without a Request to read an
 * Authorization header from. Never used to gate mutations — those always go
 * through getCallerFromRequest (Lambda) or the Bearer header (Next.js API).
 */
export async function getCallerFromCookies(): Promise<CognitoCaller | null> {
  const token = (await cookies()).get(ID_TOKEN_COOKIE)?.value;
  return token ? verify(token) : null;
}

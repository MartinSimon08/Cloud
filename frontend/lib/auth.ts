import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
  type CognitoUserSession,
} from "amazon-cognito-identity-js";

function getUserPool(): CognitoUserPool {
  const UserPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID;
  const ClientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
  if (!UserPoolId || !ClientId) {
    throw new Error(
      "Missing NEXT_PUBLIC_COGNITO_USER_POOL_ID / NEXT_PUBLIC_COGNITO_CLIENT_ID env vars"
    );
  }
  return new CognitoUserPool({ UserPoolId, ClientId });
}

export function signUp(email: string, password: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const attributeList = [new CognitoUserAttribute({ Name: "email", Value: email })];
    getUserPool().signUp(email, password, attributeList, [], (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export function confirmSignUp(email: string, code: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool: getUserPool() });
    user.confirmRegistration(code, true, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export function resendConfirmationCode(email: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool: getUserPool() });
    user.resendConfirmationCode((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export function signIn(email: string, password: string): Promise<CognitoUserSession> {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool: getUserPool() });
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });
    user.authenticateUser(authDetails, {
      onSuccess: (session) => resolve(session),
      onFailure: (err) => reject(err),
    });
  });
}

export function signOut(): void {
  getUserPool().getCurrentUser()?.signOut();
  syncIdTokenCookie(null);
}

/** Returns a valid (refreshed if needed) session, or null if no one is signed in. */
export function getCurrentSession(): Promise<CognitoUserSession | null> {
  return new Promise((resolve, reject) => {
    const user = getUserPool().getCurrentUser();
    if (!user) {
      resolve(null);
      return;
    }
    user.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err) reject(err);
      else resolve(session && session.isValid() ? session : null);
    });
  });
}

/** Convenience: the ID token string to send as `Authorization: Bearer <idToken>`. */
export async function getIdToken(): Promise<string | null> {
  const session = await getCurrentSession();
  return session ? session.getIdToken().getJwtToken() : null;
}

const ID_TOKEN_COOKIE = "fh_id_token";

/**
 * Mirrors the ID token into a plain (non-httpOnly — client JS can't set
 * those) cookie, so Server Components (e.g. the public page's "is this
 * visitor the owner" preview check) can read and verify it without a
 * Request to pull an Authorization header from. Never relied on to gate
 * mutations — those always carry the token as a Bearer header instead.
 */
export function syncIdTokenCookie(idToken: string | null): void {
  if (typeof document === "undefined") return;
  if (!idToken) {
    document.cookie = `${ID_TOKEN_COOKIE}=; path=/; max-age=0`;
    return;
  }
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${ID_TOKEN_COOKIE}=${idToken}; path=/; max-age=3600; samesite=lax${secure}`;
}

export interface CurrentUser {
  email: string;
  role: "admin" | "user";
}

/** Combines the live Cognito session with the app's own `role` (from Mongo, via /api/auth/me). */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const idToken = await getIdToken();
  syncIdTokenCookie(idToken);
  if (!idToken) return null;

  const res = await fetch("/api/auth/me", { headers: { authorization: `Bearer ${idToken}` } });
  if (!res.ok) return null;
  const body = await res.json().catch(() => ({}));
  return body.user ?? null;
}

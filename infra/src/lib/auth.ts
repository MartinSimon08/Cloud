import type { APIGatewayProxyEventV2WithJWTAuthorizer } from "aws-lambda";

export interface Caller {
  sub: string;
  email?: string;
}

/**
 * Pulls the caller's identity out of the Cognito JWT the HTTP API authorizer
 * already validated. Must be the ID token (not the access token) for `email`
 * to be present.
 */
export function getCaller(event: APIGatewayProxyEventV2WithJWTAuthorizer): Caller {
  const claims = event.requestContext.authorizer.jwt.claims;
  const sub = claims.sub as string | undefined;
  if (!sub) throw new Error("Missing sub claim on JWT");
  const email = typeof claims.email === "string" ? claims.email : undefined;
  return { sub, email };
}

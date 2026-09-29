// Session cookie helpers shared by middleware.ts (edge runtime) and the
// /api/session and /api/v1 route handlers. The cookie holds the API's JWT and
// is httpOnly, so the browser never sees it; client code only gets SessionUser.
//
// decodeSession() reads the JWT payload WITHOUT verifying the signature. That
// is only for middleware.ts's early redirect of logged-out visitors. GET
// /api/session confirms the token with the API's /auth/me, and the API
// verifies it on every proxied call, so a forged cookie gets a 401.
import type { StaffRoleName } from "@arlink28/api-client";

export const SESSION_COOKIE = "arlink28_session";

export type SessionUser = {
  username: string;
  role: StaffRoleName;
  /** ISO timestamp; the cookie and the token expire together. */
  expiresAt: string;
};

// JwtSecurityTokenHandler shortens ClaimTypes.Name/Role to these by default;
// the long URIs are the fallback if that mapping is ever switched off.
const NAME_CLAIMS = ["unique_name", "name", "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
const ROLE_CLAIMS = ["role", "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

function base64UrlDecode(input: string): string {
  const b64 = input
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(input.length / 4) * 4, "=");
  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function firstString(payload: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = payload[key];
    if (typeof value === "string" && value) return value;
  }
  return undefined;
}

/** Returns the session in a JWT, or null if it's malformed or expired. */
export function decodeSession(token: string | undefined, now = Date.now()): SessionUser | null {
  if (!token) return null;
  try {
    const [, payloadPart] = token.split(".");
    if (!payloadPart) return null;
    const payload = JSON.parse(base64UrlDecode(payloadPart)) as Record<string, unknown>;
    const exp = typeof payload.exp === "number" ? payload.exp * 1000 : NaN;
    if (!(exp > now)) return null;
    const username = firstString(payload, NAME_CLAIMS);
    const role = firstString(payload, ROLE_CLAIMS);
    if (!username || (role !== "SuperAdmin" && role !== "Operator")) return null;
    return { username, role, expiresAt: new Date(exp).toISOString() };
  } catch {
    return null;
  }
}

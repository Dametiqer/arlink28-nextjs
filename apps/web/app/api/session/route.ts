// Admin session: GET = current user (null when signed out), POST = sign in,
// DELETE = sign out. The JWT stays in an httpOnly cookie; see utils/api/session.ts.
import { NextResponse, type NextRequest } from "next/server";
import type { MeResponse } from "@arlink28/api-client";
import { unwrapLegacyEnvelope } from "@/utils/api/client";
import { SESSION_COOKIE, decodeSession, type SessionUser } from "@/utils/api/session";
import { apiUrl, clearSessionCookie, problem, isSameOrigin } from "@/utils/server/api";
import { startSession } from "@/utils/server/session";

/**
 * Asks the API who the cookie's token belongs to. Unlike decodeSession(), this
 * checks the signature and that the account is still active. Returns null when
 * the API rejects the token, or undefined when it couldn't answer (unreachable,
 * or an API version without /auth/me).
 */
async function verifyWithApi(token: string): Promise<SessionUser | null | undefined> {
  try {
    const res = await fetch(`${apiUrl()}/api/v1/auth/me`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      cache: "no-store",
    });
    if (res.status === 401) return null;
    if (!res.ok) return undefined;
    const me = unwrapLegacyEnvelope<MeResponse>(await res.json());
    return { username: me.username, role: me.role, expiresAt: me.expiresAt };
  } catch {
    return undefined;
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  let user = decodeSession(token);
  if (user && token) {
    // If the API can't answer, keep the decoded session: it only drives the UI,
    // and the API still checks the token on every proxied call.
    const verified = await verifyWithApi(token);
    if (verified !== undefined) user = verified;
  }
  const res = NextResponse.json(user);
  res.headers.set("Cache-Control", "no-store");
  if (!user && token) clearSessionCookie(res);
  return res;
}

export function POST(req: NextRequest) {
  return startSession(req, "/api/v1/auth/login");
}

export async function DELETE(req: NextRequest) {
  if (!isSameOrigin(req)) return problem(403, "Cross-site request refused.");
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (token) {
    // Best effort: the API records the logout; the cookie is cleared either way.
    await fetch(`${apiUrl()}/api/v1/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }).catch(() => undefined);
  }
  const res = new NextResponse(null, { status: 204 });
  clearSessionCookie(res);
  return res;
}

// Admin session: GET = current user (null when signed out), POST = sign in,
// DELETE = sign out. The JWT stays in an httpOnly cookie; see utils/api/session.ts.
import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, decodeSession } from "@/utils/api/session";
import { apiUrl, clearSessionCookie, errorBody, isSameOrigin } from "@/utils/server/api";
import { startSession } from "@/utils/server/session";

export function GET(req: NextRequest) {
  const user = decodeSession(req.cookies.get(SESSION_COOKIE)?.value);
  const res = NextResponse.json({ success: true, message: "", data: user });
  res.headers.set("Cache-Control", "no-store");
  if (!user && req.cookies.has(SESSION_COOKIE)) clearSessionCookie(res);
  return res;
}

export function POST(req: NextRequest) {
  return startSession(req, "/api/v1/auth/login");
}

export async function DELETE(req: NextRequest) {
  if (!isSameOrigin(req)) return NextResponse.json(errorBody("Cross-site request refused."), { status: 403 });
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

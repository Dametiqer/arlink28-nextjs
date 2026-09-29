// Server-side gate for the admin UI: signed-out visitors are redirected to
// the login page before any protected page renders. Role checks stay in
// ProtectedPage and, authoritatively, in the C# API.
import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, decodeSession } from "@/utils/api/session";

// Reachable without a session.
const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/reset-password", "/admin/invite/accept"];

function isPublic(pathname: string): boolean {
  return PUBLIC_ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const user = decodeSession(req.cookies.get(SESSION_COOKIE)?.value);

  if (pathname === "/admin/login" && user) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  if (isPublic(pathname) || user) return NextResponse.next();

  const login = new URL("/admin/login", req.url);
  if (pathname !== "/admin" && pathname !== "/admin/dashboard") login.searchParams.set("next", pathname);
  const res = NextResponse.redirect(login);
  if (req.cookies.has(SESSION_COOKIE)) res.cookies.delete(SESSION_COOKIE);
  return res;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

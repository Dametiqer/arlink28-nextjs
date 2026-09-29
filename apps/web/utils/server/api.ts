// Server-only helpers for route handlers that talk to the C# API.
import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/utils/api/session";

/** Base URL of the C# API, e.g. http://localhost:5270. Server-only: never exposed to the browser. */
export function apiUrl(): string {
  const url = process.env.API_URL;
  if (!url) throw new Error("API_URL is not set (see apps/web/.env.example).");
  return url.replace(/\/+$/, "");
}

/**
 * Blocks cross-site state changes. SameSite=Lax already keeps the cookie off
 * cross-site POST/PATCH/DELETE; this also rejects any mutating request whose
 * Origin isn't this app.
 */
export function isSameOrigin(req: NextRequest): boolean {
  if (req.method === "GET" || req.method === "HEAD") return true;
  const origin = req.headers.get("origin");
  if (origin === null) return true; // not a browser request, so it carries no ambient cookie risk
  // Behind Caddy (ADR 0004) the public host arrives as X-Forwarded-Host, not in req.nextUrl.
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return host !== null && new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function setSessionCookie(res: NextResponse, token: string, expiresAt: string): void {
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export function clearSessionCookie(res: NextResponse): void {
  res.cookies.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

const DEFAULT_CODES: Record<number, string> = {
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  502: "API_UNREACHABLE",
};

/** An RFC 9457 Problem Details error, the same shape the C# API returns. */
export function problem(status: number, detail: string, code = DEFAULT_CODES[status] ?? "BAD_REQUEST"): NextResponse {
  return NextResponse.json(
    { title: detail, status, detail, code },
    { status, headers: { "Content-Type": "application/problem+json" } },
  );
}

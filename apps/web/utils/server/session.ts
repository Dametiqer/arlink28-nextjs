// Server-only: exchange credentials with the C# API for a session cookie.
import { NextResponse, type NextRequest } from "next/server";
import type { AuthResponse } from "@arlink28/api-client";
import { unwrapLegacyEnvelope } from "@/utils/api/client";
import type { SessionUser } from "@/utils/api/session";
import { apiUrl, problem, isSameOrigin, setSessionCookie } from "./api";

/**
 * Forwards a JSON body to an API endpoint that returns AuthResponse (login,
 * invite/accept). On success the token goes into the httpOnly cookie and the
 * browser gets only the user; on failure the API's error body passes through.
 */
export async function startSession(req: NextRequest, apiPath: string): Promise<NextResponse> {
  if (!isSameOrigin(req)) return problem(403, "Cross-site request refused.");

  let upstream: Response;
  try {
    upstream = await fetch(`${apiUrl()}${apiPath}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: await req.text(),
      cache: "no-store",
    });
  } catch {
    return problem(502, "The API is unreachable. Please try again.");
  }

  const text = await upstream.text();
  if (!upstream.ok) {
    return new NextResponse(text || null, {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("content-type") ?? "application/json" },
    });
  }

  const data = unwrapLegacyEnvelope<AuthResponse>(JSON.parse(text));
  const user: SessionUser = { username: data.username, role: data.role, expiresAt: data.expiresAt };
  const res = NextResponse.json(user);
  setSessionCookie(res, data.accessToken, data.expiresAt);
  return res;
}

// Same-origin proxy to the C# API's /api/v1/*. The browser calls /api/v1/... on
// this app; the session cookie becomes the Authorization header here, so the
// token never reaches client JavaScript.
import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/utils/api/session";
import { apiUrl, clearSessionCookie, errorBody, isSameOrigin } from "@/utils/server/api";

// These return or revoke a token, so they must go through /api/session.
const SESSION_ONLY = new Set(["POST auth/login", "POST auth/logout", "POST users/invite/accept"]);

async function proxy(req: NextRequest, { params }: { params: { path: string[] } }) {
  // `..` would let fetch() resolve outside /api/v1 (e.g. to /swagger).
  if (params.path.some((s) => s === "." || s === "..")) {
    return NextResponse.json(errorBody("Not found."), { status: 404 });
  }
  const path = params.path.map(encodeURIComponent).join("/");
  if (SESSION_ONLY.has(`${req.method} ${path}`)) {
    return NextResponse.json(errorBody("Use /api/session for this."), { status: 404 });
  }
  if (!isSameOrigin(req)) return NextResponse.json(errorBody("Cross-site request refused."), { status: 403 });

  const headers = new Headers({ Accept: "application/json" });
  const contentType = req.headers.get("content-type");
  if (contentType) headers.set("Content-Type", contentType);
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  let upstream: Response;
  try {
    upstream = await fetch(`${apiUrl()}/api/v1/${path}${req.nextUrl.search}`, {
      method: req.method,
      headers,
      body: hasBody ? await req.arrayBuffer() : undefined,
      cache: "no-store",
      redirect: "manual",
    });
  } catch {
    return NextResponse.json(errorBody("The API is unreachable. Please try again."), { status: 502 });
  }

  const res = new NextResponse(upstream.status === 204 ? null : upstream.body, { status: upstream.status });
  const upstreamType = upstream.headers.get("content-type");
  if (upstreamType) res.headers.set("Content-Type", upstreamType);
  res.headers.set("Cache-Control", "no-store");
  // The API rejected the token (expired or revoked): drop the dead cookie.
  if (upstream.status === 401 && token) clearSessionCookie(res);
  return res;
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE };

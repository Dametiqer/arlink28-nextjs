// Browser-side API client. Calls go to this app's own origin: /api/v1/* is
// proxied to the C# API with the session cookie turned into a Bearer token
// (app/api/v1/[...path]/route.ts), and /api/session/* manages that cookie.
// No token is ever readable from JavaScript.

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    /** Machine-readable code, e.g. NO_RATE_FOR_DATE on a 422 quote error. */
    public code?: string,
    /** Per-field messages from a 400 validation failure, keyed by field name. */
    public fieldErrors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type Json = Record<string, unknown>;

function isObject(v: unknown): v is Json {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function fallbackMessage(status: number): string {
  if (status === 401) return "Your session has expired. Please sign in again.";
  if (status === 403) return "You don't have permission to do that.";
  if (status === 404) return "Not found.";
  if (status === 429) return "Too many requests. Please wait a moment and try again.";
  if (status >= 500) return "Something went wrong on our side. Please try again.";
  return "Request failed.";
}

/**
 * Turns an error body into an ApiError. The API answers errors in one of three
 * shapes:
 * - its envelope, `{ success: false, message, code? }`;
 * - ASP.NET validation Problem Details, `{ title, status, errors: { Field: [..] } }`;
 * - no body at all (401/403 from the JWT middleware).
 */
function toApiError(status: number, body: unknown): ApiError {
  if (isObject(body) && typeof body.message === "string" && body.message) {
    return new ApiError(status, body.message, typeof body.code === "string" ? body.code : undefined);
  }
  if (isObject(body) && isObject(body.errors)) {
    const fieldErrors: Record<string, string[]> = {};
    for (const [field, msgs] of Object.entries(body.errors)) {
      if (Array.isArray(msgs)) fieldErrors[field] = msgs.map(String);
    }
    const first = Object.values(fieldErrors)[0]?.[0];
    const title = typeof body.title === "string" ? body.title : undefined;
    return new ApiError(status, first ?? title ?? fallbackMessage(status), undefined, fieldErrors);
  }
  return new ApiError(status, fallbackMessage(status));
}

/** Reads a response from the API or the session routes: unwraps the envelope, and returns undefined for 204. */
export async function parseResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  let body: unknown;
  try {
    body = text ? JSON.parse(text) : undefined;
  } catch {
    body = undefined;
  }
  if (!res.ok) throw toApiError(res.status, body);
  if (isObject(body) && typeof body.success === "boolean") {
    if (!body.success) throw toApiError(res.status, body);
    return body.data as T;
  }
  return body as T;
}

export async function apiFetch<T = void>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (options.body !== undefined && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const res = await fetch(path, { ...options, headers, credentials: "same-origin" });
  // The API rejected the session (expired or revoked) and the proxy has cleared
  // the cookie: go back to sign-in, as middleware.ts does for page loads.
  if (res.status === 401 && path.startsWith("/api/v1/") && window.location.pathname.startsWith("/admin/")) {
    const next = encodeURIComponent(window.location.pathname);
    window.location.assign(`/admin/login?next=${next}`);
  }
  return parseResponse<T>(res);
}

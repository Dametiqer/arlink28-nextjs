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
 * Turns an error body into an ApiError. The API sends RFC 9457 Problem Details
 * (`{ title, status, detail?, code, traceId, errors? }`) for every error, and
 * so do this app's own route handlers.
 */
function toApiError(status: number, body: unknown): ApiError {
  if (!isObject(body)) return new ApiError(status, fallbackMessage(status));
  const code = typeof body.code === "string" ? body.code : undefined;

  let fieldErrors: Record<string, string[]> | undefined;
  if (isObject(body.errors)) {
    fieldErrors = {};
    for (const [field, msgs] of Object.entries(body.errors)) {
      if (Array.isArray(msgs)) fieldErrors[field] = msgs.map(String);
    }
  }

  const message =
    (typeof body.detail === "string" && body.detail) ||
    (fieldErrors && Object.values(fieldErrors)[0]?.[0]) ||
    // TODO(remove once arlink28-api's Problem Details release is deployed): old envelope's message.
    (typeof body.message === "string" && body.message) ||
    fallbackMessage(status);
  return new ApiError(status, message, code, fieldErrors);
}

/**
 * The API used to wrap success bodies as `{ success, message, data }`; it now
 * returns the resource itself. Accepts both, so this app and the API can
 * deploy in either order. TODO: drop the envelope branch once both are live.
 */
export function unwrapLegacyEnvelope<T>(body: unknown): T {
  if (isObject(body) && typeof body.success === "boolean" && "data" in body) return body.data as T;
  return body as T;
}

/** Reads a response from the API or the session routes. Returns undefined for 204. */
export async function parseResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  let body: unknown;
  try {
    body = text ? JSON.parse(text) : undefined;
  } catch {
    body = undefined;
  }
  if (!res.ok) throw toApiError(res.status, body);
  return unwrapLegacyEnvelope<T>(body);
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

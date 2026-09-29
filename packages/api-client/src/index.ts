// Types for the C# API (arlink28-api repo). Type-only: import with `import type`.
//
// - `paths` / `components` are generated from openapi.json (`pnpm generate`,
//   refreshed from a running API with `pnpm sync`). Use them for routes and
//   request bodies.
// - Response bodies are hand-written below: the API's controllers return
//   ApiResponse<object>, so its spec doesn't describe them yet. Each type
//   mirrors the named C# record; move to generated types once the API declares
//   [ProducesResponseType(typeof(ApiResponse<T>), ...)].
import type { components, paths } from "./schema";

export type { components, paths };

type Schemas = components["schemas"];

/** JSON request body of an operation, e.g. RequestBody<"/api/v1/auth/login", "post">. */
export type RequestBody<P extends keyof paths, M extends keyof paths[P]> = paths[P][M] extends {
  requestBody?: { content: { "application/json": infer B } };
}
  ? B
  : never;

/**
 * Staff roles by name. The API accepts and returns names (Newtonsoft), but its
 * spec says integers because Swashbuckle reads System.Text.Json settings, so
 * request types swap the generated StaffRole for this.
 */
export type StaffRoleName = "SuperAdmin" | "Operator";

type WithRole<T> = Omit<T, "role"> & { role: StaffRoleName };

export type LoginRequest = Schemas["LoginRequest"];
export type ChangePasswordRequest = Schemas["ChangePasswordRequest"];
export type ResetPasswordRequest = Schemas["ResetPasswordRequest"];
export type ConfirmResetPasswordRequest = Schemas["ConfirmResetPasswordRequest"];
export type AcceptInviteRequest = Schemas["AcceptInviteRequest"];
export type InviteUserRequest = WithRole<Schemas["InviteUserRequest"]>;
export type AssignRoleRequest = WithRole<Schemas["AssignRoleRequest"]>;

/** Success envelope: every 2xx body except 204 No Content. */
export type ApiEnvelope<T> = { success: true; message: string; data: T };

/** Error envelope (4xx/5xx). `code` is set on 422 quote errors, e.g. NO_RATE_FOR_DATE. */
export type ApiErrorBody = { success: false; message: string; code?: string };

/** Features/Auth/ResponseModels/AuthResponse.cs. Login and invite/accept return this. */
export type AuthResponse = {
  accessToken: string;
  role: StaffRoleName;
  username: string;
  expiresAt: string;
};

/** Features/UserManagement/ResponseModels/UserResponse.cs */
export type UserResponse = {
  id: string;
  username: string;
  email: string;
  role: StaffRoleName;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
};

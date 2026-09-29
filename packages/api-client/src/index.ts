// Types for the C# API (arlink28-api repo). Type-only: import with `import type`.
//
// Everything here is generated from openapi.json (`pnpm generate`; refresh the
// snapshot from a running API with `pnpm sync`). The aliases below just give
// the schemas the web app uses short names.
import type { components, paths } from "./schema";

export type { components, paths };

type Schemas = components["schemas"];

/** JSON request body of an operation, e.g. RequestBody<"/api/v1/auth/login", "post">. */
export type RequestBody<P extends keyof paths, M extends keyof paths[P]> = paths[P][M] extends {
  requestBody?: { content: { "application/json": infer B } };
}
  ? B
  : never;

export type StaffRoleName = Schemas["StaffRole"];

export type LoginRequest = Schemas["LoginRequest"];
export type ChangePasswordRequest = Schemas["ChangePasswordRequest"];
export type ResetPasswordRequest = Schemas["ResetPasswordRequest"];
export type ConfirmResetPasswordRequest = Schemas["ConfirmResetPasswordRequest"];
export type AcceptInviteRequest = Schemas["AcceptInviteRequest"];
export type InviteUserRequest = Schemas["InviteUserRequest"];
export type AssignRoleRequest = Schemas["AssignRoleRequest"];

export type AuthResponse = Schemas["AuthResponse"];
export type MeResponse = Schemas["MeResponse"];
export type UserResponse = Schemas["UserResponse"];

/**
 * Every API error: RFC 9457 Problem Details plus the API's extensions. `code`
 * is stable (e.g. UNAUTHENTICATED, VALIDATION_FAILED, NO_RATE_FOR_DATE), so
 * switch on it, never on `detail`. `errors` is set on validation failures.
 */
export type ApiProblem = Schemas["ProblemDetails"] & {
  code?: string;
  traceId?: string;
  errors?: Record<string, string[]>;
};

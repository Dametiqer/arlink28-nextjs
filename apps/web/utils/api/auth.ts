import type {
  ChangePasswordRequest,
  ConfirmResetPasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
} from "@arlink28/api-client";
import { apiFetch } from "./client";
import type { SessionUser } from "./session";

/** Session routes: the server keeps the JWT in an httpOnly cookie and hands back only the user. */
export const sessionApi = {
  current: () => apiFetch<SessionUser | null>("/api/session"),

  login: (body: LoginRequest) => apiFetch<SessionUser>("/api/session", { method: "POST", body: JSON.stringify(body) }),

  logout: () => apiFetch("/api/session", { method: "DELETE" }),
};

export const authApi = {
  changePassword: (body: ChangePasswordRequest) =>
    apiFetch("/api/v1/auth/change-password", { method: "PATCH", body: JSON.stringify(body) }),

  requestPasswordReset: (body: ResetPasswordRequest) =>
    apiFetch("/api/v1/auth/reset-password/request", { method: "POST", body: JSON.stringify(body) }),

  confirmPasswordReset: (body: ConfirmResetPasswordRequest) =>
    apiFetch("/api/v1/auth/reset-password/confirm", { method: "POST", body: JSON.stringify(body) }),
};

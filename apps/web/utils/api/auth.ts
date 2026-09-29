import { apiFetch } from "./client";

export interface LoginResponse {
  accessToken: string;
  role: string;
  username: string;
  expiresAt: string;
}

export const authApi = {
  login: (username: string, password: string) =>
    apiFetch<LoginResponse>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  logout: () =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("arlink28_token") ?? ""}`,
      },
    }).catch(() => {}), // fire-and-forget; token is cleared client-side anyway

  changePassword: (currentPassword: string, newPassword: string) =>
    apiFetch("/api/v1/auth/change-password", {
      method: "PATCH",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  requestPasswordReset: (email: string) =>
    apiFetch("/api/v1/auth/reset-password/request", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  confirmPasswordReset: (token: string, newPassword: string) =>
    apiFetch("/api/v1/auth/reset-password/confirm", {
      method: "POST",
      body: JSON.stringify({ token, newPassword }),
    }),
};

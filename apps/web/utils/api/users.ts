import { apiFetch } from "./client";

export interface UserRecord {
  id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

export interface AcceptInviteResponse {
  accessToken: string;
  role: string;
  username: string;
  expiresAt: string;
}

export const usersApi = {
  list: () => apiFetch<UserRecord[]>("/api/v1/users"),

  invite: (email: string, role: string) =>
    apiFetch("/api/v1/users/invite", {
      method: "POST",
      body: JSON.stringify({ email, role }),
    }),

  acceptInvite: (token: string, username: string, password: string) =>
    apiFetch<AcceptInviteResponse>("/api/v1/users/invite/accept", {
      method: "POST",
      body: JSON.stringify({ token, username, password }),
    }),

  assignRole: (id: string, role: string) =>
    apiFetch(`/api/v1/users/${id}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    }),

  deactivate: (id: string) => apiFetch(`/api/v1/users/${id}/deactivate`, { method: "PATCH" }),
};

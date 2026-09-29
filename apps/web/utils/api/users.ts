import type { AcceptInviteRequest, InviteUserRequest, StaffRoleName, UserResponse } from "@arlink28/api-client";
import { apiFetch } from "./client";
import type { SessionUser } from "./session";

export const usersApi = {
  list: () => apiFetch<UserResponse[]>("/api/v1/users"),

  invite: (body: InviteUserRequest) => apiFetch("/api/v1/users/invite", { method: "POST", body: JSON.stringify(body) }),

  /** Goes through the session route: the API returns a token, which becomes the session cookie. */
  acceptInvite: (body: AcceptInviteRequest) =>
    apiFetch<SessionUser>("/api/session/invite", { method: "POST", body: JSON.stringify(body) }),

  assignRole: (id: string, role: StaffRoleName) =>
    apiFetch(`/api/v1/users/${encodeURIComponent(id)}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    }),

  deactivate: (id: string) => apiFetch(`/api/v1/users/${encodeURIComponent(id)}/deactivate`, { method: "PATCH" }),
};

"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { sessionApi } from "@/utils/api/auth";
import type { SessionUser } from "@/utils/api/session";

interface AuthContextType {
  user: SessionUser | null;
  isLoading: boolean;
  isSuperAdmin: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  /** Re-reads the session from the server, e.g. after accepting an invite. */
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

/** Where to go after sign-in: the ?next= page middleware.ts sent us from, if it's an admin page. */
function postLoginTarget(): string {
  const next = new URLSearchParams(window.location.search).get("next");
  return next && next.startsWith("/admin/") && !next.startsWith("//") ? next : "/admin/dashboard";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const refresh = useCallback(async () => {
    try {
      setUser(await sessionApi.current());
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refresh().finally(() => setIsLoading(false));
  }, [refresh]);

  const login = useCallback(
    async (username: string, password: string) => {
      setUser(await sessionApi.login({ username, password }));
      router.push(postLoginTarget());
    },
    [router],
  );

  const logout = useCallback(async () => {
    await sessionApi.logout().catch(() => undefined); // the server clears the cookie regardless
    setUser(null);
    router.push("/admin/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isSuperAdmin: user?.role === "SuperAdmin",
        login,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}

"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { authApi, type LoginResponse } from "@/utils/api/auth";

interface AuthUser {
  username: string;
  role: string;
  expiresAt: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isSuperAdmin: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const TOKEN_KEY = "arlink28_token";
const USER_KEY = "arlink28_user";

const AuthContext = createContext<AuthContextType | null>(null);

function readSession(): { user: AuthUser; token: string } | null {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const raw = localStorage.getItem(USER_KEY);
    if (!token || !raw) return null;
    const user = JSON.parse(raw) as AuthUser;
    if (new Date(user.expiresAt) <= new Date()) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      return null;
    }
    return { user, token };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const session = readSession();
    if (session) setUser(session.user);
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (username: string, password: string) => {
      const data: LoginResponse = await authApi.login(username, password);
      const userData: AuthUser = { username: data.username, role: data.role, expiresAt: data.expiresAt };
      localStorage.setItem(TOKEN_KEY, data.accessToken);
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      setUser(userData);
      router.push("/admin/dashboard");
    },
    [router],
  );

  const logout = useCallback(() => {
    authApi.logout();
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
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

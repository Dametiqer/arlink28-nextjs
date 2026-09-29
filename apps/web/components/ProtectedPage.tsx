"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface Props {
  children: ReactNode;
  requireSuperAdmin?: boolean;
}

export default function ProtectedPage({ children, requireSuperAdmin = false }: Props) {
  const { user, isLoading, isSuperAdmin, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/admin/login");
      return;
    }
    if (requireSuperAdmin && !isSuperAdmin) router.replace("/admin/dashboard");
  }, [isLoading, user, isSuperAdmin, requireSuperAdmin, router]);

  if (isLoading || !user) {
    return <div className="loading-screen">Loading…</div>;
  }
  if (requireSuperAdmin && !isSuperAdmin) {
    return <div className="loading-screen">Access denied.</div>;
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          ARLink28 <span>Admin</span>
        </div>
        <nav className="sidebar-nav">
          <Link href="/admin/dashboard">Dashboard</Link>
          {isSuperAdmin && <Link href="/admin/users">Users</Link>}
          <Link href="/admin/change-password">Change Password</Link>
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">{user.username}</div>
          <div className="sidebar-role">{user.role}</div>
          <button className="btn btn-ghost btn-sm" onClick={logout}>
            Sign out
          </button>
        </div>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
}

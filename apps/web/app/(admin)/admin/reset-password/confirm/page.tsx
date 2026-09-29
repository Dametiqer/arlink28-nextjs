"use client";

import { Suspense, useState, FormEvent, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { authApi } from "@/utils/api/auth";

function ConfirmResetForm() {
  const params = useSearchParams();
  const token = params.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) setError("Invalid or missing reset token. Please request a new one.");
  }, [token]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authApi.confirmPasswordReset({ token, newPassword: password });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card">
      <h1>Set new password</h1>
      <p className="subtitle">Enter your new password below.</p>

      {error && <div className="alert alert-error">{error}</div>}

      {success ? (
        <>
          <div className="alert alert-success">Password reset successfully.</div>
          <p className="auth-footer">
            <Link href="/admin/login">Sign in with your new password</Link>
          </p>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">New password</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Min 8 chars, upper, lower, digit"
              disabled={!token}
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading || !token}>
            {loading ? "Saving…" : "Reset password"}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordConfirmPage() {
  return (
    <div className="auth-page">
      <Suspense
        fallback={
          <div className="auth-card">
            <p>Loading…</p>
          </div>
        }
      >
        <ConfirmResetForm />
      </Suspense>
    </div>
  );
}

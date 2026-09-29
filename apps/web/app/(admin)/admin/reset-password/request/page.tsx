'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { authApi } from '@/utils/api/auth';

export default function ResetPasswordRequestPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.requestPasswordReset(email);
    } catch {
      // Silently ignore — API always returns 204 to prevent email enumeration
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Reset password</h1>
        <p className="subtitle">Enter your email address and we&apos;ll send you a reset link.</p>

        {submitted ? (
          <>
            <div className="alert alert-success">
              If that email is registered, a reset link has been sent. Check your inbox — the link expires in 1 hour.
            </div>
            <p className="auth-footer">
              <Link href="/admin/login">Back to sign in</Link>
            </p>
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Sending…' : 'Send reset link'}
              </button>
            </form>
            <p className="auth-footer">
              <Link href="/admin/login">Back to sign in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

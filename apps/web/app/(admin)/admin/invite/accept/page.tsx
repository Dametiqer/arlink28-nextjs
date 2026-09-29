'use client';

import { Suspense, useState, FormEvent, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { usersApi, type AcceptInviteResponse } from '@/utils/api/users';

const TOKEN_KEY = 'arlink28_token';
const USER_KEY = 'arlink28_user';

function AcceptInviteForm() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get('token') ?? '';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) setError('Invalid or missing invite token. Please request a new invite.');
  }, [token]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data: AcceptInviteResponse = await usersApi.acceptInvite(token, username, password);
      localStorage.setItem(TOKEN_KEY, data.accessToken);
      localStorage.setItem(USER_KEY, JSON.stringify({
        username: data.username,
        role: data.role,
        expiresAt: data.expiresAt,
      }));
      router.replace('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set up account');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card">
      <h1>Set up your account</h1>
      <p className="subtitle">Choose a username and password to complete your invitation.</p>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            placeholder="Letters, digits and underscores"
            disabled={!token}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Min 8 chars, upper, lower, digit"
            disabled={!token}
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading || !token}>
          {loading ? 'Creating account…' : 'Create account & sign in'}
        </button>
      </form>
    </div>
  );
}

export default function AcceptInvitePage() {
  return (
    <div className="auth-page">
      <Suspense fallback={<div className="auth-card"><p>Loading…</p></div>}>
        <AcceptInviteForm />
      </Suspense>
    </div>
  );
}

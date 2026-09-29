'use client';

import { useState, FormEvent } from 'react';
import ProtectedPage from '@/components/ProtectedPage';
import { authApi } from '@/utils/api/auth';

export default function ChangePasswordPage() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(''); setSuccess(false);
    setLoading(true);
    try {
      await authApi.changePassword(current, next);
      setSuccess(true);
      setCurrent(''); setNext('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedPage>
      <div className="page-header"><h1>Change password</h1></div>
      <div className="card" style={{ padding: '1.5rem', maxWidth: 420 }}>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">Password changed successfully.</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cur">Current password</label>
            <input id="cur" type="password" value={current} onChange={e => setCurrent(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="nxt">New password</label>
            <input id="nxt" type="password" value={next} onChange={e => setNext(e.target.value)} required
              placeholder="Min 8 chars, upper, lower, digit" />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Saving…' : 'Update password'}
          </button>
        </form>
      </div>
    </ProtectedPage>
  );
}

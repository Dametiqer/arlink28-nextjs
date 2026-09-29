'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedPage from '@/components/ProtectedPage';
import { usersApi } from '@/utils/api/users';

export default function InviteUserPage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Operator');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(''); setSuccess(false);
    setLoading(true);
    try {
      await usersApi.invite(email, role);
      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send invite');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedPage requireSuperAdmin>
      <div className="page-header">
        <h1>Invite user</h1>
        <button className="btn btn-secondary btn-sm" onClick={() => router.back()}>← Back</button>
      </div>
      <div className="card" style={{ padding: '1.5rem', maxWidth: 420 }}>
        {error && <div className="alert alert-error">{error}</div>}
        {success && (
          <div className="alert alert-success">
            Invite sent to {email}. The link expires in 48 hours.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="staff@arlink28.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select id="role" value={role} onChange={e => setRole(e.target.value)}>
              <option value="Operator">Operator</option>
              <option value="SuperAdmin">SuperAdmin</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Sending…' : 'Send invite'}
          </button>
        </form>
      </div>
    </ProtectedPage>
  );
}

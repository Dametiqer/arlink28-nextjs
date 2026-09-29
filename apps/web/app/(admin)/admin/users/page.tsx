'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedPage from '@/components/ProtectedPage';
import { usersApi, type UserRecord } from '@/utils/api/users';
import { useAuth } from '@/context/AuthContext';
import { ApiError } from '@/utils/api/client';

export default function UsersPage() {
  const { isSuperAdmin } = useAuth();
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState('');

  async function load() {
    try {
      setUsers(await usersApi.list());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleAssignRole(id: string, role: string) {
    setActionError('');
    try {
      await usersApi.assignRole(id, role);
      await load();
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : 'Failed to update role');
    }
  }

  async function handleDeactivate(id: string) {
    if (!confirm('Deactivate this user?')) return;
    setActionError('');
    try {
      await usersApi.deactivate(id);
      await load();
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : 'Failed to deactivate user');
    }
  }

  return (
    <ProtectedPage requireSuperAdmin>
      <div className="page-header">
        <h1>Users</h1>
        {isSuperAdmin && (
          <Link href="/admin/users/invite" className="btn btn-primary btn-sm">Invite user</Link>
        )}
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {actionError && <div className="alert alert-error">{actionError}</div>}

      {loading ? (
        <div style={{ color: '#9ca3af', padding: '2rem 0' }}>Loading…</div>
      ) : (
        <div className="card">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last login</th>
                {isSuperAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 500 }}>{u.username}</td>
                  <td style={{ color: '#6b7280' }}>{u.email}</td>
                  <td>
                    <span className={`badge badge-${u.role.toLowerCase()}`}>{u.role}</span>
                  </td>
                  <td>
                    <span className={`badge ${u.isActive ? 'badge-active' : 'badge-inactive'}`}>
                      {u.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ color: '#9ca3af' }}>
                    {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : '—'}
                  </td>
                  {isSuperAdmin && (
                    <td style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <select
                        value={u.role}
                        onChange={e => handleAssignRole(u.id, e.target.value)}
                        style={{ padding: '0.25rem 0.5rem', borderRadius: 6, border: '1px solid #d1d5db', fontSize: '0.8125rem' }}
                      >
                        <option value="Operator">Operator</option>
                        <option value="SuperAdmin">SuperAdmin</option>
                      </select>
                      {u.isActive && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeactivate(u.id)}
                        >
                          Deactivate
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </ProtectedPage>
  );
}

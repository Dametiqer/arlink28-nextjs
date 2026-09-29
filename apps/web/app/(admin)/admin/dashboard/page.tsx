'use client';

import ProtectedPage from '@/components/ProtectedPage';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedPage>
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>
      <div className="card" style={{ padding: '1.5rem', maxWidth: 480 }}>
        <p style={{ margin: '0 0 0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>Signed in as</p>
        <p style={{ margin: '0 0 0.25rem', fontWeight: 700, fontSize: '1.125rem' }}>{user?.username}</p>
        <p style={{ margin: 0 }}>
          <span className={`badge badge-${user?.role?.toLowerCase()}`}>{user?.role}</span>
        </p>
      </div>
      <p style={{ marginTop: '1.5rem', color: '#9ca3af', fontSize: '0.875rem' }}>
        Package management, bookings, and customer views land in Phase 3.
      </p>
    </ProtectedPage>
  );
}

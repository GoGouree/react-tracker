import React from 'react';

export type User = { id: number; name: string; email: string; present: boolean };

type Props = {
  user: User;
  onToggle: (id: number) => void;
  onRemove?: (id: number) => void;
};

export default function UserCard({ user, onToggle, onRemove }: Props) {
  return (
    <div style={{
      border: '1px solid #ddd', padding: 12, borderRadius: 6, marginBottom: 8,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <div>
        <div style={{ fontWeight: 600 }}>{user.name}</div>
        <div style={{ fontSize: 13, color: '#666' }}>{user.email}</div>
        <div style={{ marginTop: 6, fontSize: 12 }}>
          Status: <strong>{user.present ? 'Present' : 'Absent'}</strong>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => onToggle(user.id)}>
          {user.present ? 'Mark Absent' : 'Mark Present'}
        </button>
        {onRemove && <button onClick={() => onRemove(user.id)}>Remove</button>}
      </div>
    </div>
  );
}
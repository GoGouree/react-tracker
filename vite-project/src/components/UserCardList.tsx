import React, { useState } from 'react';
import UserCard, { type User } from './UserCard';

export default function UserCardList() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', present: true },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', present: false },
  ]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const addUser = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!name || !email) return;
    setUsers(prev => [...prev, { id: Date.now(), name: name.trim(), email: email.trim(), present: false }]);
    setName(''); setEmail('');
  };

  const togglePresent = (id: number) => setUsers(prev => prev.map(u => u.id === id ? { ...u, present: !u.present } : u));
  const removeUser = (id: number) => setUsers(prev => prev.filter(u => u.id !== id));

  return (
    <section>
      <h2>Users</h2>

      <form onSubmit={addUser} style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      <div>
        {users.length === 0 ? <div>No users</div> : users.map(u => (
          <UserCard key={u.id} user={u} onToggle={togglePresent} onRemove={removeUser} />
        ))}
      </div>
    </section>
  );
}
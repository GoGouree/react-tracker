// src/components/LoginForm.tsx
import { useState } from 'react';

type Errors = { email?: string; password?: string };

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const e: Errors = {};
    if (!email) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Invalid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Password must be 6+ chars';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!validate()) return;
    console.log('Login success:', { email, password });
  };

  return (
    <form onSubmit={onSubmit} noValidate aria-label="login form">
      <div>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
          />
        </label>
        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
      </div>

      <div>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            aria-invalid={!!errors.password}
          />
        </label>
        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
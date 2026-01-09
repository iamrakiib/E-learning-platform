'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export type AuthMode = 'login' | 'register';

type AuthFormProps = {
  mode: AuthMode;
};

const copy: Record<AuthMode, { title: string; cta: string; helper: string; helperHref: string }> = {
  login: {
    title: 'Welcome back',
    cta: 'Sign in',
    helper: "Don't have an account?",
    helperHref: '/register',
  },
  register: {
    title: 'Join CourseHub',
    cta: 'Create account',
    helper: 'Already joined?',
    helperHref: '/login',
  },
};

export default function AuthForm({ mode }: AuthFormProps) {
  const { title, cta, helper, helperHref } = copy[mode];
  const { login, register } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        const name = formData.get('name') as string;
        const role = formData.get('role') as string || 'student';
        await register(email, password, name, role);
      }
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glow-card form-card">
      <div className="pill">{mode === 'login' ? 'Login' : 'Register'}</div>
      <h2 style={{ margin: '0.5rem 0 0.25rem', color: 'var(--text-dark)', fontSize: '1.75rem' }}>{title}</h2>
      <p style={{ color: 'var(--text-gray)', margin: '0 0 1.5rem', fontSize: '0.95rem' }}>
        {mode === 'login' ? 'Access your dashboard and courses.' : 'Create credentials to start learning.'}
      </p>
      
      {error && (
        <div style={{ 
          padding: '0.75rem', 
          background: 'rgba(239, 68, 68, 0.1)', 
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '8px',
          color: '#ef4444',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {mode === 'register' && (
          <>
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" type="text" placeholder="John Doe" required />
          </>
        )}
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" required />
        <label htmlFor="password">Password</label>
        <div className="password-input-wrapper">
          <input 
            id="password" 
            name="password" 
            type={showPassword ? 'text' : 'password'} 
            placeholder="••••••••" 
            required 
            minLength={6} 
          />
          <button 
            type="button" 
            className="password-toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        </div>
        {mode === 'register' && (
          <>
            <label htmlFor="role">Role</label>
            <select id="role" name="role" style={{ 
              width: '100%', 
              padding: '0.9rem 1rem', 
              borderRadius: '12px',
              border: '1px solid var(--stroke)',
              background: 'rgba(255, 255, 255, 0.04)',
              color: 'var(--sand)'
            }}>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </>
        )}
        <button className="button" type="submit" disabled={isLoading}>
          {isLoading ? 'Please wait...' : cta}
        </button>
      </form>
      <p style={{ marginTop: '0.75rem', color: 'var(--muted)' }}>
        {helper} <Link href={helperHref as any} style={{ color: 'var(--accent)' }}>Switch</Link>
      </p>
    </div>
  );
}

'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    setLoading(false);

    if (res.ok) {
      // Auto-login after register
      const login = await signIn('credentials', { redirect: false, email, password });
      if (login?.ok) router.push('/products');
      else router.push('/login');
    } else {
      const data = await res.json().catch(() => ({}));
      setErr(data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {err && <p className="text-sm text-red-600">{err}</p>}
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FiUser className="text-gray-400 mr-2" />
          <input className="w-full outline-none" placeholder='Enter a name' value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FiMail className="text-gray-400 mr-2" />
          <input className="w-full outline-none" placeholder='Enter a valid email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FiLock className="text-gray-400 mr-2" />
          <input className="w-full outline-none" placeholder='Enter a strong password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
      </div>
      <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
        {loading ? 'Creating account…' : 'Register'}
      </button>
      <p className="text-sm text-gray-500 text-center">
        Already have an account? <Link href="/login" className="text-blue-600">Log In</Link>
      </p>
    </form>
  );
}

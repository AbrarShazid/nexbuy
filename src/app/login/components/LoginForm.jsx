'use client';

import React, { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    
    
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (res?.ok) router.push('/products');  // change target as needed
    else setErr(res?.error || 'Failed to sign in');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <FiMail className="text-gray-400 mr-2" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <FiLock className="text-gray-400 mr-2" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
            className="w-full outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#4c83e0] dark:bg-[#6b7282] text-white py-2 rounded-lg hover:bg-blue-500 transition"
      >
        Log In
      </button>

      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-blue-600 dark:text-white  hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}

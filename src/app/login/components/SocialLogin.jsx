'use client';

import { signIn } from 'next-auth/react';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function SocialLogin() {
  
  const handleGoogleLogin = () => {
   
    signIn('google',{callbackUrl:'/products'})
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleGoogleLogin}
        className="w-full border rounded-lg py-2 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#374254] transition"
      >
        <FcGoogle className="mr-2" size={20} />
        Continue with Google
      </button>
    </div>
  );
}

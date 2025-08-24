import React from 'react';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';


export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#6b7282] px-4">
      <div className="bg-white dark:bg-[#4c5663] rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-[#4c83e0] dark:text-white mb-6 text-center">
          Log In
        </h1>

        {/* Login Form */}
        <LoginForm />

        <div className="my-4 flex items-center">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="mx-2 text-gray-400">or</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        {/* Social Login */}
        <SocialLogin />
      </div>
    </div>
  );
}

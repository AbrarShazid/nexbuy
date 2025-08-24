import React from 'react';
import RegisterForm from './components/RegisterForm';
import SocialLogin from '../login/components/SocialLogin';



export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#6b7282] px-4">
      <div className="bg-white dark:bg-[#4d5663] rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Create an Account
        </h1>

        {/* Register Form */}
        <RegisterForm />

        <div className="my-4 flex items-center">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="mx-2 text-gray-400">or</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

   
        <SocialLogin />
      </div>
    </div>
  );
}

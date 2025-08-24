import Link from 'next/link';
import { IoHomeOutline } from "react-icons/io5";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f9ff] dark:bg-[#6b7282] px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#4c83e0] dark:text-white">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-[#4c83e0] dark:bg-[#4b5563] text-white rounded-lg font-medium hover:bg-[#3a6bc5] dark:hover:bg-[#374254] transition-colors"
        >
          Go Back Home
          <IoHomeOutline className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
}
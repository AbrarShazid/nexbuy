// app/products/loading.js
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f9ff] dark:bg-[#374254] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4c83e0] mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    </div>
  );
}
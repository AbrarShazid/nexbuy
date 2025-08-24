"use client";

import Link from "next/link";
import { useState } from "react";
import { FiHome, FiGrid, FiPlusSquare, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Topbar */}
      <header className="md:hidden flex items-center justify-between bg-white dark:bg-[#374254] shadow px-4 py-3 fixed w-full z-50">
        <Link href="/" className="flex items-center space-x-2">
          <FiShoppingBag className="h-7 w-7 text-blue-600 dark:text-white" />
          <span className="text-xl font-bold text-gray-800 dark:text-white">NexBuy</span>
        </Link>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          {isOpen ? (
            <FiX className="h-6 w-6 text-gray-800 dark:text-white" />
          ) : (
            <FiMenu className="h-6 w-6 text-gray-800 dark:text-white" />
          )}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-auto min-h-screen w-full md:w-48 lg:w-64 
        bg-white dark:bg-[#374254] shadow-lg transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >



        {/* Logo */}
        <div className="p-6 ">
          <Link href="/" className="flex items-center space-x-2">
            <FiShoppingBag className="h-7 w-7 text-blue-600 dark:text-white" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">NexBuy</span>
          </Link>
        </div>
        <hr className="text-black dark:text-white hidden md:flex " />

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="flex items-center p-3 text-gray-700 dark:text-gray-300 rounded-lg 
                  hover:bg-blue-50 dark:hover:bg-[#808691] transition-colors group"
                onClick={() => setIsOpen(false)}
              >
                <FiHome className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-300 group-hover:text-blue-600" />
                <span className="font-medium">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-3 text-gray-700 dark:text-gray-300 rounded-lg 
                  hover:bg-blue-50 dark:hover:bg-[#808691] transition-colors group"
                onClick={() => setIsOpen(false)}
              >
                <FiGrid className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-300 group-hover:text-blue-600" />
                <span className="font-medium">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/add-product"
                className="flex items-center p-3 text-gray-700 dark:text-gray-300 rounded-lg 
                  hover:bg-blue-50 dark:hover:bg-[#808691] transition-colors group"
                onClick={() => setIsOpen(false)}
              >
                <FiPlusSquare className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-300 group-hover:text-blue-600" />
                <span className="font-medium">Add Product</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

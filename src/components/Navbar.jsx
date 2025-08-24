"use client";
import Link from "next/link";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { CiMenuFries } from "react-icons/ci";
import ThemeToggle from "@/app/ThemeToggle";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-[#4c83e0] text-white dark:bg-[#374254]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-wide">
            NexBuy
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              href="/"
              className={`transition ${pathName === "/" ? "border-b-2 border-white font-semibold" : "hover:text-gray-200"
                }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`transition ${pathName === "/products"
                  ? "border-b-2 border-white font-semibold"
                  : "hover:text-gray-200"
                }`}
            >
              Products
            </Link>
            {
              session ? <Link
                href="/dashboard"
                className={`transition ${pathName === "/dashboard"
                    ? "border-b-2 border-white font-semibold"
                    : "hover:text-gray-200"
                  }`}
              >
                Dashboard
              </Link> : <></>
            }

            {session ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hover:text-gray-200 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className={`transition ${pathName === "/login"
                    ? "border-b-2 border-white font-semibold"
                    : "hover:text-gray-200"
                  }`}
              >
                Login
              </Link>
            )}

            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <RxCross2 size={28} /> : <CiMenuFries size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#f5f9ff] dark:bg-[#6b7282] text-gray-700 dark:text-white ">
          <div className="flex flex-col space-y-2 px-4 py-3">
            <Link href="/" className="hover:text-blue-500 dark:hover:text-gray-300 transition">
              Home
            </Link>
            <Link href="/products" className="hover:text-blue-500 dark:hover:text-gray-300  transition">
              Products
            </Link>

            {session ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hover:text-blue-500 dark:hover:text-gray-300  text-left transition"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="hover:text-blue-500 dark:hover:text-gray-300  transition">
                Login
              </Link>
            )}

            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}

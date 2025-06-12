"use client";

import React, { ReactNode, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { signOut } from "next-auth/react";
import { EAdminRoutes } from "@/enum/main_enum";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = usePathname().split("/");
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <SessionProvider>
        <div className="min-h-screen bg-zinc-900">
          <header className="bg-black border-b border-zinc-800 text-white shadow-lg relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-2">
                  {/* Logo/icon could go here */}
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                      <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                    </svg>
                  </div>
                  <h1 className="text-xl font-bold tracking-wider">
                    <span className="text-orange-500">RICE</span>MILL
                  </h1>
                </div>

                {/* Hamburger Icon - only visible on mobile */}
                <button
                  className="md:hidden p-2 rounded-md hover:bg-zinc-800 transition-colors duration-200"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle Menu"
                >
                  {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>

                {/* Desktop Nav */}
                <nav className="hidden md:block">
                  <ul className="flex items-center space-x-1">
                    {/* <li>
                      <a
                        href={EAdminRoutes.DASHBOARDADMIN}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          router.includes("admin")
                            ? "bg-orange-500 text-black"
                            : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                        }`}
                      >
                        Admin List
                      </a>
                    </li>
                    <li>
                      <a
                        href={EAdminRoutes.DASHBOARDSUMMARY}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          router.includes("summary")
                            ? "bg-orange-500 text-black"
                            : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                        }`}
                      >
                        Summary
                      </a>
                    </li>
                    <li>
                      <a
                        href={EAdminRoutes.DASHBOARDPRODUCT}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          router.includes("product")
                            ? "bg-orange-500 text-black"
                            : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                        }`}
                      >
                        Product
                      </a>
                    </li>
                    <li>
                      <a
                        href={EAdminRoutes.DASHBOARDPOSTORDER}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          router.includes("postorder")
                            ? "bg-orange-500 text-black"
                            : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                        }`}
                      >
                        Cart
                      </a>
                    </li>
                    <li>
                      <a
                        href={EAdminRoutes.DASHBOARDORDERS}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          router.includes("orders")
                            ? "bg-orange-500 text-black"
                            : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                        }`}
                      >
                        Orders
                      </a>
                    </li> */}
                    <li className="ml-2">
                      <button 
                        className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md text-sm font-medium transition-all duration-200 border border-zinc-700 hover:border-zinc-600"
                        onClick={() => signOut()}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Mobile Nav */}
            <div 
              className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
                isMobileMenuOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <nav className="bg-zinc-900 border-t border-zinc-800 shadow-inner">
                <ul className="flex flex-col space-y-1 p-3">
                  {/* <li>
                    <a
                      href={EAdminRoutes.DASHBOARDADMIN}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                        router.includes("admin")
                          ? "bg-orange-500 text-black"
                          : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      Admin List
                    </a>
                  </li>
                  <li>
                    <a
                      href={EAdminRoutes.DASHBOARDSUMMARY}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                        router.includes("summary")
                          ? "bg-orange-500 text-black"
                          : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      Summary
                    </a>
                  </li>
                  <li>
                    <a
                      href={EAdminRoutes.DASHBOARDPRODUCT}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                        router.includes("product")
                          ? "bg-orange-500 text-black"
                          : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      Product
                    </a>
                  </li>
                  <li>
                    <a
                      href={EAdminRoutes.DASHBOARDPOSTORDER}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                        router.includes("postorder")
                          ? "bg-orange-500 text-black"
                          : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      Cart
                    </a>
                  </li>
                  <li>
                    <a
                      href={EAdminRoutes.DASHBOARDORDERS}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                        router.includes("orders")
                          ? "bg-orange-500 text-black"
                          : "text-gray-300 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      Orders
                    </a>
                  </li> */}
                  <li className="pt-2 mt-2 border-t border-zinc-800">
                    <button
                      className="w-full px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md text-base font-medium transition-all duration-200 border border-zinc-700"
                      onClick={() => signOut()}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-zinc-800 rounded-lg shadow-xl border border-zinc-700 p-6">
              {children}
            </div>
          </main>
          
          <footer className="bg-black border-t border-zinc-800 py-4 mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-zinc-500">
                © {new Date().getFullYear()} Rice Mill Admin System. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </SessionProvider>
    </>
  );
};

export default Layout;
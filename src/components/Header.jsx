"use client";

import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

function Header() {
  const [userData, setUserData] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sessionOpen, setSessionOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const cookieData = Cookies.get("user");
    if (cookieData) {
      try {
        setUserData(JSON.parse(cookieData));
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>

       <header className={`${isScrolled ? "fixed top-0 left-0 right-0 z-50 mt-8" : "w-full"} md:flex justify-center transition-all duration-500 ease-in-out`}>
    
      <nav className={isScrolled ?
       "w-11/12 lg:w-3/4 mx-auto bg-[rgba(255,255,255,0.5)] backdrop-blur px-5 rounded-full shadow-lg flex items-center justify-between p-4 relative transition-all duration-500 ease-in-out" 
        : 
        "w-full bg-transparent px-5 shadow-lg flex items-center justify-between p-4 transition-all duration-500 ease-in-out"}>
        <div className="flex items-center">
          <Link href="/">
            <Image src="/logo-nav.svg" alt="Logo" width={150} height={150} />
          </Link>
        </div>
        <div className="hidden md:flex flex-1 justify-center space-x-4">
          <Link href="/home" className="flex items-center px-3 py-2 rounded-lg transition-colors duration-500 hover:bg-black hover:text-white">
            <i className="fa-solid fa-home mr-1"></i>
            Home
          </Link>
          <div className="relative">
            <button onClick={() => setSessionOpen(!sessionOpen)} className="flex items-center px-3 py-2 rounded-lg transition-colors duration-500 hover:bg-black hover:text-white">
              <i className="fa-solid fa-calendar-alt mr-1"></i>
              Sessions
              <i className="fa-solid fa-caret-down ml-1"></i>
            </button>
            {sessionOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                <Link href="/sessction?action=All" className="block px-4 py-2 transition-colors duration-500 hover:bg-gray-200">All</Link>
                <Link href="/sessction?action=completed" className="block px-4 py-2 transition-colors duration-500 hover:bg-gray-200">Finished</Link>
                <Link href="/sessction?action=ongoing" className="block px-4 py-2 transition-colors duration-500 hover:bg-gray-200">ONGOING</Link>
                <Link href="/sessction?action=Not Started" className="block px-4 py-2 transition-colors duration-500 hover:bg-gray-200">Not Started</Link>
              </div>
            )}
          </div>
          <Link href="/store" className="flex items-center px-3 py-2 rounded-lg transition-colors duration-500 hover:bg-black hover:text-white">
            <i className="fa-solid fa-store mr-1"></i>
            Store
          </Link>
          <Link href="/wallet" className="flex items-center px-3 py-2 rounded-lg transition-colors duration-500 hover:bg-black hover:text-white">
            <i className="fa-solid fa-wallet mr-1"></i>
            Wallet
          </Link>
        </div>
        <div className="hidden md:flex items-center">
          {userData ? (
            <>
              <button onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="focus:outline-none">
                <Image src="/defaultPortifolio.jpeg" alt="User Profile" width={50} height={50} className="w-12 h-12 rounded-full" />
              </button>
              {userDropdownOpen && (
                <div className="absolute right-1 mt-48 w-56 bg-white rounded-md shadow-lg" role="menu">
                  <div className="p-2">
                    <div>
                      <p className="text-gray-800 font-semibold">{userData.name}</p>
                      <p className="text-gray-500 text-sm">{userData.email}</p>
                    </div>
                    <form method="POST" onSubmit={logout} className="pt-1">
                      <button type="submit" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-700 bg-red-50 hover:bg-red-100 transition-colors duration-500" role="menuitem">
                        <i className="fa-solid fa-sign-out-alt"></i>
                        Log Out
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex space-x-2">
              <Link href="/Login">
                <button className="flex items-center px-4 py-2 border border-black rounded-lg transition-colors duration-500 hover:bg-black hover:text-white">
                  <i className="fa-solid fa-right-to-bracket mr-1"></i>
                  Login
                </button>
              </Link>
              <Link href="/Create">
                <button className="flex items-center px-4 py-2 bg-black text-white rounded-lg transition-colors duration-500 hover:bg-transparent hover:text-black hover:border border border-black">
                  <i className="fa-solid fa-user-plus mr-1"></i>
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg transition-colors duration-500 hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>
      {mobileMenuOpen && (
        <div className="bg-white mt-2 rounded-lg shadow-lg p-4 md:hidden">
          <ul className="space-y-2 text-left">
            <li>
              <Link href="/home" className="flex gap-2 items-center px-3 py-2 rounded-lg transition-colors duration-500 hover:bg-black hover:text-white">
                <i className="fa-solid fa-home mr-1"></i>
                Home
              </Link>
            </li>
            <li>
              <div className="relative">
                <button onClick={() => setSessionOpen(!sessionOpen)} className="flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors duration-500 hover:bg-black hover:text-white">
                  <span className="flex gap-2 items-center">
                    <i className="fas fa-calendar-alt mr-1"></i>
                    Sessions
                  </span>
                  <i className="fas fa-caret-down"></i>
                </button>
                {sessionOpen && (
                  <div className="mt-2 border-t border-gray-300 pt-2">
                    <Link href="/sessction?action=All" className="flex items-center justify-center px-3 py-2 transition-colors duration-500 hover:bg-gray">All</Link>
                    <Link href="/sessction?action=completed" className="flex items-center justify-center px-3 py-2 transition-colors duration-500 hover:bg-gray">Finished</Link>
                    <Link href="/sessction?action=ongoing" className="flex items-center justify-center px-3 py-2 transition-colors duration-500 hover:bg-gray">ONGOING</Link>
                    <Link href="/sessction?action=Not Started" className="flex items-center justify-center px-3 py-2 transition-colors duration-500 hover:bg-gray">Not Started</Link>
                  </div>
                )}
              </div>
            </li>
            <li>
              <Link href="/store" className="flex gap-2 items-center px-3 py-2 rounded-lg transition-colors duration-500 hover:bg-black hover:text-white">
                <i className="fa-solid fa-store mr-1"></i>
                Store
              </Link>
            </li>
            <li>
              <Link href="/wallet" className="flex gap-2 items-center px-3 py-2 rounded-lg transition-colors duration-500 hover:bg-black hover:text-white">
                <i className="fa-solid fa-wallet mr-1"></i>
                Wallet
              </Link>
            </li>
            {userData ? (
              <li className="mt-2 flex flex-col items-start">
                <button onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="flex items-center focus:outline-none">
                  <Image src="/defaultPortifolio.jpeg" alt="User Profile" width={50} height={50} className="w-12 h-12 rounded-full" />
                </button>
                <div className="mt-2 w-full bg-white rounded-md shadow-lg" role="menu">
                  <div className="p-2">
                    <p className="text-gray-800 font-semibold">{userData.name}</p>
                    <p className="text-gray-500 text-sm">{userData.email}</p>
                  </div>
                  <button onClick={logout} className="w-full text-left px-4 py-2 rounded-b-lg bg-red-50 text-red-700 transition-colors duration-500 hover:bg-red-100 flex items-center" role="menuitem">
                    <i className="fa-solid fa-sign-out-alt mr-1"></i>
                    Log Out
                  </button>
                </div>
              </li>
            ) : (
              <li className="mt-2 flex flex-col items-start space-y-2">
                <Link href="/Login">
                  <button className="flex items-center w-full px-4 py-2 border border-black rounded-lg transition-colors duration-500 hover:bg-black hover:text-white">
                    <i className="fa-solid fa-right-to-bracket mr-1"></i>
                    Login
                  </button>
                </Link>
                <Link href="/Create">
                  <button className="flex items-center w-full px-4 py-2 bg-black text-white rounded-lg transition-colors duration-500 hover:bg-transparent hover:text-black hover:border border-black">
                    <i className="fa-solid fa-user-plus mr-1"></i>
                    Sign Up
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
    </>
 
  );
}

export default Header;

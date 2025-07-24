import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/random", label: "Random" },
  { to: "/passphrase", label: "Passphrase" },
  { to: "/pattern", label: "Pattern" },
  { to: "/leet", label: "Leet" },
  { to: "/ai", label: "AI" },
  { to: "/charset", label: "Charset" },
];

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white px-2 sm:px-4 py-2 sm:py-4 shadow-lg drop-shadow-md relative z-50">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between w-full">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <span className="bg-white text-blue-700 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-extrabold text-xl sm:text-2xl shadow">
            🔒
          </span>
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
            PassGen
          </span>
        </div>
        {/* Hamburger icon for mobile */}
        <button
          className="sm:hidden focus:outline-none p-2"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        {/* Nav links for desktop */}
        <div className="hidden sm:flex flex-row space-x-6 text-base sm:text-lg font-medium ml-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={
                location.pathname === link.to ||
                (link.to !== "/" && location.pathname.startsWith(link.to))
                  ? "text-yellow-300 transition font-bold underline underline-offset-4 whitespace-nowrap"
                  : "hover:text-yellow-300 transition whitespace-nowrap"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden absolute left-0 w-full bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 shadow-lg z-40 animate-fade-in mt-2">
          <div className="flex flex-col py-2 px-4 space-y-2 text-base font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={
                  location.pathname === link.to ||
                  (link.to !== "/" && location.pathname.startsWith(link.to))
                    ? "text-yellow-300 transition font-bold underline underline-offset-4"
                    : "hover:text-yellow-300 transition"
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

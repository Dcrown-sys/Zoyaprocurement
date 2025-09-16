// src/components/Navbar.jsx
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Install: npm install @heroicons/react
import logo from "../assets/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Problem", href: "#problem" },
    { name: "Solution", href: "#solution" },
    { name: "How It Works", href: "#how" },
  ];

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md bg-white/80 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-2 lg:px-4">
        {/* Logo */}
        <a href="#hero" className="flex items-center space-x-1">
          <img src={logo} alt="Zoya Logo" className="h-14 w-14" />
          <span className="text-purple-700 font-extrabold text-xl tracking-wide">
            Zoya
          </span>
        </a>

        {/* Desktop nav links + search */}
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-purple-700 font-medium px-2 py-1 rounded-md hover:text-purple-900 hover:shadow-lg hover:ring-1 hover:ring-purple-300 transition duration-200"
            >
              {link.name}
            </a>
          ))}

          {/* Search input with icon */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search suppliers..."
              className="pl-9 pr-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm"
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Join Waitlist CTA */}
          <a
            href="#cta"
            className="bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 hover:shadow-lg transition duration-200 font-semibold text-sm"
          >
            Join Waitlist
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-purple-700 text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile nav links */}
      {menuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-lg px-2 py-2 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-purple-700 font-medium px-2 py-1 rounded-md hover:text-purple-900 hover:shadow-lg hover:ring-1 hover:ring-purple-300 transition duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#cta"
            className="block bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 hover:shadow-lg transition duration-200 font-semibold text-sm"
            onClick={() => setMenuOpen(false)}
          >
            Join Waitlist
          </a>
        </div>
      )}
    </nav>
  );
}

// src/components/Header.jsx
import React, { useState } from "react";

const links = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Hackathons", href: "#hackathons" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 left-4 right-4 z-50 bg-black/40 backdrop-blur-xl text-white rounded-3xl border border-cyan-400/20 shadow-2xl shadow-cyan-500/10 px-8 py-5 flex justify-between items-center transition-all duration-500">
      <h1
          className="
          text-2xl md:text-2xl lg:text-3xl font-extrabold tracking-widest select-none
          bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent
          drop-shadow-[0_2px_16px_rgba(34,211,238,0.5)]
          animate-pulse-slow
          "
        style={{ letterSpacing: '0.18em' }}
        >
          SUHAS B M
      </h1>

      {/* Desktop Links */}
      <nav className="hidden md:flex gap-8 text-base font-semibold">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="relative group px-2 py-1 transition-all duration-300 text-white/90 hover:text-cyan-400 focus:text-cyan-400"
          >
            {link.label}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-300 group-hover:w-full group-focus:w-full shadow-[0_0_8px_2px_rgba(34,211,238,0.3)]"></span>
          </a>
        ))}
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-cyan-400 focus:outline-none transition-transform duration-300"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <span className={`block w-7 h-1 bg-cyan-400 rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-7 h-1 bg-cyan-400 rounded mt-1.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-7 h-1 bg-cyan-400 rounded mt-1.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-black/80 backdrop-blur-2xl border border-cyan-400/10 rounded-2xl px-6 py-6 flex flex-col items-start md:hidden z-40 shadow-xl shadow-cyan-500/10 animate-fade-in">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="py-3 w-full text-lg font-semibold text-cyan-300 hover:text-purple-400 transition-colors border-b border-white/10 last:border-b-0"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;

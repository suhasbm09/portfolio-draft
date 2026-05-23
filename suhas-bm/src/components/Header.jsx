// src/components/Header.jsx
import React, { useState } from "react";
import { navLinks, brand } from "../data/portfolio";
import BrandMark from "./BrandMark";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = ({ theme, onToggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLight = theme === "light";

  return (
    <header className="relative z-30 px-4 pt-6">
      <div className={`mx-auto flex max-w-6xl items-center justify-between border-b pb-5 md:pb-6 ${isLight ? "border-slate-200/80" : "border-white/10"}`}>
        <a href="#hero" className="group flex items-center gap-3">
          <BrandMark />
        </a>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`rounded-full px-3 py-2 text-sm transition-all duration-300 ${isLight ? "text-slate-600 hover:text-slate-950" : "text-white/58 hover:text-white"}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`mailto:${brand.email}`}
            className={`rounded-full border px-4 py-2 text-sm transition ${isLight ? "border-slate-200 bg-white/70 text-slate-700 hover:border-sky-200 hover:text-slate-950" : "border-white/10 text-white/72 hover:border-white/20 hover:text-white"}`}
          >
            Open to opportunities
          </a>
          <a
            href={brand.resume}
            target="_blank"
            rel="noreferrer"
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${isLight ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-600 hover:to-indigo-700" : "bg-white text-slate-950 hover:bg-slate-100"}`}
          >
            Resume
          </a>
          <button
            type="button"
            onClick={onToggleTheme}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition ${isLight ? "border-slate-200 bg-white/75 text-sky-700 hover:border-sky-200 hover:text-sky-800" : "border-white/10 text-white/80 hover:border-white/20 hover:text-white"}`}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={theme === "light"}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onToggleTheme}
            className={`relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition ${isLight ? "border-slate-200 bg-white/75 text-sky-700 hover:border-sky-200 hover:text-sky-800" : "border-white/10 text-white/80 hover:border-white/20 hover:text-white"}`}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={theme === "light"}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition lg:hidden ${isLight ? "border-slate-200 bg-white/75 text-slate-700 hover:border-sky-200 hover:text-slate-950" : "border-white/10 text-white/80 hover:border-white/20 hover:text-white"}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className={`absolute h-0.5 w-5 rounded bg-current transition ${menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-0.5 w-5 rounded bg-current transition ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute h-0.5 w-5 rounded bg-current transition ${menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`relative hidden h-11 w-11 items-center justify-center rounded-2xl border transition lg:inline-flex ${isLight ? "border-slate-200 bg-white/75 text-slate-700 hover:border-sky-200 hover:text-slate-950" : "border-white/10 text-white/80 hover:border-white/20 hover:text-white"}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className={`absolute h-0.5 w-5 rounded bg-current transition ${menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"}`} />
          <span className={`absolute h-0.5 w-5 rounded bg-current transition ${menuOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`absolute h-0.5 w-5 rounded bg-current transition ${menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"}`} />
        </button>
      </div>

      {menuOpen && (
        <div className={`mx-auto mt-3 max-w-6xl border-b pb-4 lg:hidden ${isLight ? "border-slate-200/80" : "border-white/10"}`}>
          <div className="grid gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${isLight ? "border-slate-200 bg-white/80 text-slate-700 hover:border-sky-200 hover:text-slate-950" : "border-white/10 text-white/75 hover:text-white"}`}
            >
              {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            </button>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`rounded-2xl px-4 py-3 text-sm transition ${isLight ? "text-slate-600 hover:text-slate-950" : "text-white/75 hover:text-white"}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={brand.resume}
              target="_blank"
              rel="noreferrer"
              className={`mt-2 rounded-2xl px-4 py-3 text-center text-sm font-semibold ${isLight ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white" : "bg-white text-slate-950"}`}
              onClick={() => setMenuOpen(false)}
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

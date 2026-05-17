// src/components/Header.jsx
import React, { useState } from "react";
import { navLinks, brand } from "../data/portfolio";
import BrandMark from "./BrandMark";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-30 px-4 pt-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between border-b border-white/10 pb-5 md:pb-6">
        <a href="#hero" className="group flex items-center gap-3">
          <BrandMark />
        </a>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm text-white/58 transition-all duration-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`mailto:${brand.email}`}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/72 transition hover:border-white/20 hover:text-white"
          >
            Available for roles
          </a>
          <a
            href={brand.resume}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
          >
            Resume
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 text-white/80 transition hover:border-white/20 hover:text-white lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className={`absolute h-0.5 w-5 rounded bg-current transition ${menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"}`} />
          <span className={`absolute h-0.5 w-5 rounded bg-current transition ${menuOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`absolute h-0.5 w-5 rounded bg-current transition ${menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="mx-auto mt-3 max-w-6xl border-b border-white/10 pb-4 lg:hidden">
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-2xl px-4 py-3 text-sm text-white/75 transition hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={brand.resume}
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-slate-950"
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

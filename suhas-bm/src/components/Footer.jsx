// src/components/Footer.jsx
import React from "react";
import { brand, contact } from "../data/portfolio";

const Footer = ({ theme }) => {
  const isLight = theme === "light";
  const footerLinks = [
    { label: "Email", href: `mailto:${brand.email}` },
    { label: "GitHub", href: brand.github },
    { label: "LinkedIn", href: brand.linkedin },
  ];

  return (
    <footer className={`relative mt-16 border-t px-4 py-8 ${isLight ? "border-slate-200/80" : "border-white/10"}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className={`text-xs uppercase tracking-[0.45em] ${isLight ? "text-slate-500" : "text-white/35"}`}>{brand.name}</p>
          <p className={`max-w-xl text-sm leading-6 ${isLight ? "text-slate-600" : "text-white/58"}`}>{contact.summary}</p>
          <p className={`text-sm ${isLight ? "text-slate-500" : "text-white/42"}`}>{brand.location}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label === "Email" ? undefined : "_blank"}
              rel={link.label === "Email" ? undefined : "noopener noreferrer"}
              className={`rounded-full border px-4 py-2 transition ${isLight ? "border-slate-200 bg-white/70 text-slate-600 hover:border-sky-200 hover:text-slate-950" : "border-white/10 text-white/70 hover:border-white/20 hover:text-white"}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

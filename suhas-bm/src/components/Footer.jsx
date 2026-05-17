// src/components/Footer.jsx
import React from "react";
import { brand, contact } from "../data/portfolio";

const Footer = () => {
  const footerLinks = [
    { label: "Email", href: `mailto:${brand.email}` },
    { label: "GitHub", href: brand.github },
    { label: "LinkedIn", href: brand.linkedin },
  ];

  return (
    <footer className="relative mt-16 border-t border-white/10 px-4 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.45em] text-white/35">{brand.name}</p>
          <p className="max-w-xl text-sm leading-6 text-white/58">{contact.summary}</p>
          <p className="text-sm text-white/42">{brand.location}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label === "Email" ? undefined : "_blank"}
              rel={link.label === "Email" ? undefined : "noopener noreferrer"}
              className="rounded-full border border-white/10 px-4 py-2 text-white/70 transition hover:border-white/20 hover:text-white"
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

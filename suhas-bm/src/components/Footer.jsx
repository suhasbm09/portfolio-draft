// src/components/Footer.jsx
import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-16 px-4 pt-10 pb-12 w-full mx-auto bg-black/60 backdrop-blur-xl text-center z-20 border-t border-white/5">
      <div className="max-w-5xl mx-auto space-y-8">
        <p className="text-white/70 text-base">
          Building reliable data and product workflows from first commit to steady-state support. Reach out if you want the whole loop owned by one partner.
        </p>
        <div className="flex justify-center gap-6 text-2xl">
          <a
            href="mailto:suhaasbm2004@gmail.com"
            className="text-cyan-200 hover:text-cyan-100 transition-colors"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/suhasbm09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-200 hover:text-cyan-100 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/suhas-b-m-88a179244"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-200 hover:text-cyan-100 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
        <div className="text-xs text-white/40 tracking-wide">
          © 2025 Suhas B M. Crafted with care for maintainable, measurable software.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

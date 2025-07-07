// src/components/Footer.jsx
import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-16 px-4 pt-8 pb-10 w-full mx-auto bg-black/50 backdrop-blur-xl text-center z-20">
      {/* Contact Links */}
      <div className="flex justify-center gap-8 text-2xl mb-6">
        <a
          href="mailto:suhaasbm2004@gmail.com"
          className="transition-all duration-300 text-cyan-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.7)] focus:text-white focus:drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]"
          aria-label="Email"
        >
          <FaEnvelope />
        </a>
        <a
          href="https://github.com/suhasbm09"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 text-cyan-300 hover:text-purple-400 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.7)] focus:text-purple-400 focus:drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/suhas-b-m-88a179244"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 text-cyan-300 hover:text-blue-400 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.7)] focus:text-blue-400 focus:drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
      </div>

      {/* Fun Emoji Feedback */}
      <div className="text-base text-white/70">
        <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent font-semibold">
          Built with ❤️, ⚡️, and ☕
        </span>
        <span className="ml-2">— Let me know what you think:</span>
        <div className="mt-3 text-2xl space-x-3 flex justify-center">
          <button className="hover:scale-125 focus:scale-125 transition-transform duration-200 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] hover:drop-shadow-[0_0_16px_rgba(34,211,238,0.7)]">🔥</button>
          <button className="hover:scale-125 focus:scale-125 transition-transform duration-200 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)] hover:drop-shadow-[0_0_16px_rgba(168,85,247,0.7)]">🚀</button>
          <button className="hover:scale-125 focus:scale-125 transition-transform duration-200 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] hover:drop-shadow-[0_0_16px_rgba(56,189,248,0.7)]">💡</button>
        </div>
      </div>

      <p className="mt-7 text-xs text-white/40 tracking-wide">
        © 2025 <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-bold">Suhas B M</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

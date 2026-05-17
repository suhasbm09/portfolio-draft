// src/components/ThemeBackground.jsx
import React from "react";
import { motion as Motion } from "framer-motion";

const ThemeBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#05070b]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(103,232,249,0.08),transparent_30%),radial-gradient(circle_at_82%_16%,rgba(129,140,248,0.08),transparent_26%),radial-gradient(circle_at_bottom,rgba(34,197,94,0.04),transparent_34%)]" />
      <Motion.div
        className="absolute left-1/2 top-[-10rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[conic-gradient(from_180deg,rgba(103,232,249,0.18),rgba(139,92,246,0.16),rgba(52,211,153,0.14),rgba(103,232,249,0.18))] blur-[150px] opacity-45"
        animate={{ y: [0, 18, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <Motion.div
        className="absolute -left-24 top-[18%] h-[24rem] w-[24rem] rounded-full bg-cyan-300/10 blur-[140px]"
        animate={{ x: [0, 40, 0], y: [0, 10, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <Motion.div
        className="absolute -right-24 top-[28%] h-[28rem] w-[28rem] rounded-full bg-violet-400/10 blur-[150px]"
        animate={{ x: [0, -36, 0], y: [0, -14, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 top-[14%] h-[18rem] bg-[linear-gradient(105deg,transparent_34%,rgba(255,255,255,0.06)_50%,transparent_66%)] opacity-20 blur-2xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.016)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.016)_1px,transparent_1px)] bg-size-[120px_120px] opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(5,7,11,0.96)_100%)]" />
    </div>
  );
};

export default ThemeBackground;

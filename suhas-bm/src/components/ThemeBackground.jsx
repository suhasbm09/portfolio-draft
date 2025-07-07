// src/components/ThemeBackground.jsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ThemeBackground = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax for orbs
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10">
      {/* Pure black base */}
      <div className="absolute inset-0 bg-black" />

      {/* Neon radial gradients (darker, less intense) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Cyan top left */}
        <div className="absolute -top-1/4 -left-1/4 w-[70vw] h-[70vw] bg-[radial-gradient(circle,rgba(0,255,213,0.10)_0%,transparent_70%)]" />
        {/* Purple bottom right */}
        <div className="absolute -bottom-1/4 -right-1/4 w-[70vw] h-[70vw] bg-[radial-gradient(circle,rgba(168,85,247,0.08)_0%,transparent_70%)]" />
        {/* Blue center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(56,189,248,0.06)_0%,transparent_80%)]" />
      </div>

      {/* Animated neon orbs (darker, less intense) */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-cyan-400/10 blur-[120px]"
        style={{ top: "-200px", left: "-200px", y: orb1Y }}
        animate={{ x: [0, 100, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[120px]"
        style={{ bottom: "-200px", right: "-200px", y: orb2Y }}
        animate={{ x: [0, -100, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Stronger vignette for more focus and darkness */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.96)_100%)] pointer-events-none" />
    </div>
  );
};

export default ThemeBackground;

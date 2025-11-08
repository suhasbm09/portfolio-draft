import React from "react";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const HeroSection = React.forwardRef((props, ref) => {
  const [text] = useTypewriter({
    words: [
      "Designing resilient data pipelines",
      "Delivering thoughtful product workflows",
      "Turning ideas into measurable outcomes",
    ],
    loop: true,
    delaySpeed: 2200,
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center"
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8 max-w-5xl mx-auto px-4"
      >
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 bg-clip-text text-transparent">
            Hi, I'm Suhas B M
          </span>
        </h1>
        <motion.p
          className="text-2xl md:text-3xl text-cyan-200/90 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span>{text}</span>
          <Cursor cursorColor="#00FFD5" />
        </motion.p>
        <div className="h-px bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-transparent w-48 mx-auto" />
        <motion.p
          className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Engineering generalist with a bias for clarity and delivery. I design the connective tissue between data platforms and product surfaces-owning discovery, build-out, and steady-state operations so teams can ship with confidence.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <a
            href="#projects"
            className="group px-8 py-4 text-lg font-medium rounded-full \
              bg-gradient-to-r from-cyan-400 to-purple-500 \
              hover:from-cyan-500 hover:to-purple-600 \
              text-white shadow-lg hover:shadow-cyan-500/25 \
              transition-all duration-300 transform hover:-translate-y-1"
          >
            View Projects
            <FaArrowDown className="inline-block ml-2 transform group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href="https://drive.google.com/file/d/1XnbwTBoMr8RKz5QHff0q4wqJhhzgfmEc/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 text-lg font-medium rounded-full \
              border border-cyan-400/30 text-cyan-200 \
              hover:border-purple-400 hover:text-purple-200 \
              transition-all duration-300 transform hover:-translate-y-1
              backdrop-blur-sm bg-black/30"
          >
            View Resume
          </a>
        </motion.div>
      </motion.div>
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <FaArrowDown className="text-cyan-400/40 text-2xl" />
      </motion.div>
    </section>
  );
});

export default HeroSection; 
import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

function ProjectCard({ proj }) {
  const [hasImage, setHasImage] = useState(true);
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);
  const navigate = useNavigate();

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      className={`
        group relative
        flex flex-col 
        ${hasImage ? "lg:flex-row" : ""} 
        items-center bg-black/40 backdrop-blur-xl rounded-2xl border border-cyan-400/20 
        overflow-hidden hover:scale-[1.02] transition-all duration-500
        shadow-xl hover:shadow-cyan-500/20 cursor-pointer
      `}
      onClick={() => navigate(`/project/${proj.key}`)}
    >
      {/* Image column with overlay */}
      {hasImage && (
        <div className="relative w-full lg:w-1/3 h-48 lg:h-auto flex-shrink-0 overflow-hidden">
          <div className="absolute inset-0 bg-cyan-400/10 mix-blend-overlay" />
          <img
            src={proj.image ? proj.image : `/images/${proj.key}.png`}
            alt={`${proj.title} preview`}
            loading="lazy"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            onError={() => setHasImage(false)}
          />
        </div>
      )}

      {/* Content column */}
      <div className={`
        w-full ${hasImage ? "lg:w-2/3" : ""} p-8 space-y-4
        relative z-10
      `}>
        <h3 className="text-3xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
          {proj.title}
        </h3>
        <p className="text-white/80 text-base lg:text-lg leading-relaxed">
          {proj.desc}
        </p>
        <div className="flex flex-wrap gap-3">
          {proj.tech.map((t) => (
            <span 
              key={t} 
              className="px-3 py-1 text-xs lg:text-sm rounded-full 
                bg-cyan-400/10 text-cyan-200 border border-cyan-400/20
                backdrop-blur-sm hover:bg-cyan-400/20 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href={proj.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-lg font-medium 
            text-cyan-300 hover:text-purple-300 transition-colors
            group-hover:translate-x-2 duration-300"
        >
          View on GitHub 
          <FaGithub className="transform group-hover:rotate-12 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

export default ProjectCard; 
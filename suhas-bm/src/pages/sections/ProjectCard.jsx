import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub, FaArrowRight } from "react-icons/fa";

function ProjectCard({ proj }) {
  const [hasImage, setHasImage] = useState(true);

  return (
    <motion.article
      layout
      whileHover={{ translateY: -4 }}
      className="group bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden flex flex-col h-full"
    >
      {hasImage && (
        <div className="relative h-52 overflow-hidden">
          <img
            src={proj.image ? proj.image : `/images/${proj.key}.png`}
            alt={`${proj.title} preview`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setHasImage(false)}
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
      )}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <h3 className="text-2xl font-semibold text-cyan-100">{proj.title}</h3>
        <p className="text-white/70 text-sm leading-relaxed">{proj.desc}</p>
        <div className="flex flex-wrap gap-2">
          {proj.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/70 border border-white/10"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-3 pt-4 border-t border-white/5">
          <a
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-cyan-100 transition-colors"
          >
            <FaGithub />
            Code
          </a>
          <Link
            to={`/project/${proj.key}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
            aria-label={`Read more about ${proj.title}`}
          >
            Case study
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard; 
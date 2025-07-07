import React from "react";
import { motion } from "framer-motion";

const EducationSection = React.forwardRef(({ educationItems }, ref) => (
  <motion.section
    id="education"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="py-24"
    aria-labelledby="education-heading"
    ref={ref}
  >
    <h2
      id="education-heading"
      className="text-4xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent text-center"
    >
      Education
    </h2>
    <div className="h-px bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-transparent my-8 w-24 mx-auto" />
    <div className="relative max-w-4xl mx-auto">
      {/* Full-height vertical line */}
      <div className="absolute top-0 bottom-0 left-8 w-px bg-gradient-to-b from-cyan-400 to-purple-500/60" />
      <div className="space-y-16">
        {educationItems.map((item, idx) => (
          <div
            key={item.title}
            className="grid grid-cols-[auto_1fr] gap-x-16 items-start relative"
            style={{ animationDelay: `${idx * 0.2}s` }}
          >
            {/* Node container (first col) */}
            <div className="relative">
              <div
                className={`
                  absolute left-8 top-16 -translate-x-1/2 
                  w-5 h-5 rounded-full border-2
                  ${item.isCurrent
                    ? "bg-gradient-to-tr from-cyan-400 to-purple-500 border-white animate-glow-pulse"
                    : "bg-cyan-400 border-white/70"}
                `}
              />
            </div>
            {/* Card container (second col) */}
            <div
              className={`
                px-8 py-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-cyan-400/20
                hover:scale-[1.02] transition-all
                ${item.isCurrent ? "border-cyan-400/40" : ""}
              `}
            >
              <p className="text-2xl font-semibold text-cyan-200">{item.title}</p>
              <p className="mt-1 text-white/70">{item.institute}</p>
              <p className="mt-2 font-mono text-sm text-white/50">{item.detail}</p>
              {item.isCurrent && (
                <span className="inline-block mt-4 px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-200 rounded-full">
                  Currently Pursuing
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.section>
));

export default EducationSection; 
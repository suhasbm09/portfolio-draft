import React from "react";
import { motion } from "framer-motion";

const SkillsSection = React.forwardRef(({ skillsGroups }, ref) => (
  <motion.section
    id="skills"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="py-24"
    aria-labelledby="skills-heading"
    ref={ref}
  >
    <h2 id="skills-heading" className="text-4xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent text-center">
      Skills
    </h2>
    <div className="h-px bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-transparent my-8 w-24 mx-auto" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
      {skillsGroups.map((grp) => (
        <div key={grp.title} className="w-full h-56 [perspective:1000px]">
          <div
            className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]"
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-2xl border border-cyan-400/20 flex items-center justify-center"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(0deg)" }}
            >
              <h3 className="text-2xl font-semibold text-cyan-300">{grp.title}</h3>
            </div>
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-xl rounded-2xl border border-purple-400/20 p-6 flex flex-col items-center justify-center space-y-2 [transform:rotateY(180deg)]"
              style={{ backfaceVisibility: "hidden" }}
            >
              <h3 className="text-xl font-medium text-purple-300 text-center">{grp.title}</h3>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {grp.items.map((skill) => (
                  <span key={skill} className="px-4 py-2 text-md rounded-full bg-cyan-400/10 text-cyan-200 border border-cyan-400/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    {/* Theory & Coursework Skills Subsection */}
    <div className="mt-16">
      <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Theory & Coursework</h2>
      {/*
        Add or edit topics here as you learn more!
      */}
      <div className="flex flex-wrap gap-4 justify-center">
        {[
          "Computer Networks (CN)",
          "Operating Systems (OS)",
          "System Design",
          "Database Concepts",
          "Artificial Intelligence",
          "Machine Learning",
          "Software Engineering and Project Management",
        ].map((topic) => (
          <span key={topic} className="px-5 py-3 text-base rounded-xl bg-cyan-400/10 text-cyan-200 border border-cyan-400/20 font-medium">
            {topic}
          </span>
        ))}
      </div>
    </div>
  </motion.section>
));

export default SkillsSection; 
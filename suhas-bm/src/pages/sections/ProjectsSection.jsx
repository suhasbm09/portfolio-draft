import React from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const ProjectsSection = React.forwardRef(({ projects, otherProjects }, ref) => (
  <motion.section
    id="projects"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="py-24"
    aria-labelledby="projects-heading"
    ref={ref}
  >
    <h2 id="projects-heading" className="text-4xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent text-center">
      Projects
    </h2>
    <div className="h-px bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-transparent my-8 w-24 mx-auto" />
    <div className="grid gap-12 lg:grid-cols-2 px-4">
      {projects.map((proj) => (
        <ProjectCard key={proj.key} proj={proj} />
      ))}
    </div>
    {/* Other Projects Subsection */}
    <div className="mt-16">
      <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Other Projects</h2>
      <div className="flex gap-6 overflow-x-auto pb-4 items-stretch custom-scrollbar">
        {otherProjects && otherProjects.length > 0 ? (
          otherProjects.map((proj) => (
            <div key={proj.key} className="flex flex-col bg-black/40 backdrop-blur-xl rounded-2xl border border-cyan-400/20 shadow-xl min-w-[22rem] max-w-xs w-full p-6">
              <h3 className="text-xl font-semibold text-cyan-200 mb-2">{proj.title}</h3>
              <p className="text-white/80 text-sm mb-3">{proj.desc}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {proj.tech.map((t) => (
                  <span key={t} className="px-3 py-1 text-xs rounded-full bg-cyan-400/10 text-cyan-200 border border-cyan-400/20">{t}</span>
                ))}
              </div>
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent hover:underline transition-colors"
                >
                  Live Demo
                </a>
              )}
            </div>
          ))
        ) : (
          <div className="text-white/70 text-lg italic text-center">Coming soon...</div>
        )}
      </div>
    </div>
  </motion.section>
));

// ProjectCard must be imported from its original location
import ProjectCard from "./ProjectCard";

const mainProjectKeys = [
  "skillflex",
  "vionex",
  "ai-code-commenter",
  "college_chatbot",
  "ai-autocorrect",
  "launchbox"
];

export default ProjectsSection; 
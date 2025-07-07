import React from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const ProjectsSection = React.forwardRef(({ projects }, ref) => (
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
      {/*
      <div className="flex gap-6 overflow-x-auto pb-4 items-stretch">
        {otherProjects.map((proj) => (
          <div key={proj.key} className="flex flex-col bg-black/40 backdrop-blur-xl rounded-2xl border border-cyan-400/20 shadow-xl min-w-[22rem] max-w-xs w-full p-6">
            <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-cyan-400/10 flex items-center justify-center">
              <img src={proj.image} alt={proj.title} className="object-contain w-full h-full" />
            </div>
            <h3 className="text-xl font-semibold text-cyan-200 mb-2">{proj.title}</h3>
            <p className="text-white/80 text-sm mb-3">{proj.desc}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {proj.tech.map((t) => (
                <span key={t} className="px-3 py-1 text-xs rounded-full bg-cyan-400/10 text-cyan-200 border border-cyan-400/20">{t}</span>
              ))}
            </div>
            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-cyan-300 hover:text-purple-300 text-sm font-medium mt-auto">
              View on GitHub <FaGithub />
            </a>
          </div>
        ))}
      </div>
      */}
      <div className="text-white/70 text-lg italic text-center">Coming soon...</div>
    </div>
  </motion.section>
));

// ProjectCard must be imported from its original location
import ProjectCard from "./ProjectCard";

export default ProjectsSection; 
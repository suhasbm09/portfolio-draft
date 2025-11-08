import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

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
    <h2 id="projects-heading" className="text-4xl font-semibold mb-4 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 bg-clip-text text-transparent text-center">
      Projects
    </h2>
    <div className="h-px bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-transparent my-8 w-24 mx-auto" />
    <p className="max-w-3xl mx-auto text-center text-white/70 text-base px-4">
      Selected work spanning on-chain platforms, AI-backed tooling, and internal utilities. Each project connects the data layer, backend workflows, and product surface so teams can monitor what ships and iterate quickly.
    </p>
    <div className="grid gap-12 lg:grid-cols-2 px-4 mt-12">
      {projects.map((proj) => (
        <ProjectCard key={proj.key} proj={proj} />
      ))}
    </div>
    {/* Other Projects Subsection */}
    <div className="mt-16">
      <h2 className="text-2xl font-semibold mb-4 text-cyan-200 px-4">Other Projects</h2>
      <div className="flex gap-6 overflow-x-auto pb-4 items-stretch custom-scrollbar px-4">
        {otherProjects && otherProjects.length > 0 ? (
          otherProjects.map((proj) => (
            <div key={proj.key} className="flex flex-col bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 min-w-[20rem] max-w-xs w-full p-6">
              <h3 className="text-lg font-semibold text-white/80 mb-2">{proj.title}</h3>
              <p className="text-white/60 text-sm mb-3 leading-relaxed">{proj.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.tech.map((t) => (
                  <span key={t} className="px-3 py-1 text-xs rounded-full bg-white/5 text-white/70 border border-white/10">{t}</span>
                ))}
              </div>
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-cyan-200 hover:text-cyan-100 transition-colors"
                >
                  Open project
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

export default ProjectsSection; 
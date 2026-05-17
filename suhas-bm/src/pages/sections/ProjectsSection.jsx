import React from "react";
import { motion as Motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const ProjectsSection = React.forwardRef(({ projects, otherProjects }, ref) => {
  return (
    <Motion.section
      id="projects"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-24"
      aria-labelledby="projects-heading"
      ref={ref}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.45em] text-white/40">Selected work</p>
        <h2 id="projects-heading" className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Selected work across backend systems and Solana builds.
        </h2>
        <p className="mt-5 text-base leading-7 text-white/64">
          These projects show how I balance service design, on-chain logic, and product quality.
        </p>
      </div>
      <div className="mx-auto my-8 h-px w-24 bg-linear-to-r from-transparent via-white/30 to-transparent" />
      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((proj) => (
          <ProjectCard key={proj.key} proj={proj} />
        ))}
      </div>
      {otherProjects && otherProjects.length > 0 && (
        <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">Additional builds</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Supporting implementations and utility work</h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-white/58">
              Smaller projects that sharpened delivery speed, implementation quality, and product thinking.
            </p>
          </div>
          <div className="mt-6 flex gap-5 overflow-x-auto pb-3">
            {otherProjects.map((proj) => (
              <div key={proj.key} className="min-w-[18rem] max-w-sm rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <h4 className="text-lg font-semibold text-white">{proj.title}</h4>
                <p className="mt-2 text-sm leading-6 text-white/62">{proj.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Motion.section>
  );
});

export default ProjectsSection;
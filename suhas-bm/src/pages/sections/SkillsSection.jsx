import React from "react";
import { motion as Motion } from "framer-motion";
import { stackGroups } from "../../data/portfolio";

const SkillsSection = React.forwardRef((props, ref) => (
  <Motion.section
    id="stack"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="py-24"
    aria-labelledby="skills-heading"
    ref={ref}
  >
    <h2 id="skills-heading" className="text-center text-4xl font-semibold tracking-tight text-white md:text-5xl">
      Core stack
    </h2>
    <div className="mx-auto my-8 h-px w-24 bg-linear-to-r from-transparent via-white/30 to-transparent" />
    <div className="space-y-8">
      <p className="mx-auto max-w-3xl text-center text-base leading-7 text-white/65">
        The stack below is organized around backend systems, platform work, and delivery tooling.
      </p>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stackGroups.map((grp) => (
          <div key={grp.title} className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/3 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/5">
            <div className="absolute inset-0 bg-linear-to-br from-cyan-400/0 via-transparent to-indigo-400/0 opacity-0 transition group-hover:opacity-100" />
            <p className="text-xs uppercase tracking-[0.35em] text-white/38">{grp.icon}</p>
            <h3 className="mt-3 text-xl font-semibold text-white">{grp.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/62">{grp.note}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {grp.items.map((skill) => (
                <span key={skill} className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs text-white/75">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-16 rounded-[1.75rem] border border-white/10 bg-white/3 p-6 text-center backdrop-blur-xl">
      <h3 className="text-2xl font-semibold text-white">How I work</h3>
      <p className="mx-auto mt-3 max-w-3xl text-white/62">
        Build the core service first, keep the data trustworthy, and only then layer the interface on top.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {[
          "Backend systems",
          "Platform engineering",
          "Data integrity",
          "Auditability",
          "Maintainability",
          "Clear interfaces"
        ].map((item) => (
          <span key={item} className="rounded-full border border-white/10 bg-white/4 px-4 py-2 text-sm text-white/78">
            {item}
          </span>
        ))}
      </div>
    </div>
  </Motion.section>
));

export default SkillsSection; 
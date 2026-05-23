import React from "react";
import { motion as Motion } from "framer-motion";
import { experience } from "../../data/portfolio";

const ExperienceSection = React.forwardRef((props, ref) => (
  <Motion.section
    id="experience"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="py-24"
    aria-labelledby="experience-heading"
    ref={ref}
  >
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs uppercase tracking-[0.45em] text-white/40">Experience</p>
      <h2 id="experience-heading" className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
        Professional work that sharpened my delivery discipline.
      </h2>
      <p className="mt-5 text-base leading-7 text-white/65">
        Enterprise work reinforced correctness, validation, and configuration discipline in systems where small mistakes matter.
      </p>
    </div>

    <div className="mx-auto mt-12 max-w-5xl space-y-6">
      {experience.map((item) => (
        <div key={item.title} className="grid gap-5 rounded-[1.75rem] border border-white/10 bg-black/40 p-6 backdrop-blur-2xl lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <div className="inline-flex rounded-full border border-cyan-400/15 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/80">
              {item.period}
            </div>
            <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
            <p className="text-white/60">{item.org}</p>
            <p className="text-sm uppercase tracking-[0.3em] text-white/35">{item.location}</p>
          </div>
          <div className="space-y-4">
            <p className="text-base leading-7 text-white/70">{item.summary}</p>
            <div className="grid gap-3">
              {item.bullets.map((bullet) => (
                <div key={bullet} className="flex gap-3 rounded-[1.1rem] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/72">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </Motion.section>
));

export default ExperienceSection;

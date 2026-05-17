import React from "react";
import { motion as Motion } from "framer-motion";
import { education } from "../../data/portfolio";

const EducationSection = React.forwardRef((props, ref) => (
  <Motion.section
    id="education"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="py-24"
    aria-labelledby="education-heading"
    ref={ref}
  >
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs uppercase tracking-[0.45em] text-white/40">Academic foundation</p>
      <h2 id="education-heading" className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
        Established in systems fundamentals.
      </h2>
      <p className="mt-5 text-base leading-7 text-white/65">
        Rigorous coursework in systems, networks, and data structures built the technical foundation for backend engineering.
      </p>
    </div>
    <div className="mx-auto mt-16 max-w-4xl">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/0 via-cyan-400/30 to-indigo-500/0" />
        
        <div className="space-y-8">
          {education.map((item, index) => (
            <Motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute -left-3 top-0 h-12 w-12 rounded-full border-2 border-cyan-400/40 bg-black shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-400/50 to-indigo-500/50" />
              </div>

              {/* Card */}
              <div className="group rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-black/40 p-6 backdrop-blur-xl transition hover:border-cyan-400/30 hover:bg-gradient-to-br hover:from-white/[0.08] hover:to-black/50">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
                  {/* Left: Period & Org */}
                  <div className="min-w-0 flex-shrink-0">
                    <div className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">
                      {item.period}
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/80">{item.org}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.3em] text-cyan-100/60">{item.location}</p>
                  </div>

                  {/* Right: Summary & Details */}
                  <div className="flex-1">
                    <p className="text-sm leading-6 text-white/75">{item.summary}</p>
                    {item.bullets?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.bullets.map((bullet) => (
                          <span
                            key={bullet}
                            className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium text-white/85"
                          >
                            {bullet}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </div>
  </Motion.section>
));

export default EducationSection; 
import React from "react";
import { motion as Motion } from "framer-motion";
import { about } from "../../data/portfolio";

const AboutSection = React.forwardRef((props, ref) => (
  <section id="about" className="py-24" ref={ref}>
    <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
      <Motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/50">
          About
        </div>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
          {about.title}
        </h2>
        <div className="space-y-4 text-lg leading-8 text-white/68">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative"
      >
        <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-4xl border border-white/10 bg-white/[0.03]" />
        <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 backdrop-blur-2xl">
          <div className="absolute left-0 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/3 rounded-full bg-cyan-300/10 blur-[120px]" />
          <div className="absolute right-0 top-16 h-56 w-56 translate-x-1/3 rounded-full bg-violet-400/10 blur-[130px]" />

          <div className="relative space-y-6">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5">
              <p className="text-[10px] uppercase tracking-[0.45em] text-white/35">Focus split</p>
              <div className="mt-4 flex items-center justify-between text-sm text-white/72">
                <span>Backend</span>
                <span>Solana</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-1/2 rounded-full bg-[linear-gradient(90deg,#67e8f9,#a78bfa)]" />
              </div>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/58">
                Balanced across API design, system reliability, and on-chain execution.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
            {about.highlights.map((item) => (
              <div key={item.title} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white/90">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/64">{item.text}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </Motion.div>
    </div>
  </section>
));

export default AboutSection; 
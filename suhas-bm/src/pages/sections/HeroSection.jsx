import React from "react";
import { motion as Motion } from "framer-motion";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";
import { brand, hero } from "../../data/portfolio";

const HeroSection = React.forwardRef((props, ref) => {
  return (
    <section
      id="hero"
      className="relative flex min-h-[84vh] items-center pt-8"
      ref={ref}
    >
      <div className="grid w-full gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-7"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-white/72">
            <span className="theme-dot h-1.5 w-1.5 rounded-full ring-1 ring-white/10" />
            {hero.eyebrow}
          </div>

          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.45em] text-white/40">{brand.role}</p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl xl:text-7xl">
              <span className="block">I build backend systems</span>
              <span className="block text-cyan-100/95">that hold up in production.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/68 md:text-xl">
              {hero.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              {hero.primaryCta}
              <FaArrowRight />
            </a>
            <a
              href={brand.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/82 transition hover:border-white/20 hover:text-white"
            >
              {hero.secondaryCta}
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {hero.metrics.map((metric) => (
              <div key={metric.label} className="rounded-[1.25rem] border border-white/10 bg-white/2 p-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">{metric.label}</p>
                <p className="mt-2 text-lg font-semibold text-white/92">{metric.value}</p>
              </div>
            ))}
          </div>
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/2 p-6 backdrop-blur-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-white/40">What I focus on</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Backend systems with product-grade execution</h2>
              </div>
              <div className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-white/68">
                Now
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {hero.signals.map((signal, index) => (
                <Motion.div
                  key={signal}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.12 }}
                  className="flex items-center gap-4 rounded-[1.25rem] border border-white/10 bg-white/2 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/40 text-white/85">
                    <span className="theme-dot-core h-2.5 w-2.5 rounded-full ring-1 ring-white/10" />
                  </div>
                  <p className="text-sm leading-6 text-white/78">{signal}</p>
                </Motion.div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-[1.25rem] border border-white/10 bg-white/2 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Location</p>
                <p className="mt-2 text-sm text-white/75">{brand.location}</p>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-white/2 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">Status</p>
                <p className="mt-2 text-sm text-white/75">Open to backend, platform, and Solana roles</p>
              </div>
            </div>
          </div>
        </Motion.div>
      </div>

      <Motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/18"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <FaArrowDown className="text-xl" />
      </Motion.div>
    </section>
  );
});

export default HeroSection; 
import React from "react";
import { motion as Motion } from "framer-motion";
import { milestones } from "../../data/portfolio";

const HackathonsSection = React.forwardRef((props, ref) => (
  <Motion.section
    id="milestones"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="py-24"
    aria-labelledby="hackathons-heading"
    ref={ref}
  >
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs uppercase tracking-[0.45em] text-white/40">Milestones</p>
      <h2 id="hackathons-heading" className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
        Delivery milestones that shaped the portfolio.
      </h2>
      <p className="mt-5 text-base leading-7 text-white/65">
        Constraints, shipping pressure, and iteration habits show up in the quality of the final product.
      </p>
    </div>
    <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
      {milestones.map((item) => (
        <div key={item.title} className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/45">{item.badge}</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/65">{item.detail}</p>
        </div>
      ))}
    </div>
  </Motion.section>
));

export default HackathonsSection; 
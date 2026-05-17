import React from "react";
import { principles } from "../../data/portfolio";

const ArticlesSection = React.forwardRef((props, ref) => (
  <section id="about-philosophy" className="py-24" ref={ref}>
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs uppercase tracking-[0.45em] text-white/40">Operating principles</p>
      <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">How I think about good systems.</h2>
      <p className="mt-5 text-base leading-7 text-white/65">
        The same patterns keep showing up across backend, blockchain, and product work.
      </p>
    </div>
    <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3">
      {principles.map((item) => (
        <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/65">{item.copy}</p>
        </div>
      ))}
    </div>
  </section>
));

export default ArticlesSection; 
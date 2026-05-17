import React from "react";
import { certifications } from "../../data/portfolio";

const CertificatesSection = React.forwardRef((props, ref) => (
  <section id="proof" className="py-20" ref={ref}>
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs uppercase tracking-[0.45em] text-white/35">Certification</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">One focused credential.</h2>
      <p className="mt-5 text-sm leading-7 text-white/60">
        A single certification that supports the Solana side of the portfolio without pulling focus away from the work.
      </p>
    </div>
    <div className="mx-auto mt-10 max-w-3xl">
      {certifications.map((item) => (
        <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-white/35">{item.type}</p>
          <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/62">{item.description}</p>
        </div>
      ))}
    </div>
  </section>
));

export default CertificatesSection; 
import React from "react";

const AboutSection = React.forwardRef((props, ref) => (
  <section id="about" className="py-24" ref={ref}>
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center gap-4 md:gap-4 px-4">
      {/* Image First on Mobile */}
      <div className="flex-1 flex justify-center md:justify-end order-1 md:order-2 mb-8 md:mb-0">
        <img
          src="/images/profile.png"
          alt="Profile of Suhas B M"
          className="w-56 h-56 rounded-full object-cover shadow-xl border-4 border-cyan-400/50 bg-black/20 ring-4 ring-cyan-400/10 transition-all duration-300"
          style={{ boxShadow: '0 0 32px 0 rgba(34,211,238,0.15), 0 4px 32px 0 rgba(0,0,0,0.25)' }}
        />
      </div>
      {/* About Text */}
      <div className="flex-1 text-center md:text-left order-2 md:order-1 flex flex-col justify-center">
        <h2 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 bg-clip-text text-transparent">About Me</h2>
        <p className="text-white/80 text-lg leading-relaxed">
          I enjoy looking at systems end to end-how data is collected, modelled, and served, and how that work turns into features that feel useful. Most of my time goes into shaping reliable pipelines, designing maintainable APIs, and keeping the UI grounded in what users actually need.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-left">
            <p className="text-sm font-semibold text-cyan-200 uppercase tracking-wide">How I work</p>
            <p className="mt-2 text-white/70 text-base">Shape problems with clear metrics, move fast on prototypes, and harden what sticks with automation and observability.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-left">
            <p className="text-sm font-semibold text-cyan-200 uppercase tracking-wide">Where I add value</p>
            <p className="mt-2 text-white/70 text-base">Bridging data tooling, backend services, and product polish so teams have one owner for the full workflow.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
));

export default AboutSection; 
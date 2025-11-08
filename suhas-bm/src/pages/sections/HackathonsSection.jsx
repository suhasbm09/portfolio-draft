import React from "react";
import { motion } from "framer-motion";

const HackathonsSection = React.forwardRef(({ hackathons }, ref) => (
  <motion.section
    id="hackathons"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="py-24"
    aria-labelledby="hackathons-heading"
    ref={ref}
  >
    <h2 id="hackathons-heading" className="text-4xl font-semibold mb-4 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 bg-clip-text text-transparent text-center">
      Hackathons & Challenges
    </h2>
    <div className="h-px bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-transparent my-8 w-24 mx-auto" />
    <p className="max-w-3xl mx-auto text-center text-white/70 text-base px-4">
      Rapid-build environments that helped pressure-test processes and sharpen decision making. The learnings ship back into daily delivery.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mt-12">
      {hackathons.map((item, idx) => (
        <div key={idx} className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 flex flex-col gap-4">
          <div>
            <p className="text-sm font-medium text-cyan-200 uppercase tracking-wide">{item.status}</p>
            <h3 className="mt-2 text-xl font-semibold text-white/80">{item.title}</h3>
            <p className="text-white/60 text-sm">{item.subtitle}</p>
          </div>
          <p className="text-white/60 text-sm leading-relaxed flex-1">{item.desc}</p>
          <div className="flex items-center gap-3 text-xs text-white/60">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-wide">{item.badge}</span>
            {item.scope && (
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-wide">
                {item.scope.replace('-', ' ')}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </motion.section>
));

export default HackathonsSection; 
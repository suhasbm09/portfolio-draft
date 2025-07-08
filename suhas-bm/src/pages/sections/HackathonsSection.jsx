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
    <h2 id="hackathons-heading" className="text-4xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent text-center">
      Hackathons & Challenges
    </h2>
    <div className="h-px bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-transparent my-8 w-24 mx-auto" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
      {hackathons.map((item, idx) => (
        <div
          key={idx}
          className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-cyan-400/20 p-8 flex flex-col justify-between hover:scale-[1.02] transition-all shadow-xl hover:shadow-cyan-500/20"
        >
          <div
            className={`
              absolute -top-2 -right-2 px-3 py-1 text-xs font-medium rounded-tr-2xl rounded-bl-2xl
              bg-gradient-to-r ${item.color} text-black
            `}
          >
            {item.status}
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-cyan-200 text-center">
              {item.title}
            </h3>
            <p className="text-cyan-300 text-sm text-center font-medium">
              {item.subtitle}
            </p>
            <p className="text-white/70 text-sm leading-relaxed text-center">
              {item.desc}
            </p>
            <div className="flex flex-col items-center justify-center">
              <span className={`mt-2 px-3 py-1 text-xs font-semibold rounded-full ${item.badge === 'solo' ? 'bg-orange-500/20 text-orange-500 border border-orange-400/40' : 'bg-green-500/20 text-green-500 border border-green-400/40'}`}>{item.badge === 'solo' ? 'solo' : 'team'}</span>
              {item.scope && (
                <span className={`mt-1 px-3 py-1 text-xs font-semibold rounded-full ${item.scope === 'national' ? 'bg-blue-500/20 text-blue-400 border border-blue-400/40' : 'bg-purple-500/20 text-purple-400 border border-purple-400/40'}`}>{item.scope}</span>
              )}
            </div>
          </div>
          <div className="mt-4 text-center">
            {item.status === "In Progress" && (
              <span className="px-4 py-2 text-xs font-medium bg-cyan-400/10 rounded-full text-cyan-200">
                Stay tuned…
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </motion.section>
));

export default HackathonsSection; 
import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaDocker, FaRust, FaDatabase, FaJs, FaGitAlt, FaLinux } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiFirebase, SiTypescript, SiFlask, SiJenkins, SiSupabase } from "react-icons/si";

const skillIcons = {
  React: <FaReact className="text-cyan-300" />, 
  "Node.js": <FaNodeJs className="text-green-400" />, 
  Python: <FaPython className="text-yellow-300" />, 
  Docker: <FaDocker className="text-blue-400" />, 
  Rust: <FaRust className="text-orange-400" />, 
  MongoDB: <SiMongodb className="text-green-500" />, 
  MySQL: <FaDatabase className="text-blue-300" />, 
  JavaScript: <FaJs className="text-yellow-200" />,  
  Git: <FaGitAlt className="text-orange-300" />, 
  Linux: <FaLinux className="text-gray-300" />, 
  TailwindCSS: <SiTailwindcss className="text-cyan-400" />, 
  Firebase: <SiFirebase className="text-yellow-400" />, 
  Flask: <SiFlask className="text-gray-200" />, 
  Jenkins: <SiJenkins className="text-red-400" />, 
  TypeScript: <SiTypescript className="text-blue-400" />,
  Supabase: <SiSupabase className="text-emerald-300" />,
};

const skillsGroups = [
  {
    title: "Languages & Runtimes",
    description: "Typed and scripting languages used across services, smart contracts, and tooling.",
    items: [ "C++", "Python","JavaScript", "Rust"]
  },
  {
    title: "Frameworks & Libraries",
    description: "Frontend, backend, and on-chain stacks for building usable products.",
    items: ["React", "Flask", "Node.js", "Anchor", "Metaplex", "TailwindCSS"]
  },
  {
    title: "Data & Storage",
    description: "Where data lives, how it is modelled, and how it stays observable.",
    items: ["MySQL", "MongoDB", "Firebase", "Pinata"]
  },
  {
    title: "Ops & Tooling",
    description: "Automation, deployment, and developer experience helpers.",
    items: ["Docker", "Jenkins", "Git", "Linux", "Solana CLI"]
  }
];

const SkillsSection = React.forwardRef((props, ref) => (
  <motion.section
    id="skills"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="py-24"
    aria-labelledby="skills-heading"
    ref={ref}
  >
    <h2 id="skills-heading" className="text-4xl font-semibold mb-4 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 bg-clip-text text-transparent text-center">
      Skills
    </h2>
    <div className="h-px bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-transparent my-8 w-24 mx-auto" />
    <div className="px-4 space-y-8">
      <p className="text-center text-white/70 text-base max-w-2xl mx-auto">
        Each engagement starts with mapping the flow end to end-from ingestion jobs to the UI touchpoint-so the tooling below gets wired together with intention, not novelty.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillsGroups.map((grp) => (
          <div key={grp.title} className="rounded-2xl border border-white/10 bg-black/40 p-6 flex flex-col gap-4">
            <div>
              <h3 className="text-xl font-semibold text-cyan-200">{grp.title}</h3>
              {grp.description && (
                <p className="mt-2 text-sm text-white/60 leading-relaxed">{grp.description}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {grp.items.map((skill) => (
                <span key={skill} className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-full bg-white/5 text-white/80 border border-white/10">
                  {skillIcons[skill] && <span className="text-lg">{skillIcons[skill]}</span>}
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-16">
      <h3 className="text-2xl font-semibold mb-4 text-cyan-200 text-center">Relevant Coursework</h3>
      <div className="flex flex-wrap gap-3 justify-center px-4">
        {[
          "Distributed Systems",
          "Software Engineering",
          "Machine Learning",
          "Database Concepts",
          "Computer Networks",
          "Cloud Computing"
        ].map((topic) => (
          <span key={topic} className="px-4 py-2 text-sm rounded-full bg-white/5 text-white/70 border border-white/10">
            {topic}
          </span>
        ))}
      </div>
    </div>
  </motion.section>
));

export default SkillsSection; 
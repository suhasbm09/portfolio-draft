import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaDocker, FaRust, FaDatabase, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, FaLinux } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiSolana, SiFirebase, SiTypescript, SiFlask, SiJenkins, SiSupabase, SiVite, SiOpenai } from "react-icons/si";

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
  Solana: <SiSolana className="text-green-300" />, 
  Firebase: <SiFirebase className="text-yellow-400" />, 
  Flask: <SiFlask className="text-gray-200" />, 
  Jenkins: <SiJenkins className="text-red-400" />, 
};

const skillsGroups = [
  {
    title: "Languages",
    items: ["C", "C++", "Python", "JavaScript", "Rust"]
  },
  {
    title: "Frameworks",
    items: ["React", "Flask", "Node.js", "Anchor", "Metaplex", "TailwindCSS"]
  },
  {
    title: "Databases",
    items: ["MySQL", "MongoDB", "Firebase", "Pinata"]
  },
  {
    title: "Tools & Platforms",
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
    <h2 id="skills-heading" className="text-4xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent text-center">
      Skills
    </h2>
    <div className="h-px bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-transparent my-8 w-24 mx-auto" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
      {skillsGroups.map((grp) => (
        <div key={grp.title} className="w-full h-72 [perspective:1000px]"> {/* Increased height from h-56 to h-72 */}
          <div
            className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]"
          >
            {/* Front Side */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-2xl border border-cyan-400/20 flex items-center justify-center p-6" // Added p-6 for more padding
              style={{ backfaceVisibility: "hidden", transform: "rotateY(0deg)" }}
            >
              <h3 className="text-2xl font-semibold text-cyan-300">{grp.title}</h3>
            </div>
            {/* Back Side */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-xl rounded-2xl border border-purple-400/20 p-8 flex flex-col items-center justify-center space-y-2 [transform:rotateY(180deg)]" // Increased p-6 to p-8
              style={{ backfaceVisibility: "hidden" }}
            >
              <h3 className="text-xl font-medium text-purple-300 text-center mb-2">{grp.title}</h3>
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                {grp.items.map((skill) => (
                  <span key={skill} className="flex items-center gap-2 px-4 py-2 text-md rounded-full bg-cyan-400/10 text-cyan-200 border border-cyan-400/20">
                    {skillIcons[skill] && <span className="text-xl">{skillIcons[skill]}</span>}
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    {/* Theory & Coursework Skills Subsection */}
    <div className="mt-16">
      <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Theory & Coursework</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {[
          "Computer Networks (CN)",
          "Operating Systems (OS)",
          "System Design",
          "Database Concepts",
          "Artificial Intelligence",
          "Machine Learning",
          "Software Engineering and Project Management",
        ].map((topic) => (
          <span key={topic} className="px-5 py-3 text-base rounded-xl bg-cyan-400/10 text-cyan-200 border border-cyan-400/20 font-medium">
            {topic}
          </span>
        ))}
      </div>
    </div>
  </motion.section>
));

export default SkillsSection; 
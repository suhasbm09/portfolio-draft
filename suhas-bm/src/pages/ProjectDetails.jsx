import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaGithub, FaArrowLeft } from "react-icons/fa";

// Placeholder project data (should match Home.jsx structure)
const projects = [
  {
    key: "skillflex",
    title: "SkillFlex",
    desc: "Decentralized Proof-of-Skill dApp: complete challenges, AI evaluation, mint soulbound NFT with metadata on IPFS.",
    tech: ["Solana", "Anchor", "Rust", "React", "Flask", "MongoDB", "TailwindCSS"],
    link: "https://github.com/suhasbm09/SKILL_FLEX",
    use: "Showcases on-chain proof of skills and AI evaluation for developers.",
    gallery: ["/images/skillflex.png"],
  },
  {
    key: "vionex",
    title: "Vionex",
    desc: "Blockchain-backed medicine donation system with QR tracking, fraud detection, and rule-based AI matching.",
    tech: ["Solana", "Anchor", "Node.js", "Flask", "React", "TailwindCSS"],
    link: "https://github.com/suhasbm09/Vionex",
    use: "Enables secure, transparent medicine donations and fraud prevention.",
    gallery: ["/images/vionex.png"],
  },
  {
    key: "ai-code-commenter",
    title: "AI Code Commenter",
    desc: "GenAI tool that auto-comments code lines with live video UI, integrated CI/CD via Jenkins & Docker.",
    tech: ["Flask", "OpenRouter API", "JavaScript", "Docker", "Jenkins"],
    link: "https://github.com/suhasbm09/ai-code-commentor",
    use: "Automates code documentation and integrates with CI/CD pipelines.",
    gallery: ["/images/ai-code-commenter.png"],
  },
  {
    key: "college_chatbot",
    title: "College Enquiry Chatbot",
    desc: "RAG-powered domain-aware assistant with speech input, Firebase storage, and adaptive response generation.",
    tech: ["React", "Flask", "TailwindCSS", "LangChain", "Firebase"],
    link: "https://github.com/suhasbm09/College_Chatbot",
    use: "Assists students and staff with college-related queries.",
    gallery: ["/images/college_chatbot.png"],
  },
  {
    key: "ai-autocorrect",
    title: "AI Autocorrect Tool",
    desc: "Two-stage text optimizer using SymSpell & T5-small for high-speed grammar & spelling refinement.",
    tech: ["Flask", "SymSpell", "T5-small"],
    link: "https://github.com/suhasbm09/AutoCorrect-tool",
    use: "Improves text quality for writers and developers.",
    gallery: [],
  },
  {
    key: "launchbox",
    title: "LaunchBox.AI",
    desc: "AI-powered DevOps playground to instantly generate Dockerfiles, Jenkinsfiles, and deployment guides. Build, test, and simulate fullstack apps with zero config.",
    tech: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase", "OpenRouter API", "Monaco Editor", "Radix UI", "shadcn/ui"],
    link: "https://github.com/suhasbm09/launchbox-ai",
    use: "Automates DevOps and deployment for any project using AI.",
    gallery: ["/images/launchbox.png"],
    features: [
      "AI-powered DevOps automation",
      "Instant Dockerfile & Jenkinsfile generation",
      "Smart code analysis & commenting",
      "Multi-file Monaco editor",
      "Project dashboard & management",
      "Real-time collaboration (coming soon)",
      "Secure auth & data (Supabase)",
      "Modern, responsive UI"
    ],
  },
];

const ProjectDetails = () => {
  const { projectKey } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.key === projectKey);
  const [imgError, setImgError] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center py-24">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Project Not Found</h1>
        <button onClick={() => navigate(-1)} className="mt-4 px-6 py-2 rounded bg-cyan-600 text-white hover:bg-cyan-700 transition">Go Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4 max-w-6xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-cyan-400 hover:text-purple-400 transition font-medium">
        <FaArrowLeft /> Back
      </button>
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center md:items-start">
        {/* Left: Details */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">{project.title}</h1>
          <p className="text-white/80 text-lg">{project.desc}</p>
          {project.features && (
            <div>
              <span className="font-semibold text-cyan-300">Key Features:</span>
              <ul className="list-disc list-inside text-white/70 mt-2 space-y-1">
                {project.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <span className="font-semibold text-cyan-300">Tech Used:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 text-xs rounded-full bg-cyan-400/10 text-cyan-200 border border-cyan-400/20">{t}</span>
              ))}
            </div>
          </div>
          <div>
            <span className="font-semibold text-cyan-300">Use of Project:</span>
            <p className="text-white/70 mt-1">{project.use}</p>
          </div>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-lg font-medium text-cyan-300 hover:text-purple-300 transition-colors">
            View on GitHub <FaGithub />
          </a>
        </div>
        {/* Right: Image */}
        <div className="flex-1 flex justify-center items-center">
          {!imgError ? (
            <img
              src={`/images/${project.key}.png`}
              alt={`${project.title} screenshot`}
              className="w-[28rem] h-[28rem] object-contain rounded-2xl border-4 border-cyan-400/20 bg-black/40 shadow-lg"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-[28rem] h-[28rem] flex items-center justify-center rounded-2xl border-4 border-cyan-400/20 bg-black/40 text-2xl text-cyan-400 font-bold">
              Coming soon...
            </div>
          )}
        </div>
      </div>
      {/* Gallery Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Gallery</h2>
        {project.gallery && project.gallery.length > 0 ? (
          <div className="flex gap-6 overflow-x-auto pb-4 items-center min-h-[12rem]">
            {project.gallery.map((img, idx) => (
              <div key={idx} className="flex items-center justify-center h-48 w-80 bg-black/30 rounded-xl border-2 border-cyan-400/20 shadow flex-shrink-0">
                <img
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="max-h-44 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white/50 italic">No gallery images yet.</div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails; 
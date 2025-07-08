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
    inDepth: {
      overview: `SkillFlex is a decentralized, AI-powered credentialing platform that lets users prove their skills and mint non-transferable (soulbound) NFT credentials on Solana. It features instant AI evaluation, a Monaco code editor, and a modern glassmorphic UI.`,
      motivation: `Traditional credentials are slow, centralized, and hard to verify. SkillFlex provides instant, immutable proof of skill—owned by the user, verifiable by anyone, and shareable anywhere.`,
      howItWorks: [
        "Choose a coding or text challenge.",
        "Submit your answer using a Monaco-powered editor (code, text, or file).",
        "AI evaluates your submission instantly and gives a strict score.",
        "If you score 85% or higher, you can mint a soulbound NFT credential on Solana.",
        "Share your credential or track your on-chain history."
      ],
      features: [
        "Instant AI evaluation for code, text, or file submissions.",
        "VS Code-like Monaco editor for a professional coding experience.",
        "Soulbound NFTs: non-transferable, verifiable credentials on Solana.",
        "Modern, animated glassmorphic UI.",
        "History and analytics for all your mints.",
        "Secure: all secrets loaded from environment variables."
      ],
      security: `No API keys or secrets are hardcoded. All sensitive values are loaded from environment variables and never committed to version control.`
    },
    gallery: ["/images/skillflex.png"],
    // No demo video or live link yet
  },
  {
    key: "vionex",
    title: "Vionex",
    desc: "Blockchain-backed medicine donation system with QR tracking, fraud detection, and rule-based AI matching.",
    tech: ["Solana", "Anchor", "Node.js", "Flask", "React", "TailwindCSS"],
    link: "https://github.com/suhasbm09/Vionex",
    inDepth: {
      overview: `Vionex is a decentralized, AI-powered platform that bridges surplus and scarcity in healthcare. Donors contribute medicines, NGOs request what they need, and AI matches donations to requests. All transactions and handovers are logged immutably on Solana for transparency and trust.`,
      motivation: `Medicine wastage and lack of transparency in donations are major issues in healthcare. Vionex solves this by providing a secure, transparent, and automated way to match surplus medicines with those in need, reducing waste and fraud.`,
      howItWorks: [
        "Donors sign up, add medicine donations, and receive a QR code for handover.",
        "NGOs create profiles and request medicines as needed.",
        "AI matcher scores and recommends the best matches, checking for fraud and optimizing delivery.",
        "All donation and delivery events are logged on Solana via Anchor smart contracts.",
        "NGOs confirm receipt and provide feedback, closing the loop with on-chain proof."
      ],
      features: [
        "Donor and NGO portals with profile management.",
        "QR-based donation handover and delivery tracking.",
        "AI-powered matching and fraud detection.",
        "Transparent, immutable Solana blockchain logs.",
        "Modern, animated UI with React and TailwindCSS."
      ],
      security: `Sensitive keys and credentials are stored in environment variables and never hardcoded. All blockchain interactions are public and auditable on Solana Devnet.`
    },
    gallery: ["/images/vionex.png"],
    // No demo video or live link yet
  },
  {
    key: "ai-code-commenter",
    title: "AI Code Commenter",
    desc: "GenAI tool that auto-comments code lines with live video UI, integrated CI/CD via Jenkins & Docker.",
    tech: ["Flask", "OpenRouter API", "JavaScript", "Docker", "Jenkins"],
    link: "https://github.com/suhasbm09/ai-code-commentor",
    inDepth: {
      overview: `AI Code Commenter is a full-stack web app that uses GenAI to automatically add meaningful inline comments to code (Python, C++, etc.) and provides a final explanation. It features a live video background and a modern dark UI, making code review both efficient and visually appealing.`,
      motivation: `Writing clear code comments is tedious but essential for collaboration and maintainability. This tool automates the process, saving developers time and ensuring consistent, high-quality documentation.`,
      howItWorks: [
        "Paste your code into the web app (supports Python, C++, and more).",
        "Choose your preferred AI model (Mistral 7B or OpenChat 7B).",
        "The AI adds inline comments and a final summary explanation.",
        "You can reset, copy, or download the commented code.",
        "All processing is handled by a Flask backend using the OpenRouter API."
      ],
      features: [
        "AI-powered inline code commenting and summary explanation.",
        "Switch between multiple AI models.",
        "Live video background and sleek dark UI.",
        "Reset, copy, and download options for results.",
        "Fully automated CI/CD pipeline with Docker and Jenkins."
      ],
      security: `API keys are stored in environment variables and never hardcoded. The backend is CORS-enabled for secure API access.`
    },
    gallery: ["/images/ai-code-commenter.png"],
    // No demo video or live link yet
  },
  {
    key: "college_chatbot",
    title: "College Enquiry Chatbot",
    desc: "RAG-powered domain-aware assistant with speech input, Firebase storage, and adaptive response generation.",
    tech: ["React", "Flask", "TailwindCSS", "FAISS", "Firebase", "OpenRouter API", "MiniLM", "RAG"],
    link: "https://github.com/suhasbm09/College_Chatbot",
    inDepth: {
      overview: `NIBO is a voice-enabled, AI-powered chatbot designed to answer queries about NIE College, Mysuru. It uses Retrieval-Augmented Generation (RAG), semantic search (FAISS), and contextual LLMs to provide fast, accurate, and conversational responses, with a focus on student experience and accessibility.`,
      motivation: `Students and visitors often have repetitive or complex questions about college processes. NIBO automates these answers, making information accessible 24/7 and freeing up staff time, while also collecting feedback for continuous improvement.`,
      howItWorks: [
        "User interacts with a floating chat bubble or popup UI inspired by the NIE website.",
        "Questions are semantically matched to a curated dataset using FAISS and MiniLM embeddings.",
        "OpenRouter LLMs generate contextual, conversational responses.",
        "Speech-to-text is supported via the Web Speech API for hands-free use.",
        "Feedback is collected and securely stored in Firebase Firestore for analysis and improvement."
      ],
      features: [
        "Semantic search with FAISS and MiniLM embeddings.",
        "Contextual, LLM-powered responses (Mistral, DeepSeek).",
        "Voice input via Web Speech API.",
        "Interactive, modular frontend with React and TailwindCSS.",
        "Feedback collection and analytics with Firebase Firestore."
      ],
      security: `All API keys and credentials are stored in environment variables and never hardcoded. Feedback data is securely stored in Firebase.`
    },
    gallery: ["/images/college_chatbot.png"],
    // No demo video or live link yet
  },
  {
    key: "ai-autocorrect",
    title: "AI Autocorrect Tool",
    desc: "Two-stage text optimizer using SymSpell & T5-small for high-speed grammar & spelling refinement.",
    tech: ["Flask", "SymSpell", "t5-small", "Hugging Face Transformers", "Bootstrap", "HTML", "CSS"],
    link: "https://github.com/suhasbm09/AutoCorrect-tool",
    inDepth: {
      overview: `An AI-powered autocorrect tool that improves text accuracy by combining fast spelling correction (SymSpell) with advanced grammar correction (t5-small transformer). The tool features a simple, interactive web interface for both direct text input and file uploads.`,
      motivation: `Manual proofreading is slow and error-prone. This tool automates spelling and grammar correction, making it easy for users to quickly improve the quality of their writing or documents.`,
      howItWorks: [
        "User enters text or uploads a .txt file via the web interface.",
        "SymSpell algorithm identifies and corrects spelling errors.",
        "The corrected text is then processed by the t5-small model for grammar fixes.",
        "Users can view, copy, or download the corrected text instantly."
      ],
      features: [
        "Fast, efficient spelling correction with SymSpell.",
        "Advanced grammar correction using t5-small transformer.",
        "File upload support for bulk corrections.",
        "Simple, Bootstrap-based web interface.",
        "Copy to clipboard with one click."
      ],
      security: `All processing is done locally on the backend. No user data or text is stored or shared.`
    },
    gallery: [],
    // No demo video or live link
  },
  {
    key: "launchbox",
    title: "LaunchBox.AI",
    desc: "AI-powered DevOps playground to instantly generate Dockerfiles, Jenkinsfiles, and deployment guides. Build, test, and simulate fullstack apps with zero config.",
    tech: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase", "OpenRouter API", "Monaco Editor", "Radix UI", "shadcn/ui"],
    link: "https://github.com/suhasbm09/launchbox-ai",
    inDepth: {
      overview: `LaunchBox.AI is a next-generation, AI-powered DevOps platform for developers and teams. Instantly generate Dockerfiles, Jenkinsfiles, and step-by-step deployment guides tailored to your codebase. The platform features a collaborative, secure, and modern development environment with advanced code analysis and project management tools.`,
      motivation: `Setting up DevOps pipelines and deployment configs is time-consuming and error-prone. LaunchBox.AI automates these tasks, letting developers focus on building while ensuring best practices and security.`,
      howItWorks: [
        "Connect your project or start a new one in the Monaco-based smart editor.",
        "AI analyzes your codebase and generates Dockerfiles, Jenkinsfiles, and deployment guides.",
        "Manage and organize projects in a unified dashboard.",
        "(Coming soon) Collaborate with your team in real time.",
        "All AI API calls are handled server-side for security."
      ],
      features: [
        "AI-powered DevOps automation for any project.",
        "Instant Dockerfile, Jenkinsfile, and deployment guide generation.",
        "Multi-file Monaco editor with syntax highlighting and suggestions.",
        "Project management dashboard and search.",
        "Secure authentication and row-level security with Supabase.",
        "Modern, responsive UI with dark mode and animations.",
        "Performance monitoring and analytics."
      ],
      security: `All API keys are kept server-side and never exposed. Supabase RLS enforces strict data access. Input validation, security headers, and session management protect users and data. Secrets are always gitignored.`
    },
    gallery: ["/images/launchbox.png"],
    demoVideo: "https://www.youtube.com/embed/Tj690TNMELI?si=iYX53nM5-7aNl0Er",
    liveLink: "https://launchai-deploy.vercel.app/",
    // No demo video or live link yet
  },
  // Other Projects (static card example)
  {
    key: "todo-list",
    title: "To-Do List (Vanilla JS)",
    desc: "A simple to-do list app built with vanilla JavaScript, HTML, and CSS. Supports adding, marking, and deleting tasks with persistent storage using localStorage.",
    tech: ["HTML", "JavaScript", "CSS"],
    link: "", // No GitHub or live link
    inDepth: {
      overview: `A lightweight to-do list application that lets users add, complete, and delete tasks. All tasks are saved in the browser's localStorage for persistence. The UI is minimal, focusing on core functionality without any frameworks or libraries.`,
      motivation: `Created as a practice project to learn DOM manipulation, event handling, and localStorage in vanilla JavaScript.`,
      howItWorks: [
        "User enters a task and clicks 'Add'.",
        "Tasks appear in a list with options to mark as completed or delete.",
        "All changes are saved in localStorage and persist across reloads."
      ],
      features: [
        "Add, complete, and delete tasks.",
        "Persistent storage with localStorage.",
        "Minimal, responsive UI."
      ],
      security: `All data is stored locally in the browser. No data is sent to any server.`
    },
    gallery: [],
    // No demo video or live link
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
          {/* In-depth explanation for any project with inDepth */}
          {project.inDepth ? (
            <>
              <section>
                <h2 className="text-2xl font-semibold text-cyan-300 mb-2">Overview</h2>
                <p className="text-white/80 text-lg">{project.inDepth.overview}</p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold text-cyan-300 mb-2 mt-6">Motivation</h2>
                <p className="text-white/80 text-lg">{project.inDepth.motivation}</p>
              </section>
              <section>
                <h2 className="text-2xl font-semibold text-cyan-300 mb-2 mt-6">How It Works</h2>
                <ol className="list-decimal list-inside text-white/80 text-lg space-y-1">
                  {project.inDepth.howItWorks.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </section>
              <section>
                <h2 className="text-2xl font-semibold text-cyan-300 mb-2 mt-6">Key Features</h2>
                <ul className="list-disc list-inside text-white/80 text-lg space-y-1">
                  {project.inDepth.features.map((f, idx) => (
                    <li key={idx}>{f}</li>
                ))}
              </ul>
              </section>
              <section>
                <h2 className="text-2xl font-semibold text-cyan-300 mb-2 mt-6">Security</h2>
                <p className="text-white/80 text-lg">{project.inDepth.security}</p>
              </section>
            </>
          ) : (
            <p className="text-white/80 text-lg">{project.desc}</p>
          )}
        </div>
        {/* Right: Image and Tech Used */}
        <div className="flex-1 flex flex-col justify-center items-center space-y-6">
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
          {/* Tech Used moved here with larger font */}
          <div className="w-full flex flex-col items-center">
            <span className="font-semibold text-cyan-300">Tech Used:</span>
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {project.tech.map((t) => (
                <span key={t} className="px-4 py-2 text-base font-semibold rounded-full bg-cyan-400/10 text-cyan-200 border border-cyan-400/20">{t}</span>
              ))}
            </div>
          </div>
          {/* Demo Video Link (YouTube icon) between tech and GitHub */}
          {project.demoVideo && (
            <div className="w-full flex flex-col items-center mt-6">
              <a
                href={project.demoVideo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group"
                title="Watch Demo Video on YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="56"
                  height="56"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-red-500 group-hover:text-red-700 transition-colors mb-2"
                >
                  <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.116C19.228 3.5 12 3.5 12 3.5s-7.228 0-9.386.57A2.994 2.994 0 0 0 .502 6.186C0 8.344 0 12 0 12s0 3.656.502 5.814a2.994 2.994 0 0 0 2.112 2.116C4.772 20.5 12 20.5 12 20.5s7.228 0 9.386-.57a2.994 2.994 0 0 0 2.112-2.116C24 15.656 24 12 24 12s0-3.656-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="text-cyan-300 font-semibold group-hover:underline">Watch Demo Video</span>
              </a>
            </div>
          )}
          {/* GitHub Link moved here */}
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-xl font-bold text-cyan-300 hover:text-purple-300 transition-colors">
            View on GitHub <FaGithub />
          </a>
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
      {/* Live Link Section */}
      {project.liveLink && (
        <div className="mt-8 flex justify-center">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-xl font-bold rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg hover:scale-105 transition-transform"
          >
            Try Live Demo
          </a>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails; 
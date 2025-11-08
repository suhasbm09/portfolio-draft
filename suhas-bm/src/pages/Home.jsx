// src/pages/Home.jsx

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import SEO from '../components/SEO';

const HeroSection = lazy(() => import("./sections/HeroSection"));
const AboutSection = lazy(() => import("./sections/AboutSection"));
const EducationSection = lazy(() => import("./sections/EducationSection"));
const SkillsSection = lazy(() => import("./sections/SkillsSection"));
const ProjectsSection = lazy(() => import("./sections/ProjectsSection"));
const HackathonsSection = lazy(() => import("./sections/HackathonsSection"));
const ContactSection = lazy(() => import("./sections/ContactSection"));

const Home = () => {
  const containerRef = useRef(null);

  const educationItems = [
    {
      title: "B.E. Computer Science & Engineering",
      institute: "National Institute of Engineering, Mysuru",
      detail: "GPA 9.24/10 (2022 – Present)",
      isCurrent: true,
    },
    {
      title: "Senior Secondary Education (PUC)",
      institute: "Vijaya Vittala PU Composite",
      detail: "95.5% (2020 – 2022)",
    },
    {
      title: "Secondary Education (10th Grade)",
      institute: "Vijaya Vittala Vidyashala",
      detail: "91.5% (2008 – 2020)",
    },
  ];

  const skillsGroups = [
    { title: "Languages", items: ["C", "C++", "Python", "JavaScript", "Rust"] },
    { title: "Frameworks", items: ["React", "TailwindCSS", "Flask", "Node.js", "Anchor", "Metaplex"] },
    { title: "Databases", items: ["MySQL", "MongoDB", "Firebase", "Pinata"] },
    { title: "Tools & Platforms", items: ["Docker", "Jenkins", "Git", "Linux", "Solana CLI"] },
  ];

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
    },
  ];

  // Add a separate array for other projects
  const otherProjects = [
    {
      key: "todo-list",
      title: "To-Do List",
      desc: "A basic to-do list app built with plain JavaScript, HTML, and CSS. Supports adding, marking, and deleting tasks with persistent storage using localStorage.",
      tech: ["JavaScript", "HTML", "CSS"],
      link: "", // No GitHub or live link
      inDepth: {
        overview: `A lightweight to-do list application that lets users add, complete, and delete tasks. All tasks are saved in the browser's localStorage for persistence. The UI is minimal, focusing on core functionality without any frameworks or libraries.`,
        motivation: `Created as a practice project to learn DOM manipulation, event handling, and localStorage in JavaScript.`,
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
    },
    {
      key: "text-extractor",
      title: "Text-Extractor",
      desc: "A web app to extract text from images (JPG, PNG) and PDFs using OCR. Supports English, Hindi, and Kannada, and outputs clean JSON. Upload, extract, and download results instantly.",
      tech: ["React", "Vite", "TailwindCSS", "Node.js", "Express", "Tesseract.js", "pdf2pic"],
      link: "https://text-extractor-indol.vercel.app/", // Live link
      inDepth: {
        overview: `Text-Extractor lets users upload images or PDFs and extract text using OCR. It supports multiple languages and returns results as structured JSON for easy integration.`,
        motivation: `Built to simplify extracting and digitizing text from documents and images, especially for multilingual use cases.`,
        howItWorks: [
          "Upload an image or PDF.",
          "OCR runs in the backend using Tesseract.js and pdf2pic.",
          "Extracted text is returned as JSON and can be downloaded."
        ],
        features: [
          "Image & PDF upload.",
          "Multilingual OCR (English, Hindi, Kannada).",
          "Downloadable JSON output."
        ],
        security: `Files are processed server-side and not stored after extraction.`
      },
      gallery: [],
    },
  ];

  const hackathons = [
    {
      title: "Code For Bharat Season 2",
      subtitle: "Participant",
      desc: "Built VORTEX - a decentralized social media app with Solana, React+TS, and AI-powered content verification.",
      status: "Participated",
      badge: "team",
      color: "from-cyan-400 to-purple-500",
      scope: "national-level",
    },
    {
      title: "Solana OutBreak 2025",
      subtitle: "Participant",
      desc: "Built initial prototype of SkillFlex - an AI-evaluated NFT skill platform on Solana.",
      status: "Participated",
      badge: "solo",
      color: "from-cyan-400 to-blue-400",
      scope: "global-level",
    },
    {
      title: "Inohax 2.0",
      subtitle: "Top 5/30+ teams",
      desc: "Developed Vionex, a blockchain medicine-donation dApp with AI fraud detection.",
      status: "Top 5",
      badge: "team",
      color: "from-blue-400 to-purple-400",
      scope: "national-level",
    },
    {
      title: "Bolt.New Hackathon",
      subtitle: "Participant",
      desc: "Designing a unified DevOps sandbox to write code, generate pipelines, and simulate deployments.",
      status: "Participated",
      badge: "solo",
      color: "from-purple-400 to-pink-400",
      scope: "global-level",
    },
  ];

  return (
    <>
      <SEO
        title="Home"
        description="Suhas BM is an engineer focused on data pipelines, product delivery, and end-to-end workflows. Explore selected projects, skills, and ways to collaborate."
        keywords="Suhas BM, data engineering, product engineering, full stack, portfolio"
        url="https://your-portfolio-url.com/"
      />
      <div ref={containerRef} className="relative space-y-32">
        <Suspense fallback={<div className="h-32" />}> <HeroSection /> </Suspense>
        <Suspense fallback={<div className="h-32" />}> <AboutSection /> </Suspense>
        <Suspense fallback={<div className="h-32" />}> <EducationSection educationItems={educationItems} /> </Suspense>
        <Suspense fallback={<div className="h-32" />}> <SkillsSection skillsGroups={skillsGroups} /> </Suspense>
  <Suspense fallback={<div className="h-32" />}> <ProjectsSection projects={projects} otherProjects={otherProjects} /> </Suspense>
  <Suspense fallback={<div className="h-32" />}> <HackathonsSection hackathons={hackathons} /> </Suspense>
        <Suspense fallback={<div className="h-32" />}> <ContactSection /> </Suspense>
      </div>
    </>
  );
};

export default Home;

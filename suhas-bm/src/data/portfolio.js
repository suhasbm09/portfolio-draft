export const brand = {
  name: "Suhas B M",
  role: "Backend Engineer & Solana Builder",
  location: "Mysuru, India",
  email: "suhaasbm2004@gmail.com",
  phone: "+91 9036751497",
  github: "https://github.com/suhasbm09",
  linkedin: "https://www.linkedin.com/in/suhas-b-m-88a179244",
  resume: "https://drive.google.com/file/d/1k_jTRUNPB7WeF9ulcDXZxeXltIMhbiox/view?usp=drive_link",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Proof", href: "#proof" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  headline: "I build dependable backend systems and Solana products.",
  summary:
    "I design APIs, services, and on-chain workflows that stay understandable in production. My work sits between backend engineering, Solana integration, and disciplined product delivery.",
  eyebrow: "Backend systems · Solana programs · Product delivery",
  primaryCta: "See selected work",
  secondaryCta: "Download resume",
  metrics: [
    { label: "Focus", value: "Backend + Solana" },
    { label: "Projects", value: "6 shipped builds" },
    { label: "Approach", value: "Reliability first" },
  ],
  signals: [
    "APIs and services built to be predictable in production",
    "Solana programs connected to useful product flows",
    "Delivery habits shaped around clear handoff and repeatability",
  ],
};

export const about = {
  title: "Backend engineering with Solana execution and product clarity.",
  paragraphs: [
    "I care about structure first: clean APIs, data integrity, and implementation choices that are easy to maintain over time.",
    "On the Solana side, I focus on the same standard. The goal is to build program logic and user flows that feel dependable instead of experimental.",
  ],
  highlights: [
    {
      title: "Backend systems",
      text: "API design, service boundaries, data validation, and deployment patterns that hold up in production.",
    },
    {
      title: "Solana engineering",
      text: "Anchor programs, on-chain workflows, and metadata flows that support real product use cases.",
    },
    {
      title: "Delivery discipline",
      text: "Containerized environments, CI pipelines, and release habits that keep iteration calm.",
    },
    {
      title: "Data and operations",
      text: "ETL, logs, and operational clarity so systems stay observable and trustworthy.",
    },
  ],
};

export const stackGroups = [
  {
    title: "Languages",
    icon: "C++ / Python / JavaScript / Rust",
    items: ["C++", "Python", "JavaScript", "Rust"],
    note: "Core languages for algorithms, APIs, and on-chain work.",
  },
  {
    title: "Backend systems",
    icon: "Flask / Node.js / Express",
    items: ["Flask", "Node.js", "Express", "Firebase"],
    note: "Service layers, auth, orchestration, and data access.",
  },
  {
    title: "Solana stack",
    icon: "Solana / Anchor / IPFS",
    items: ["Solana", "Anchor", "IPFS", "Pinata"],
    note: "Smart contracts, verification, and on-chain metadata.",
  },
  {
    title: "Delivery",
    icon: "Docker / Jenkins / Linux",
    items: ["Docker", "Jenkins", "Git", "Linux"],
    note: "Containers, CI, and release pipelines that stay predictable.",
  },
];

export const projects = [
  {
    key: "skillflex",
    title: "SkillFlex",
    category: "Solana credentialing dApp",
    summary:
      "A proof-of-skill platform where users complete challenges, receive AI evaluation, and mint non-transferable credentials on Solana.",
    impact: "Turns verification into a user-owned, on-chain asset.",
    image: "/images/skillflex.png",
    stack: ["Solana", "Anchor", "Rust", "React", "Flask", "MongoDB", "IPFS"],
    links: {
      github: "https://github.com/suhasbm09/SKILL_FLEX",
    },
    outcome: [
      "Monaco-like editor experience for structured submissions",
      "AI scoring flow connected to minting logic",
      "Soulbound credentials stored with IPFS metadata",
    ],
    architecture: [
      "Frontend submission flow with challenge state and evaluation feedback",
      "Backend scoring and validation pipeline before mint eligibility",
      "Anchor program for credential minting and metadata anchoring",
    ],
  },
  {
    key: "vionex",
    title: "Vionex",
    category: "Blockchain utility for healthcare",
    summary:
      "A medicine donation system with QR tracking, fraud-aware matching, and immutable donation logs on Solana.",
    impact: "Uses blockchain to create trust where workflows are usually opaque.",
    image: "/images/vionex.png",
    stack: ["Solana", "Anchor", "Node.js", "Flask", "React", "TailwindCSS"],
    links: {
      github: "https://github.com/suhasbm09/Vionex",
    },
    outcome: [
      "Donation and delivery events tracked with on-chain records",
      "AI-assisted matching and fraud checks for better routing",
      "QR handover flow for simple operational verification",
    ],
    architecture: [
      "Donor and NGO flows shaped as separate product surfaces",
      "Matching logic that prioritizes fit, safety, and transparency",
      "Blockchain logging to preserve an auditable trail",
    ],
  },
  {
    key: "college_chatbot",
    title: "College Enquiry Chatbot",
    category: "RAG assistant",
    summary:
      "A retrieval-powered assistant for institute queries, with voice input, semantic search, and Firebase-backed feedback loops.",
    impact: "Makes institutional knowledge searchable, conversational, and available 24/7.",
    image: "/images/college_chatbot.png",
    stack: ["React", "Flask", "FAISS", "Firebase", "OpenRouter API", "MiniLM"],
    links: {
      github: "https://github.com/suhasbm09/College_Chatbot",
    },
    outcome: [
      "Semantic retrieval for higher answer relevance",
      "Speech input for faster query capture",
      "Feedback storage for iterative improvement",
    ],
    architecture: [
      "Vector search pipeline built around institute-specific content",
      "LLM response generation tuned for conversational clarity",
      "Persistent feedback layer for quality loops",
    ],
  },
  {
    key: "ai-code-commenter",
    title: "AI Code Commenter",
    category: "GenAI developer tooling",
    summary:
      "A tool that adds inline explanations to code and wraps the flow in a CI-friendly Docker and Jenkins setup.",
    impact: "Turns comment generation into a repeatable developer workflow.",
    image: "/images/ai-code-commenter.png",
    stack: ["Flask", "JavaScript", "Docker", "Jenkins", "OpenRouter API"],
    links: {
      github: "https://github.com/suhasbm09/ai-code-commentor",
    },
    outcome: [
      "Inline comments plus end-to-end explanation generation",
      "Multi-model support for flexible output quality",
      "Automated build and deployment pipeline",
    ],
    architecture: [
      "Prompting and response shaping focused on code readability",
      "Containerized backend for predictable execution",
      "Jenkins pipeline to keep delivery consistent",
    ],
  },
  {
    key: "launchbox",
    title: "LaunchBox.AI",
    category: "DevOps playground",
    summary:
      "An AI-powered sandbox for generating Dockerfiles, Jenkinsfiles, and deployment guidance from code.",
    impact: "Reduces setup friction by turning deployment thinking into a guided flow.",
    image: "/images/launchbox.png",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "OpenRouter API"],
    links: {
      github: "https://github.com/suhasbm09/launchbox-ai",
      live: "https://launchai-deploy.vercel.app/",
    },
    outcome: [
      "Multi-file code workspace with planning and analysis",
      "Generation of deployment assets from a single interaction",
      "Modern dashboard flow for project organization",
    ],
    architecture: [
      "Secure server-side AI calls",
      "Project management and code analysis surfaces",
      "Deployment guidance tailored to the supplied codebase",
    ],
  },
  {
    key: "text-extractor",
    title: "Text-Extractor",
    category: "OCR utility",
    summary:
      "A document extraction tool that converts images and PDFs into structured text across multiple languages.",
    impact: "Makes scanned content usable immediately in structured workflows.",
    image: "",
    stack: ["React", "Vite", "Node.js", "Express", "Tesseract.js"],
    links: {
      live: "https://text-extractor-indol.vercel.app/",
    },
    outcome: [
      "Image and PDF ingestion with OCR processing",
      "Multi-language support including English, Hindi, and Kannada",
      "JSON output that is easy to reuse downstream",
    ],
    architecture: [
      "Backend document conversion and OCR flow",
      "Structured output designed for quick consumption",
      "Simple interface tuned for utility and speed",
    ],
  },
];

export const experience = [
  {
    period: "Jan 2026 – Present",
    title: "PSI Intern — Pro Suite Implementation",
    org: "UKG",
    location: "Enterprise payroll systems",
    summary:
      "Supporting UKG Pro HCM payroll implementation work with a focus on validation, configuration accuracy, and controlled reporting workflows.",
    bullets: [
      "Validate payroll scenarios using Payroll Compare and Wage Validation to catch configuration and data issues early.",
      "Support earnings, deductions, and tax setup inside a controlled UKG Pro HCM implementation flow.",
      "Review role-based access and reporting paths to keep operations and validation aligned.",
      "Work in a delivery environment where accuracy, consistency, and repeatability matter more than surface polish.",
    ],
  },
];

export const education = [
  {
    period: "2022 – Present",
    title: "B.E. Computer Science and Engineering",
    org: "The National Institute of Engineering, Mysuru",
    location: "CGPA: 9.17 / 10",
    summary: "Current undergraduate program with a cumulative CGPA of 9.17 / 10.",
    bullets: [],
  },
  {
    period: "2020 – 2022",
    title: "Pre-University (PCMB)",
    org: "Vijaya Vittala PU Composite",
    location: "95.5%",
    summary: "Physics, Chemistry, Mathematics, Computer Science track.",
    bullets: ["95.5% aggregate across physics, chemistry, mathematics, and CS"],
  },
];

export const certifications = [
  {
    title: "Acke School of Blockchain — Solana Development Program",
    type: "Blockchain",
    description: "Focused Solana development training and on-chain building practice.",
  },
];

export const milestones = [
  {
    title: "Solana OutBreak 2025",
    badge: "Participant",
    detail: "Built the initial prototype of SkillFlex for AI-evaluated skill credentials.",
  },
  {
    title: "Inohax 2.0",
    badge: "Top 5 / 30+ teams",
    detail: "Developed Vionex, a blockchain medicine donation system with AI fraud detection.",
  },
  {
    title: "Code For Bharat Season 2",
    badge: "Participant",
    detail: "Created VORTEX, a decentralized social platform using Solana and content verification.",
  },
];

export const principles = [
  {
    title: "Infrastructure first",
    copy: "Design for reliability and scale before adding features. Strong foundations make systems easier to extend.",
  },
  {
    title: "Observable systems",
    copy: "Logging, metrics, and tracing are essential. If the system is not observable, it is difficult to operate.",
  },
  {
    title: "Production discipline",
    copy: "Testing, deployment automation, and failure handling are part of the engineering process, not afterthoughts.",
  },
];

export const contact = {
  summary:
    "Open to backend and Solana roles where reliability, systems thinking, and product polish matter.",
  availability: "Available for full-time opportunities and focused freelance collaborations.",
};

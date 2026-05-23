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
  { label: "Contact", href: "#contact" },
];

export const hero = {
  headline: "I build backend systems and Solana products that hold up in production.",
  summary:
    "I design APIs, service layers, and on-chain workflows with clear ownership, reliable behavior, and clean delivery.",
  eyebrow: "Backend engineering · Solana execution · Product delivery",
  primaryCta: "See selected work",
  secondaryCta: "Download resume",
  metrics: [
    { label: "Focus", value: "Backend + Solana" },
    { label: "Projects", value: "6 shipped builds" },
    { label: "Approach", value: "Operate cleanly" },
  ],
  signals: [
    "Product-grade APIs, services, and background workflows",
    "Solana logic shaped for practical product use",
    "Delivery habits built around clarity and repeatability",
  ],
};

export const about = {
  title: "Backend engineering with systems thinking and product delivery.",
  paragraphs: [
    "I start with structure: clean APIs, dependable data flow, and implementation choices that stay maintainable over time.",
    "On Solana, I hold the same standard. The goal is to ship program logic and product flows that feel dependable in production.",
  ],
  highlights: [
    {
      title: "Backend systems",
      text: "API design, service boundaries, validation, and deployment patterns that hold up in production.",
    },
    {
      title: "Solana engineering",
      text: "Anchor programs, on-chain workflows, and metadata flows that support real product use cases.",
    },
    {
      title: "Delivery discipline",
      text: "Containerized environments, CI pipelines, and release habits that keep iteration predictable.",
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
    note: "Core languages for APIs, systems, and on-chain work.",
  },
  {
    title: "Backend systems",
    icon: "Flask / Node.js / Express",
    items: ["Flask", "Node.js", "Express", "Firebase"],
    note: "Service layers, orchestration, and data access.",
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
    key: "signum",
    title: "Signum",
    category: "Flagship AI learning platform",
    summary:
      "A flagship AI tutoring and assessment platform built with Gemini, retrieval-augmented generation, screen-aware context, and integrity controls for quizzes and coding assessments.",
    impact: "Combines learning context, live assistance, and assessment integrity into one dependable workflow.",
    image: "/images/signum.png",
    featured: true,
    stack: ["React", "FastAPI", "Gemini 2.5 Flash", "RAG", "Firestore", "Web Speech API"],
    outcome: [
      "Course-aware answers grounded in retrieved material and recent conversation history",
      "Voice input and strict response formatting that keep tutoring fast and readable",
      "Progressive anti-cheat monitoring for quiz and coding assessment workflows",
    ],
    architecture: [
      "Three AI pipelines for Q&A, code evaluation, and anti-cheat orchestration",
      "Prompt augmentation that blends course context, screen text, and conversation history",
      "Client-side violation detection with backend block status checks and expiry handling",
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
    title: "Implementation Intern — UKG Pro Suite",
    org: "UKG",
    location: "Enterprise payroll systems",
    summary:
      "Supporting UKG Pro HCM payroll implementation work with a focus on register automation, validation accuracy, and controlled reporting workflows.",
    bullets: [
      "Built Excel VBA automation to process payroll register data and generate standardized earnings, deductions, and tax reports from structured templates.",
      "Designed modular handlers for different payroll register formats, reducing manual processing time from around 4 hours to under 40 minutes during internal testing.",
      "Worked with payroll validation and reporting workflows, including Payroll Compare, wage validation, and report mapping across enterprise implementation environments.",
      "Gained practical exposure to enterprise payroll configuration, data quality validation, and cross-functional implementation support in UKG Pro systems.",
    ],
  },
];

export const education = [
  {
    period: "2022 – Present",
    title: "B.E. Computer Science and Engineering",
    org: "The National Institute of Engineering, Mysuru",
    location: "CGPA: 9.17 / 10",
    summary: "Computer science training with a cumulative CGPA of 9.17 / 10.",
    bullets: [],
  },
  {
    period: "2020 – 2022",
    title: "Pre-university, PCMB",
    org: "Vijaya Vittala PU Composite",
    location: "95.5%",
    summary: "Physics, Chemistry, Mathematics, and Computer Science track.",
    bullets: ["95.5% aggregate across physics, chemistry, mathematics, and CS"],
  },
];

export const certifications = [
  {
    title: "Acke School of Blockchain — Solana Development Program",
    type: "Blockchain",
    description: "Solana development training with hands-on on-chain implementation practice.",
  },
];

export const milestones = [
  {
    title: "Signum",
    badge: "Flagship build",
    detail: "Built a Gemini-powered learning platform with retrieval, context awareness, and integrity controls.",
  },
  {
    title: "Inohax 2.0",
    badge: "Top 5 / 30+ teams",
    detail: "Developed Vionex, a blockchain medicine donation system with AI-assisted fraud detection.",
  },
  {
    title: "Code For Bharat Season 2",
    badge: "Builder",
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
    "Open to backend and Solana roles where system design, delivery discipline, and product judgment matter.",
  availability: "Available for full-time opportunities and selective project work.",
};

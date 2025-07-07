// src/pages/Home.jsx

import { FaEnvelope, FaPhone, FaArrowDown, FaGithub, FaLinkedin } from "react-icons/fa";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import React, { Suspense, lazy } from "react";

const HeroSection = lazy(() => import("./sections/HeroSection"));
const AboutSection = lazy(() => import("./sections/AboutSection"));
const EducationSection = lazy(() => import("./sections/EducationSection"));
const SkillsSection = lazy(() => import("./sections/SkillsSection"));
const ProjectsSection = lazy(() => import("./sections/ProjectsSection"));
const ArticlesSection = lazy(() => import("./sections/ArticlesSection"));
const HackathonsSection = lazy(() => import("./sections/HackathonsSection"));
const CertificatesSection = lazy(() => import("./sections/CertificatesSection"));
const ContactSection = lazy(() => import("./sections/ContactSection"));

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [text] = useTypewriter({
    words: ["Crafting Smart Contracts", "Building Intuitive Web Apps", "Solving Complex Challenges"],
    loop: true,
    delaySpeed: 2000,
  });

  const educationItems = [
    {
      title: "B.E. Computer Science & Engineering",
      institute: "National Institute of Engineering, Mysuru",
      detail: "GPA 9.3/10 (2022 – Present)",
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
    },
    {
      key: "vionex",
      title: "Vionex",
      desc: "Blockchain-backed medicine donation system with QR tracking, fraud detection, and rule-based AI matching.",
      tech: ["Solana", "Anchor", "Node.js", "Flask", "React", "TailwindCSS"],
      link: "https://github.com/suhasbm09/Vionex",
    },
    {
      key: "ai-code-commenter",
      title: "AI Code Commenter",
      desc: "GenAI tool that auto-comments code lines with live video UI, integrated CI/CD via Jenkins & Docker.",
      tech: ["Flask", "OpenRouter API", "JavaScript", "Docker", "Jenkins"],
      link: "https://github.com/suhasbm09/ai-code-commentor",
    },
    {
      key: "college_chatbot",
      title: "College Enquiry Chatbot",
      desc: "RAG-powered domain-aware assistant with speech input, Firebase storage, and adaptive response generation.",
      tech: ["React", "Flask", "TailwindCSS", "LangChain", "Firebase"],
      link: "https://github.com/suhasbm09/College_Chatbot",
    },
    {
      key: "launchbox",
      title: "LaunchBox.AI",
      desc: "AI-powered DevOps playground to instantly generate Dockerfiles, Jenkinsfiles, and deployment guides. Build, test, and simulate fullstack apps with zero config.",
      tech: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase", "OpenRouter API", "Monaco Editor", "Radix UI", "shadcn/ui"],
      link: "https://github.com/suhasbm09/launchbox-ai",
    },
    {
      key: "ai-autocorrect",
      title: "AI Autocorrect Tool",
      desc: "Two-stage text optimizer using SymSpell & T5-small for high-speed grammar & spelling refinement.",
      tech: ["Flask", "SymSpell", "T5-small"],
      link: "https://github.com/suhasbm09/AutoCorrect-tool",
    },
  ];

  const hackathons = [
    {
      title: "Solana OutBreak 2025",
      subtitle: "Participant",
      desc: "Built initial prototype of SkillFlex — an AI-evaluated NFT skill platform on Solana.",
      status: "Participated",
      badge: "solo",
      color: "from-cyan-400 to-blue-400",
    },
    {
      title: "Inohax 2.0",
      subtitle: "Top 5/30+",
      desc: "Developed Vionex, a blockchain medicine-donation dApp with AI fraud detection.",
      status: "Top 5",
      badge: "team",
      color: "from-blue-400 to-purple-400",
    },
    {
      title: "Bolt.New Hackathon",
      subtitle: "Participant",
      desc: "Designing a unified DevOps sandbox to write code, generate pipelines, and simulate deployments.",
      status: "Participated",
      badge: "solo",
      color: "from-purple-400 to-pink-400",
    },
  ];

  return (
    <div ref={containerRef} className="relative space-y-32">
      <Suspense fallback={<div className="h-32" />}> <HeroSection /> </Suspense>
      <Suspense fallback={<div className="h-32" />}> <AboutSection /> </Suspense>
      <Suspense fallback={<div className="h-32" />}> <EducationSection educationItems={educationItems} /> </Suspense>
      <Suspense fallback={<div className="h-32" />}> <SkillsSection skillsGroups={skillsGroups} /> </Suspense>
      <Suspense fallback={<div className="h-32" />}> <ProjectsSection projects={projects} /> </Suspense>
      <Suspense fallback={<div className="h-32" />}> <ArticlesSection /> </Suspense>
      <Suspense fallback={<div className="h-32" />}> <HackathonsSection hackathons={hackathons} /> </Suspense>
      <Suspense fallback={<div className="h-32" />}> <CertificatesSection /> </Suspense>
      <Suspense fallback={<div className="h-32" />}> <ContactSection /> </Suspense>
    </div>
  );
};

export default Home;

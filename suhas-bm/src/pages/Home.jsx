import React, { Suspense, lazy } from "react";
import SEO from "../components/SEO";
import { projects } from "../data/portfolio";

const HeroSection = lazy(() => import("./sections/HeroSection"));
const AboutSection = lazy(() => import("./sections/AboutSection"));
const ArticlesSection = lazy(() => import("./sections/ArticlesSection"));
const SkillsSection = lazy(() => import("./sections/SkillsSection"));
const ProjectsSection = lazy(() => import("./sections/ProjectsSection"));
const ExperienceSection = lazy(() => import("./sections/ExperienceSection"));
const EducationSection = lazy(() => import("./sections/EducationSection"));
const HackathonsSection = lazy(() => import("./sections/HackathonsSection"));
const CertificatesSection = lazy(() => import("./sections/CertificatesSection"));
const ContactSection = lazy(() => import("./sections/ContactSection"));

const Home = () => {
  const featuredProjects = projects.slice(0, 4);
  const supportingProjects = projects.slice(4);

  return (
    <>
      <SEO
        description="Portfolio of Suhas B M — backend engineer and Solana builder focused on reliable APIs, on-chain systems, and product delivery."
        keywords="Suhas BM, backend engineer, Solana builder, Anchor, Rust, React, Flask, blockchain, portfolio"
        url="https://suhas-bm.vercel.app/"
      />
      <div className="space-y-24">
        <Suspense fallback={<div className="h-[70vh]" />}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<div className="h-32" />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<div className="h-32" />}>
          <ArticlesSection />
        </Suspense>
        <Suspense fallback={<div className="h-32" />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<div className="h-32" />}>
          <ProjectsSection projects={featuredProjects} otherProjects={supportingProjects} />
        </Suspense>
        <Suspense fallback={<div className="h-32" />}>
          <ExperienceSection />
        </Suspense>
        <Suspense fallback={<div className="h-32" />}>
          <EducationSection />
        </Suspense>
        <Suspense fallback={<div className="h-32" />}>
          <HackathonsSection />
        </Suspense>
        <Suspense fallback={<div className="h-32" />}>
          <CertificatesSection />
        </Suspense>
        <Suspense fallback={<div className="h-32" />}>
          <ContactSection />
        </Suspense>
      </div>
    </>
  );
};

export default Home;

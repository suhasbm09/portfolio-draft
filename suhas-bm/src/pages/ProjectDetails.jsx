import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "../data/portfolio";

const ProjectDetails = () => {
  const { projectKey } = useParams();
  const navigate = useNavigate();
  const project = projects.find((item) => item.key === projectKey);

  if (!project) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center gap-5 text-center">
        <p className="text-xs uppercase tracking-[0.5em] text-white/40">404</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white">Project not found</h1>
        <p className="max-w-xl text-white/60">The requested case study is not available in this portfolio.</p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
        >
          <FaArrowLeft /> Back
        </button>
      </div>
    );
  }

  const relatedProjects = projects.filter((item) => item.key !== project.key).slice(0, 3);

  return (
    <div className="space-y-16 py-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/75 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
      >
        <FaArrowLeft /> Back
      </button>

      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.45em] text-white/40">{project.category}</p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-white/68">{project.summary}</p>
          <p className="max-w-2xl text-base leading-7 text-white/58">{project.impact}</p>

          <div className="flex flex-wrap gap-3">
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                <FaGithub /> GitHub
              </a>
            )}
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950"
              >
                <FaExternalLinkAlt className="text-xs" /> Live demo
              </a>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">Stack</p>
              <p className="mt-2 text-sm leading-6 text-white/75">{project.stack.slice(0, 4).join(" • ")}</p>
            </div>
            <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">Type</p>
              <p className="mt-2 text-sm leading-6 text-white/75">Case study</p>
            </div>
            <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">Focus</p>
              <p className="mt-2 text-sm leading-6 text-white/75">Backend + Solana craft</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-2xl">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/50">
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="h-[28rem] w-full object-cover"
              />
            ) : (
              <div className="flex h-[28rem] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.1),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
                <p className="text-lg font-medium text-white/60">Visual preview not available</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl lg:col-span-1">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">Architecture</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">How the system is shaped</h2>
          <div className="mt-5 space-y-3">
            {project.architecture.map((item) => (
              <div key={item} className="rounded-[1.15rem] border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-white/70">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl lg:col-span-2">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">Outcomes</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">What this project proves</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {project.outcome.map((item) => (
              <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-7 text-white/72">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-white/72">
            The key design move was treating the product as a trustworthy workflow, not just a feature demo.
          </div>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">Stack</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Technologies used</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/58">
            {project.category} built with a stack chosen for speed of iteration and clarity of implementation.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.stack.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/75">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">More work</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Related case studies</h2>
          </div>
            <Link to="/" className="text-sm text-white/65 transition hover:text-white">
            Return home
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {relatedProjects.map((item) => (
            <Link
              key={item.key}
              to={`/project/${item.key}`}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.06]"
            >
                <p className="text-xs uppercase tracking-[0.35em] text-white/40">{item.category}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/62">{item.impact}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;

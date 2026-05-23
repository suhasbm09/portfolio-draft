import React from "react";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub, FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";

function ProjectCard({ proj }) {
  const [hasImage, setHasImage] = React.useState(true);
  const isFeatured = Boolean(proj.featured);

  return (
    <Motion.article
      layout
      whileHover={{ y: isFeatured ? -10 : -8 }}
      transition={{ type: "spring", stiffness: 240, damping: 24 }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-4xl border backdrop-blur-2xl transition duration-300 ${
        isFeatured
          ? "border-cyan-100/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.08),rgba(255,255,255,0.03))] hover:border-cyan-100/30 hover:bg-[linear-gradient(135deg,rgba(34,211,238,0.11),rgba(255,255,255,0.05))] lg:col-span-2"
          : "border-white/10 bg-white/2 hover:border-white/15 hover:bg-white/4"
      }`}
    >
      {hasImage && (
        <div className={`relative overflow-hidden bg-slate-950/50 ${isFeatured ? "h-64 md:h-72" : "h-52"}`}>
          <img
            src={proj.image ? proj.image : `/images/${proj.key}.png`}
            alt={`${proj.title} preview`}
            loading="lazy"
            className={`h-full w-full transition duration-700 group-hover:scale-105 ${isFeatured ? "object-contain p-4" : "object-cover"}`}
            onError={() => setHasImage(false)}
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/15 to-transparent" />
        </div>
      )}
      {!hasImage && (
        <div className={`flex items-end bg-[radial-gradient(circle_at_top_left,rgba(103,232,249,0.12),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.1),transparent_40%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 ${isFeatured ? "h-64 md:h-72" : "h-52"}`}>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/55">{proj.category}</p>
            <p className="mt-2 text-3xl font-bold text-white">{proj.title}</p>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-5 p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">{proj.category}</p>
            {isFeatured && (
              <span className="rounded-full border border-cyan-100/20 bg-cyan-100/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-cyan-100/80">
                Flagship build
              </span>
            )}
          </div>
          <h3 className={`font-semibold tracking-tight text-white ${isFeatured ? "text-3xl md:text-[2.35rem]" : "text-2xl"}`}>
            {proj.title}
          </h3>
        </div>

        <p className={`text-sm leading-7 text-white/68 ${isFeatured ? "md:text-base md:leading-8" : ""}`}>
          {proj.summary}
        </p>

        <div className="rounded-[1.25rem] border border-white/10 bg-white/2 p-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-100/60">Impact</p>
          <p className={`mt-2 font-medium leading-6 text-white/82 ${isFeatured ? "text-base md:text-lg md:leading-7" : "text-sm"}`}>
            {proj.impact}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {proj.stack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/3 px-3 py-1 text-xs font-medium text-white/76"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto space-y-4 pt-3">
          <div className="space-y-2">
            {proj.outcome.slice(0, 2).map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-white/70">
                <span className="theme-dot mt-2 h-2 w-2 rounded-full ring-1 ring-white/10" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 border-t border-white/5 pt-4">
            {proj.links?.github && (
              <a
                href={proj.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-white/20 hover:text-white"
              >
                <FaGithub />
                Code
              </a>
            )}
            {proj.links?.live && (
              <a
                href={proj.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-white/20 hover:text-white"
              >
                <FaExternalLinkAlt className="text-xs" />
                Live
              </a>
            )}
            <Link
              to={`/project/${proj.key}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              aria-label={`Read more about ${proj.title}`}
            >
              Case study
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </div>
    </Motion.article>
  );
}

export default ProjectCard; 
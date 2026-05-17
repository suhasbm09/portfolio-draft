import React from "react";
import { motion as Motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin } from "react-icons/fa";
import { brand, contact } from "../../data/portfolio";

const ContactSection = React.forwardRef((props, ref) => (
  <section
    id="contact"
    className="relative py-24"
    ref={ref}
  >
    <div className="relative mx-auto max-w-5xl px-4">
      <Motion.h2
        className="text-center text-4xl font-semibold tracking-tight text-white md:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Ready for backend and Solana conversations.
      </Motion.h2>
      <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-7 text-white/65">
        {contact.summary}
      </p>
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Motion.div
          className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl"
          whileHover={{ y: -4 }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/75">
            Direct line
          </div>
          <h3 className="mt-6 text-3xl font-semibold text-white">Open for roles, reviews, and focused collaborations.</h3>
          <p className="mt-4 max-w-xl text-white/65">If the work needs backend depth, Solana logic, or a product-minded finish, the conversation can start here.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a href={`mailto:${brand.email}`} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/20 hover:bg-white/[0.06]">
              <FaEnvelope className="text-2xl text-cyan-300" />
              <p className="mt-3 text-sm uppercase tracking-[0.35em] text-white/35">Email</p>
              <p className="mt-2 text-white/80">{brand.email}</p>
            </a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/20 hover:bg-white/[0.06]">
              <FaPhone className="text-2xl text-cyan-300" />
              <p className="mt-3 text-sm uppercase tracking-[0.35em] text-white/35">Phone</p>
              <p className="mt-2 text-white/80">{brand.phone}</p>
            </a>
          </div>
        </Motion.div>

        <Motion.div
          className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/50">
            Elsewhere
          </div>
          <h3 className="mt-6 text-2xl font-semibold text-white">Find the work, then the person behind it.</h3>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={brand.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-white/80 transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <FaGithub className="text-lg text-cyan-300" /> GitHub
            </a>
            <a
              href={brand.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-white/80 transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <FaLinkedin className="text-lg text-cyan-300" /> LinkedIn
            </a>
          </div>
        </Motion.div>
      </div>
    </div>
  </section>
));

export default ContactSection; 
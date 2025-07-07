import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin } from "react-icons/fa";

const ContactSection = React.forwardRef((props, ref) => (
  <section
    id="contact"
    className="relative py-24"
    ref={ref}
  >
    <div className="relative max-w-4xl mx-auto px-4">
      <motion.h2
        className="text-4xl font-semibold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span>
          Let's build something impactful
        </span>
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          className="group p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-cyan-400/20 \
            hover:border-cyan-400/50 transition-all duration-500
            hover:shadow-lg hover:shadow-cyan-500/20"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <FaEnvelope className="text-4xl text-cyan-400 mb-4 transform group-hover:rotate-12 transition-transform" />
          <h3 className="text-xl font-semibold text-cyan-200 mb-2">Email Me</h3>
          <a
            href="mailto:suhaasbm2004@gmail.com"
            className="text-white/70 hover:text-cyan-300 transition-colors block"
          >
            suhaasbm2004@gmail.com
          </a>
        </motion.div>
        <motion.div
          className="group p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-cyan-400/20 \
            hover:border-purple-400/50 transition-all duration-500
            hover:shadow-lg hover:shadow-purple-500/20"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <FaPhone className="text-4xl text-cyan-400 mb-4 transform group-hover:rotate-12 transition-transform" />
          <h3 className="text-xl font-semibold text-cyan-200 mb-2">Call Me</h3>
          <a
            href="tel:+919036751497"
            className="text-white/70 hover:text-cyan-300 transition-colors block"
          >
            +91 9036751497
          </a>
        </motion.div>
      </div>
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <a
          href="mailto:suhaasbm2004@gmail.com"
          className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium \
            rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 \
            hover:from-cyan-500 hover:to-purple-600 \
            text-white shadow-lg hover:shadow-cyan-500/25 \
            transition-all duration-300 transform hover:-translate-y-1"
        >
          Reach Out
          <FaEnvelope className="transform group-hover:rotate-12 transition-transform" />
        </a>
      </motion.div>
      {/* Social Links */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-cyan-200 mb-6">Connect With Me</h3>
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/suhasbm09"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 bg-black/40 backdrop-blur-xl rounded-full border border-cyan-400/20 \
              hover:border-cyan-400/50 transition-all duration-300
              hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-110"
          >
            <FaGithub className="text-2xl text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          </a>
          <a
            href="https://linkedin.com/in/suhasbm09"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 bg-black/40 backdrop-blur-xl rounded-full border border-cyan-400/20 \
              hover:border-cyan-400/50 transition-all duration-300
              hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-110"
          >
            <FaLinkedin className="text-2xl text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          </a>
        </div>
      </motion.div>
    </div>
  </section>
));

export default ContactSection; 
import React from "react";

const AboutSection = React.forwardRef((props, ref) => (
  <section id="about" className="py-24" ref={ref}>
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 px-4">
      {/* About Text */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">About Me</h2>
        <p className="text-white/80 text-lg leading-relaxed">
          I am a passionate full stack developer and blockchain enthusiast, dedicated to building impactful digital solutions. With a strong foundation in computer science and hands-on experience across web, AI, and decentralized technologies, I thrive on solving complex challenges and delivering production-ready products. I believe in continuous learning, collaboration, and pushing the boundaries of what technology can achieve.
        </p>
      </div>
      {/* Image Placeholder */}
      <div className="flex-1 flex justify-center md:justify-end">
        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-700 to-purple-800 flex items-center justify-center text-6xl font-bold text-white select-none shadow-lg border-4 border-cyan-400/30">
          SBM
        </div>
      </div>
    </div>
  </section>
));

export default AboutSection; 
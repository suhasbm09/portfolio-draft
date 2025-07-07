import React from "react";

const CertificatesSection = React.forwardRef((props, ref) => (
  <section id="certificates" className="py-24" ref={ref}>
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Certificates</h2>
      <div className="h-px bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-transparent my-8 w-24 mx-auto" />
      <p className="text-white/70 text-lg">Certificates will be displayed here soon!</p>
    </div>
  </section>
));

export default CertificatesSection; 
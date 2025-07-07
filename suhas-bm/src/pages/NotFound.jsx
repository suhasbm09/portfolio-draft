import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-black/90 text-white">
    <h1 className="text-6xl font-bold mb-4">404</h1>
    <p className="text-xl mb-6">Page Not Found</p>
    <Link to="/" className="px-6 py-2 rounded bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold shadow-lg hover:from-cyan-500 hover:to-purple-600 transition">Go Home</Link>
  </div>
);

export default NotFound; 
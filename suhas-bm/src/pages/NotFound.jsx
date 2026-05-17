import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center text-center">
    <p className="text-xs uppercase tracking-[0.5em] text-white/40">404</p>
    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white md:text-7xl">Page not found</h1>
    <p className="mt-4 max-w-xl text-white/60">The route you opened does not exist in this portfolio.</p>
    <Link to="/" className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950">
      Go home
    </Link>
  </div>
);

export default NotFound; 
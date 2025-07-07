// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ThemeBackground from "./ThemeBackground";

const Layout = () => {
  return (
    <div className="relative flex flex-col min-h-screen text-white/90 antialiased">
      {/* Global Background Layer */}
      <ThemeBackground />

      {/* Content Container with Dark Glass Effect */}
      <div className="relative flex flex-col min-h-screen">
        {/* Floating Header with Dark Glass Effect */}
        <div className="sticky top-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/5">
          <Header />
        </div>

        {/* Main Content */}
        <main className="relative flex-1 px-4 md:px-8 lg:px-16 py-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer with Dark Glass Effect */}
        {/* <div className="relative backdrop-blur-md bg-black/20 border-t border-white/5"> */}
          <Footer />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Layout;

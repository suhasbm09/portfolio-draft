// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ThemeBackground from "./ThemeBackground";

const Layout = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-white antialiased">
      <ThemeBackground />

      <Header />

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pt-10 pb-14 md:px-6 lg:px-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;

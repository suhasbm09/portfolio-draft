// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ThemeBackground from "./ThemeBackground";

const THEME_STORAGE_KEY = "portfolio-theme";

const Layout = () => {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    return window.localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark";
  });

  React.useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div
      data-theme={theme}
      className={`relative min-h-screen overflow-x-hidden antialiased transition-colors duration-500 ${
        theme === "light" ? "bg-[#f7faff] text-slate-900" : "text-white"
      }`}
    >
      <ThemeBackground theme={theme} />

      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className={`relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pt-10 pb-14 md:px-6 lg:px-8 ${theme === "light" ? "text-slate-900" : "text-white"}`}>
        <Outlet />
      </main>

      <Footer theme={theme} />
    </div>
  );
};

export default Layout;

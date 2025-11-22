import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlassToggle from "./Glasstoggle";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") ||
      (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const navigate = useNavigate();

  return (
    <nav
      className="
        backdrop-blur-sm border-b
        bg-[color:var(--bg)/80]
        text-[var(--text)]
        border-[color:var(--text)/20]
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {/* Logo / Brand */}
            <button
              onClick={() => navigate("/")}
              className="text-2xl font-bold text-[var(--text)]"
            >
              DAWS
            </button>

            {/* Navbar Links */}
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <Link
                to="/"
                className="px-3 py-2 text-[color:var(--text)/70] hover:text-[#f89f23]"
              >
                Home
              </Link>
              <Link
                to="/requirements"
                className="px-3 py-2 text-[color:var(--text)/70] hover:text-[#f89f23]"
              >
                Requirements
              </Link>
              <Link
                to="/planner"
                className="px-3 py-2 text-[color:var(--text)/70] hover:text-[#f89f23]"
              >
                Planner
              </Link>
              <Link
                to="/docs"
                className="px-3 py-2 text-[color:var(--text)/70] hover:text-[#f89f23]"
              >
                Docs
              </Link>
              <Link
                to="/assistant"
                className="px-3 py-2 text-[color:var(--text)/70] hover:text-[#f89f23]"
              >
                Dev Assistant
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* ⭐ GLASSMORPHISM TOGGLE ⭐ */}
            <GlassToggle theme={theme} toggleTheme={toggleTheme} />

            {/* Button */}
            <div className="hidden sm:flex items-center">
              <button className="px-4 py-2 rounded-md bg-[#f89f23] hover:bg-[#ffb647] text-black font-semibold">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

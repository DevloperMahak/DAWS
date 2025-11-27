import React from "react";
import { useStore } from "../store/useStore";

export default function GlassToggle() {
  const { theme, toggleTheme } = useStore();
  return (
    <div
      onClick={toggleTheme}
      className="relative w-28 h-10 rounded-full cursor-pointer select-none transition-all duration-500
        bg-white/20 dark:bg-[#ffffff0d]
        backdrop-blur-xl shadow-[0_0_25px_rgba(255,255,255,0.20)]
        border border-black/20 dark:border-white/10
        overflow-hidden"
    >
      {/* Label Text */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 text-sm font-semibold transition-all duration-500
          ${theme === "dark" ? "text-white left-4" : "text-black right-4"}`}
      >
        {theme === "dark" ? "Sleep" : "Work"}
      </div>

      {/* Neon Orb */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center 
          backdrop-blur-2xl transition-all duration-500
          ${
            theme === "dark"
              ? "bg-[rgba(138,43,226,0.8)] shadow-[0_0_20px_#9d4bff] right-2"
              : "bg-[rgba(255,180,0,0.85)] shadow-[0_0_20px_#ffc94d] left-2"
          }`}
      >
        {theme === "dark" ? (
          <span className="text-white text-2xl">🌙</span>
        ) : (
          <span className="text-white text-2xl">👤</span>
        )}
      </div>
    </div>
  );
}

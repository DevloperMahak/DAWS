import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  DocumentTextIcon,
  ClipboardListIcon,
  CogIcon,
  SparklesIcon,
  ChatAlt2Icon,
} from "./Icons";

const logoUrl =
  "/mnt/data/A_promotional_digital_graphic_design_showcases_DAW.png";

export default function Sidebar() {
  const items = [
    { key: "dashboard", label: "Dashboard", to: "/", icon: <HomeIcon /> },
    {
      key: "requirements",
      label: "Requirements",
      to: "/requirements",
      icon: <DocumentTextIcon />,
    },
    {
      key: "planner",
      label: "Planner",
      to: "/planner",
      icon: <ClipboardListIcon />,
    },
    { key: "docs", label: "Docs", to: "/docs", icon: <SparklesIcon /> },
    {
      key: "assistant",
      label: "Dev Assistant",
      to: "/assistant",
      icon: <ChatAlt2Icon />,
    },
    {
      key: "knowledge",
      label: "Knowledge",
      to: "/knowledge",
      icon: <DocumentTextIcon />,
    },
    { key: "settings", label: "Settings", to: "/settings", icon: <CogIcon /> },
  ];

  return (
    <aside
      className="
      flex-shrink-0 w-72 hidden md:flex flex-col gap-4 p-4
      transition-all duration-300
      bg-[var(--bg)] text-[var(--text)]
      border-r border-[color:var(--text)/20]
    "
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-2">
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
          <img
            src={logoUrl}
            alt="DAWS logo"
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <div className="text-lg font-bold text-gray-900 dark:text-[#e6edf3]">
            DAWS
          </div>
          <div className="text-xs text-gray-500 dark:text-[#8b949e]">
            AI Workspace
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="mt-4 flex-1">
        {items.map((it) => (
          <NavLink
            key={it.key}
            to={it.to}
            className={({ isActive }) =>
              `
  group flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-all duration-150

  ${
    isActive
      ? `
      bg-gradient-to-r from-[#8441A4]/20 to-[#FF5894]/20
      border-l-4 border-[#8441A4]
      text-[#FF5894]
      `
      : `
      text-gray-700 dark:text-[#cbd5e1] 
      hover:bg-white/5 dark:hover:bg-white/5
    `
  }
`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`
          w-6 h-6 
          ${isActive ? "text-[#FF5894]" : "text-gray-600 dark:text-[#8b949e]"}
          group-hover:text-[#FF5894]
        `}
                >
                  {it.icon}
                </span>

                <span className="text-sm font-medium">{it.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Project Box */}
      <div className="mt-auto px-2">
        <div className="text-xs text-gray-500 dark:text-[#8b949e] mb-2">
          Project
        </div>
        <div className="p-3 rounded-lg bg-white/5 dark:bg-white/3 text-sm text-gray-200">
          AskMyTutor Revamp
        </div>
      </div>
    </aside>
  );
}

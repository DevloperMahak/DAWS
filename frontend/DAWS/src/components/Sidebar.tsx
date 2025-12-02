import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  DocumentTextIcon,
  ClipboardListIcon,
  CogIcon,
  SparklesIcon,
  ChatAlt2Icon,
  FolderIcon,
} from "./Icons";

const logoUrl = "/mnt/data/05baf53b-2f6f-493c-98c4-608c939f5a14.png";

export default function Sidebar() {
  const mainItems = [
    { key: "dashboard", label: "Dashboard", to: "/", icon: <HomeIcon /> },
    {
      key: "projects",
      label: "My Projects (3)",
      to: "/projects",
      icon: <FolderIcon />,
    },
  ];

  const agentItems = [
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
  ];

  return (
    <aside
      className="
        fixed left-0 top-0 
        h-screen w-72 
        bg-[var(--bg)] text-[var(--text)]
        border-r border-[color:var(--text)/20]
        flex flex-col
      "
    >
      {/* TOP LOGO */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
          <img
            src={logoUrl}
            alt="DAWS logo"
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <div className="text-2xl font-bold text-[var(--text)]">
            <span className="bg-[linear-gradient(135deg,#8441A4,#FF5894)] bg-clip-text text-transparent">
              DAWS
            </span>
          </div>
          <div className="text-xs text-gray-500 dark:text-[#8b949e]">
            AI Workspace
          </div>
        </div>
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto px-3 custom-scrollbar">
        {/* MAIN ITEMS */}
        {mainItems.map((it) => (
          <NavLink
            key={it.key}
            to={it.to}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-all duration-150
               ${
                 isActive
                   ? "bg-gradient-to-r from-[#8441A4]/20 to-[#FF5894]/20 border-l-4 border-[#8441A4] text-[#FF5894]"
                   : "text-gray-700 dark:text-[#cbd5e1] hover:bg-white/5 dark:hover:bg-white/5"
               }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`w-6 h-6 ${
                    isActive
                      ? "text-[#FF5894]"
                      : "text-gray-600 dark:text-[#8b949e]"
                  } group-hover:text-[#FF5894]`}
                >
                  {it.icon}
                </span>
                <span className="text-sm font-medium">{it.label}</span>
              </>
            )}
          </NavLink>
        ))}

        {/* AI AGENTS HEADER */}
        <div className="text-xs text-gray-500 dark:text-[#8b949e] mt-4 mb-2 flex items-center justify-center">
          <span className="flex-grow border-t border-gray-500/40 mx-2"></span>
          AI AGENTS
          <span className="flex-grow border-t border-gray-500/40 mx-2"></span>
        </div>

        {/* AGENT ITEMS */}
        {agentItems.map((it) => (
          <NavLink
            key={it.key}
            to={it.to}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-all duration-150
               ${
                 isActive
                   ? "bg-gradient-to-r from-[#8441A4]/20 to-[#FF5894]/20 border-l-4 border-[#8441A4] text-[#FF5894]"
                   : "text-gray-700 dark:text-[#cbd5e1] hover:bg-white/5 dark:hover:bg-white/5"
               }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`w-6 h-6 ${
                    isActive
                      ? "text-[#FF5894]"
                      : "text-gray-600 dark:text-[#8b949e]"
                  } group-hover:text-[#FF5894]`}
                >
                  {it.icon}
                </span>
                <span className="text-sm font-medium">{it.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* BOTTOM FIXED BUTTONS */}
      <div className="p-3 border-t border-white/10 flex flex-col gap-2 bg-[var(--bg)]">
        <button className="w-full py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
          Export
        </button>
        <button className="w-full py-2 text-sm font-medium rounded-lg border border-gray-400 hover:bg-white/5 flex items-center justify-center gap-2 text-[var(--text)]">
          <CogIcon /> Settings
        </button>
      </div>
    </aside>
  );
}

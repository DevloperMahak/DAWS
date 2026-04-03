import React from "react";
import { useNavigate, useParams, useLocation, Outlet } from "react-router-dom";
import {
  FaClipboardList,
  FaProjectDiagram,
  FaFileAlt,
  FaRobot,
  FaBrain,
  FaArrowLeft,
  FaMagic,
} from "react-icons/fa";

type AgentTab = {
  key: string;
  label: string;
  icon: React.ReactNode;
  route: string;
  description: string;
};

export default function WorkspacePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const tabs: AgentTab[] = [
    {
      key: "autonomous-builder",
      label: "Autonomous Builder",
      icon: <FaMagic />,
      route: `/workspace/${id}/autonomous-builder`,
      description: "Generate complete project using LangGraph",
    },
    {
      key: "requirements",
      label: "Requirements",
      icon: <FaClipboardList />,
      route: `/workspace/${id}/requirements`,
      description: "Extract and refine requirements",
    },
    {
      key: "planner",
      label: "Planner",
      icon: <FaProjectDiagram />,
      route: `/workspace/${id}/planner`,
      description: "Break work into milestones & tasks",
    },
    {
      key: "docs",
      label: "Documentation",
      icon: <FaFileAlt />,
      route: `/workspace/${id}/docs`,
      description: "Generate PRD, API docs, user docs",
    },
    {
      key: "assistant",
      label: "Dev Assistant",
      icon: <FaRobot />,
      route: `/workspace/${id}/assistant`,
      description: "Code help, debugging & implementation",
    },
    {
      key: "knowledge",
      label: "Knowledge",
      icon: <FaBrain />,
      route: `/workspace/${id}/knowledge`,
      description: "Project memory, decisions & context",
    },
  ];

  const currentAgent = location.pathname.split("/")[3];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div
        className="rounded-2xl p-6 border shadow-md"
        style={{
          background: "var(--card-bg)",
          borderColor: "var(--card-border)",
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <button
              onClick={() => navigate("/projects")}
              className="mb-3 flex items-center gap-2 text-sm opacity-80 hover:opacity-100"
            >
              <FaArrowLeft /> Back to Projects
            </button>

            <h1 className="text-2xl md:text-3xl font-bold">
              🚀 Project Workspace #{id}
            </h1>
            <p className="mt-2 text-sm opacity-70 max-w-3xl leading-6">
              AI-powered project workspace with shared memory, multi-agent
              collaboration, and autonomous LangGraph workflows.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="px-4 py-2 rounded-xl bg-white/5 text-sm">
              4 Requirements
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 text-sm">
              7 Tasks
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 text-sm">
              2 Docs
            </div>
          </div>
        </div>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* LEFT PROJECT SIDEBAR */}
        <div className="xl:col-span-3">
          <div className="space-y-6 sticky top-6">
            {/* AGENTS */}
            <div
              className="rounded-2xl p-4 border"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--card-border)",
              }}
            >
              <h2 className="text-lg font-semibold mb-4">
                🤖 Workspace Agents
              </h2>

              <div className="space-y-3">
                {tabs.map((tab) => {
                  const active = currentAgent === tab.key;

                  return (
                    <button
                      key={tab.key}
                      onClick={() => navigate(tab.route)}
                      className="w-full text-left rounded-xl p-4 border transition-all duration-300 hover:scale-[1.01] group"
                      style={{
                        border: active
                          ? "1px solid transparent"
                          : "1px solid var(--card-border)",
                        background: active
                          ? "linear-gradient(var(--card-bg), var(--card-bg)) padding-box, linear-gradient(90deg, #8441A4, #FF5894) border-box"
                          : "var(--bg)",
                      }}
                    >
                      <div className="flex gap-3">
                        <div className="text-[#FF5894] text-lg mt-1 shrink-0">
                          {tab.icon}
                        </div>

                        <div className="min-w-0">
                          <h3
                            className={`
          font-semibold transition-all duration-300
          ${
            active
              ? "text-transparent bg-clip-text bg-gradient-to-r from-[#8441A4] to-[#FF5894]"
              : "group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#8441A4] group-hover:to-[#FF5894]"
          }
        `}
                          >
                            {tab.label}
                          </h3>

                          <p className="text-xs opacity-70 mt-1 leading-5 break-words">
                            {tab.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PROGRESS */}
            <div
              className="rounded-2xl border p-5"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--card-border)",
              }}
            >
              <h2 className="text-lg font-semibold mb-4">📈 Progress</h2>

              <div className="space-y-4 text-sm">
                {[
                  ["Requirements", "80%"],
                  ["Planning", "60%"],
                  ["Documentation", "30%"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1">
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#8441A4] to-[#FF5894]"
                        style={{ width: value }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MEMORY */}
            <div
              className="rounded-2xl border p-5"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--card-border)",
              }}
            >
              <h2 className="text-lg font-semibold mb-4">🧠 Shared Memory</h2>
              <div className="space-y-2 text-sm opacity-80">
                <p>• Authentication via JWT</p>
                <p>• Flutter + Node.js stack</p>
                <p>• MongoDB as primary DB</p>
                <p>• OCR + voice support</p>
              </div>
            </div>
          </div>
        </div>

        {/* LARGE OUTPUT CANVAS */}
        <div className="xl:col-span-9 min-w-0">
          <div
            className="rounded-2xl border p-6 min-h-[850px]"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--card-border)",
            }}
          >
            <h2 className="text-xl font-bold mb-3">
              ⚡ Active Agent Workspace
            </h2>

            <p className="text-sm opacity-70 mb-6">
              AI outputs, generated code, plans, docs, and autonomous workflow
              execution will appear here.
            </p>

            <div className="w-full overflow-x-auto">
              <Outlet />
            </div>

            {!currentAgent && (
              <div className="rounded-xl border border-dashed p-8 text-center opacity-70">
                Choose an agent to begin building inside this workspace.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { useNavigate, useParams, useLocation, Outlet } from "react-router-dom";
import {
  FaClipboardList,
  FaProjectDiagram,
  FaFileAlt,
  FaRobot,
  FaBrain,
  FaArrowLeft,
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

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6 space-y-6">
      {/* HEADER */}
      <div
        className="rounded-2xl p-6 border shadow-md"
        style={{
          background: "var(--card-bg)",
          borderColor: "var(--card-border)",
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <button
              onClick={() => navigate("/projects")}
              className="mb-3 flex items-center gap-2 text-sm opacity-80 hover:opacity-100"
            >
              <FaArrowLeft /> Back to Projects
            </button>

            <h1 className="text-3xl font-bold">🚀 Project Workspace #{id}</h1>
            <p className="mt-2 text-sm opacity-70">
              Your dedicated AI development environment where all agents share
              the same project memory, outputs, and progress.
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

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* LEFT AGENT NAV */}
        <div
          className="xl:col-span-1 rounded-2xl p-4 border h-fit"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--card-border)",
          }}
        >
          <h2 className="text-lg font-semibold mb-4">🤖 Workspace Agents</h2>

          <div className="space-y-3">
            {tabs.map((tab) => {
              const active = location.pathname.includes(`/${tab.key}`);

              return (
                <button
                  key={tab.key}
                  onClick={() => navigate(tab.route)}
                  className={`w-full text-left rounded-xl p-4 transition-all border ${
                    active ? "scale-[1.02]" : "hover:scale-[1.01]"
                  }`}
                  style={{
                    border: active
                      ? "1px solid transparent"
                      : "1px solid var(--card-border)",
                    background: active
                      ? "linear-gradient(var(--card-bg), var(--card-bg)) padding-box, linear-gradient(90deg, #8441A4, #FF5894) border-box"
                      : "var(--bg)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-xl mt-1 text-[#FF5894]">
                      {tab.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{tab.label}</h3>
                      <p className="text-xs opacity-70 mt-1">
                        {tab.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* CENTER WORKSPACE */}
        <div className="xl:col-span-2 space-y-6">
          <div
            className="rounded-2xl border p-6 min-h-[500px]"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--card-border)",
            }}
          >
            <h2 className="text-xl font-bold mb-3">
              ⚡ Active Agent Workspace
            </h2>
            <p className="text-sm opacity-70 mb-6">
              Select an agent from the left panel to start working on this
              project. All generated outputs remain synced to this workspace.
            </p>

            {/* Nested routed agent pages render here */}
            <Outlet />

            {!location.pathname.split("/")[3] && (
              <div className="rounded-xl border border-dashed p-8 text-center opacity-70">
                Choose an agent to begin building inside this workspace.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="xl:col-span-1 space-y-6">
          <div
            className="rounded-2xl border p-5"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--card-border)",
            }}
          >
            <h2 className="text-lg font-semibold mb-4">📈 Progress</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Requirements</span>
                <span>80%</span>
              </div>
              <div className="flex justify-between">
                <span>Planning</span>
                <span>60%</span>
              </div>
              <div className="flex justify-between">
                <span>Documentation</span>
                <span>30%</span>
              </div>
            </div>
          </div>

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
              <p>• OCR + voice supported inputs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // AUTO-REDIRECT LOGIC
  useEffect(() => {
    const user = localStorage.getItem("daws_user"); // we saved this after login

    if (!user) {
      navigate("/login"); // user not logged in → go to login page
    }
  }, [navigate]);

  return (
    <div className="space-y-16">
      {/* ===========================
          HERO SECTION
      ============================ */}
      <section
        className="max-w-6xl mx-auto 
        rounded-2xl shadow-md px-10 py-14 transition 
        border bg-[var(--bg)] text-[var(--text)] border-[color-mix(in_oklab,var(--text),transparent 80%)]"
      >
        <div className="md:flex md:items-center md:justify-between gap-10">
          {/* LEFT TEXT */}
          <div className="md:flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              <span className="bg-[linear-gradient(135deg,#8441A4,#FF5894)] bg-clip-text text-transparent">
                DAWS — Developer AI Workspace System
              </span>
            </h1>

            <p className="mt-5 text-lg opacity-80 max-w-2xl leading-relaxed">
              A unified multi-agent platform for requirements, planning,
              documentation, developer assistance, and knowledge workflows.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {/* GRADIENT BUTTON */}
              <Link
                to="/requirements"
                className="px-6 py-3 
                bg-gradient-to-r from-[#8441A4] to-[#FF5894] 
                hover:opacity-90
                text-white font-semibold rounded-lg transition shadow-sm"
              >
                Analyze Requirements
              </Link>

              {/* OUTLINE BUTTON */}
              <Link
                to="/assistant"
                className="px-6 py-3 border rounded-lg 
                border-[color-mix(in_oklab,var(--text),transparent 70%)]
                hover:bg-[color-mix(in_oklab,var(--text),transparent 90%)] 
                text-[var(--text)] transition"
              >
                Open Dev Assistant
              </Link>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="hidden md:block md:w-1/3">
            <div
              className="w-full h-56 rounded-2xl 
             bg-gradient-to-r from-[#8441A4] to-[#FF5894]
              border border-[color-mix(in_oklab,var(--text),transparent 80%)]
              flex items-center justify-center"
            >
              <div className="text-center text-white">
                <div className="text-xs uppercase tracking-wider opacity-80">
                  Demo Preview
                </div>
                <div className="mt-2 text-lg font-semibold">
                  Interactive Agent Workspace
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================
          FEATURES SECTION
      ============================ */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">What DAWS Can Do</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Requirements Agent",
              desc: "Upload PDFs and generate features, user stories & acceptance criteria automatically.",
            },
            {
              title: "Planning Agent",
              desc: "Auto-create sprints, milestones, and Gantt charts from requirements.",
            },
            {
              title: "Documentation Agent",
              desc: "Generate SRS, SDS, test cases, UML diagrams, and PPT slides.",
            },
            {
              title: "Developer Assistant",
              desc: "Ask for code generation, fixes, and refactors—within the workspace.",
            },
            {
              title: "Knowledge Workspace",
              desc: "NotebookLM-style memory for each project so agents have context.",
            },
            {
              title: "Multi-Agent Orchestrator",
              desc: "All agents coordinate to produce end-to-end deliverables.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-xl transition
              bg-[var(--bg)] text-[var(--text)]
              border border-[color-mix(in_oklab,var(--text),transparent 80%)]
              hover:border-[linear-gradient(135deg,#8441A4,#FF5894)]
              hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 opacity-80 text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===========================
          FOOTER
      ============================ */}
      <footer
        className="pt-10 text-center text-sm opacity-70 
        border-t border-[color-mix(in_oklab,var(--text),transparent 80%)]"
      >
        © {new Date().getFullYear()} DAWS — Built with ❤️ for Developers
      </footer>
    </div>
  );
}

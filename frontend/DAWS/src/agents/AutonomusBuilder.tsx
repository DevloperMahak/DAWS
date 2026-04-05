import { useMemo, useState } from "react";
import { runAutonomousBuilder } from "../utils/agentsApi";
import MindMapFlow from "../components/MindMapTree";

type WorkflowResult = {
  requirements?: string;
  mindmap?: {
    title: string;
    children?: any[];
  };
  devOutput?: string;
  documentation?: string;
  currentStep?: string;
};

type OutputTab =
  | "overview"
  | "requirements"
  | "mindmap"
  | "devOutput"
  | "documentation";

export default function AutonomousBuilderPage() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [workflowResult, setWorkflowResult] = useState<WorkflowResult | null>(
    null,
  );
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<OutputTab>("overview");

  const stages = useMemo(() => {
    const currentStep = workflowResult?.currentStep;

    return [
      {
        name: "Requirements",
        status:
          currentStep === "requirements_agent"
            ? "running"
            : workflowResult?.requirements
              ? "done"
              : "pending",
      },
      {
        name: "Planning Graph",
        status:
          currentStep === "planner_agent"
            ? "running"
            : workflowResult?.mindmap
              ? "done"
              : "pending",
      },
      {
        name: "Code Generation",
        status:
          currentStep === "dev_agent"
            ? "running"
            : workflowResult?.devOutput
              ? "done"
              : "pending",
      },
      {
        name: "Documentation",
        status:
          currentStep === "docs_agent"
            ? "running"
            : workflowResult?.documentation
              ? "done"
              : "pending",
      },
      {
        name: "Deployment",
        status: "pending",
      },
    ];
  }, [workflowResult]);

  const handleRunWorkflow = async () => {
    if (!projectName.trim() || !description.trim()) return;

    try {
      setLoading(true);
      setLogs(["🚀 Starting autonomous workflow..."]);
      setWorkflowResult(null);
      setActiveTab("overview");

      const { data } = await runAutonomousBuilder({
        projectName,
        description,
      });
      console.log("🔥 Workflow API Response:", data);
      setWorkflowResult(data.data);

      setLogs([
        "✔ Requirements completed",
        "✔ Planning completed",
        "✔ Development completed",
        "✔ Documentation completed",
        "🎉 Workflow finished successfully",
      ]);
    } catch (error) {
      console.error("Workflow failed:", error);
      setLogs(["❌ Workflow execution failed"]);
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    if (!workflowResult) {
      return (
        <div className="opacity-70 text-sm">
          Run the workflow to see generated outputs.
        </div>
      );
    }

    // ✅ Overview tab
    if (activeTab === "overview") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {workflowResult.requirements && (
            <ResultCard
              title="📋 Requirements"
              content={workflowResult.requirements}
            />
          )}

          {/* ✅ Planning agent exact same mindmap */}
          {/* ✅ Planning agent exact same mindmap */}
          {workflowResult.mindmap && (
            <div
              className="lg:col-span-2 rounded-2xl border overflow-hidden"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--card-border)",
                height: "600px",
                width: "100%",
              }}
            >
              <MindMapFlow data={workflowResult.mindmap} />
            </div>
          )}

          {workflowResult.devOutput && (
            <ResultCard
              title="💻 Development"
              content={workflowResult.devOutput}
            />
          )}

          {workflowResult.documentation && (
            <ResultCard
              title="📄 Documentation"
              content={workflowResult.documentation}
            />
          )}
        </div>
      );
    }

    // ✅ Mindmap tab special rendering
    if (activeTab === "mindmap" && workflowResult.mindmap) {
      return (
        <div
          className="rounded-2xl border overflow-hidden"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--card-border)",
            height: "650px",
            width: "100%",
          }}
        >
          <MindMapFlow data={workflowResult.mindmap} />
        </div>
      );
    }

    // ✅ Other tabs normal output
    const content =
      activeTab === "requirements"
        ? workflowResult.requirements
        : activeTab === "devOutput"
          ? workflowResult.devOutput
          : workflowResult.documentation;

    return (
      <div
        className="rounded-2xl border p-5"
        style={{
          background: "var(--card-bg)",
          borderColor: "var(--card-border)",
        }}
      >
        <pre
          className="rounded-xl p-4 overflow-auto text-sm max-h-[500px] whitespace-pre-wrap"
          style={{ background: "black", color: "lime" }}
        >
          {content || "No output available"}
        </pre>
      </div>
    );
  };

  const tabs: { key: OutputTab; label: string }[] = [
    { key: "overview", label: "📦 Overview" },
    { key: "requirements", label: "📋 Requirements" },
    { key: "mindmap", label: "🧠 Mindmap" },
    { key: "devOutput", label: "💻 Code" },
    { key: "documentation", label: "📄 Docs" },
  ];

  return (
    <div
      className="min-h-screen p-4 md:p-6 space-y-6 overflow-x-hidden"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* HEADER */}
      <div
        className="rounded-2xl border p-6 shadow-md"
        style={{
          background: "var(--card-bg)",
          borderColor: "var(--card-border)",
        }}
      >
        <h1 className="text-3xl font-bold">🤖 Autonomous Builder</h1>
        <p className="text-sm opacity-70 mt-2">
          End-to-end AI workflow orchestration powered by LangGraph.
        </p>
      </div>

      {/* INPUT */}
      <div
        className="rounded-2xl border p-6 space-y-4"
        style={{
          background: "var(--card-bg)",
          borderColor: "var(--card-border)",
        }}
      >
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project name"
          className="w-full p-3 rounded-xl outline-none"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--card-border)",
          }}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your project..."
          className="w-full p-4 rounded-xl min-h-[120px] outline-none resize-none"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--card-border)",
          }}
        />

        <button
          onClick={handleRunWorkflow}
          disabled={loading}
          className="px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-[#8441A4] to-[#FF5894]"
        >
          {loading ? "Running Workflow..." : "🚀 Run Full Autonomous Build"}
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* PIPELINE */}
        <div
          className="xl:col-span-2 rounded-2xl border p-6"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--card-border)",
          }}
        >
          <h2 className="text-xl font-semibold mb-5">⚡ Workflow Pipeline</h2>

          <div className="space-y-4">
            {stages.map((stage, index) => (
              <div
                key={index}
                className="rounded-xl p-4 border flex items-center justify-between"
                style={{
                  background: "var(--bg)",
                  borderColor: "var(--card-border)",
                }}
              >
                <span className="font-medium">{stage.name}</span>
                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background:
                      stage.status === "done"
                        ? "rgba(34,197,94,0.15)"
                        : stage.status === "running"
                          ? "rgba(249,115,22,0.15)"
                          : "rgba(255,255,255,0.08)",
                  }}
                >
                  {stage.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* LOGS */}
        <div
          className="rounded-2xl border p-5"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--card-border)",
          }}
        >
          <h2 className="text-lg font-semibold mb-4">📡 Live Agent Logs</h2>
          <div
            className="rounded-xl p-4 text-sm max-h-[350px] overflow-y-auto"
            style={{ background: "black", color: "lime" }}
          >
            {logs.length === 0 ? (
              <p>No logs yet...</p>
            ) : (
              logs.map((log, i) => <p key={i}>{log}</p>)
            )}
          </div>
        </div>
      </div>

      {/* OUTPUT TABS */}
      <div
        className="rounded-2xl border p-6 overflow-hidden"
        style={{
          background: "var(--card-bg)",
          borderColor: "var(--card-border)",
        }}
      >
        <h2 className="text-xl font-semibold mb-5">📦 Workflow Output</h2>

        <div className="flex flex-wrap gap-3 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                activeTab === tab.key ? "text-white" : "opacity-80"
              }`}
              style={{
                background:
                  activeTab === tab.key
                    ? "linear-gradient(90deg, #8441A4, #FF5894)"
                    : "var(--bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
}

function ResultCard({ title, content }: { title: string; content: string }) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <h3 className="font-semibold mb-3">{title}</h3>
      <pre
        className="rounded-xl p-4 overflow-auto text-sm max-h-[300px] whitespace-pre-wrap"
        style={{ background: "black", color: "lime" }}
      >
        {content}
      </pre>
    </div>
  );
}

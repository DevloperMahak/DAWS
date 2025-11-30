import React, { useState } from "react";

export default function PlannerAgent() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("mindmap");

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:5000/agents/planning", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal: input }),
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ error: "Something went wrong. Try again." });
    }

    setLoading(false);
  };

  const tabs = [
    { id: "mindmap", label: "🧩 Mindmap" },
    { id: "breakdown", label: "📌 Breakdown" },
    { id: "architecture", label: "🏛 Architecture" },
    { id: "tasks", label: "📝 Tasks" },
    { id: "milestones", label: "🚀 Milestones" },
  ];

  const renderTabContent = () => {
    if (!result) return null;

    const data = result[activeTab];
    if (!data) return <p className="text-gray-400">No data available</p>;

    return (
      <pre className="p-4 bg-black text-green-400 rounded-lg overflow-auto max-h-[400px] whitespace-pre-wrap">
        {typeof data === "string" ? data : JSON.stringify(data, null, 2)}
      </pre>
    );
  };

  return (
    <div
      className="min-h-screen px-6 py-10"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          🧠 NotebookLM-Style Planner Agent
        </h1>

        <p className="mb-8 text-gray-600 dark:text-gray-400">
          AI will generate a <strong>multi-tab project plan</strong> including
          mindmap, architecture, tasks, and more.
        </p>

        {/* Input Box */}
        <div
          className="rounded-xl p-6 shadow-lg border border-gray-300 dark:border-gray-700"
          style={{ background: "var(--bg2)" }}
        >
          <label className="text-lg font-medium">Enter Project Goal</label>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Example: Build an AI-powered developer workspace…"
            className="w-full mt-3 p-4 rounded-lg border 
              border-gray-300 dark:border-gray-700 
              focus:outline-none focus:ring-2 focus:ring-orange-500 h-32"
            style={{ background: "var(--bg)", color: "var(--text)" }}
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-4 w-full md:w-auto px-6 py-3 rounded-lg 
              bg-orange-500 hover:bg-orange-600 disabled:opacity-50 
              font-semibold text-black"
          >
            {loading ? "Generating..." : "Generate AI Plan"}
          </button>
        </div>

        {/* Tabs + Output */}
        {result && (
          <div
            className="mt-8 rounded-xl p-6 shadow-lg border border-gray-300 dark:border-gray-700"
            style={{ background: "var(--bg2)" }}
          >
            <h2 className="text-xl font-semibold mb-4">📄 AI Generated Plan</h2>

            {/* Tab Buttons */}
            <div className="flex space-x-3 border-b border-gray-700 pb-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-t-lg font-medium ${
                    activeTab === tab.id
                      ? "bg-orange-500 text-black"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content for selected tab */}
            <div className="mt-4">{renderTabContent()}</div>
          </div>
        )}
      </div>
    </div>
  );
}

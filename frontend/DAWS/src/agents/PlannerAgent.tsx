import React, { useState } from "react";

export default function PlannerAgent() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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
          AI will generate a{" "}
          <strong>NotebookLM-style complete project plan</strong> including
          mindmap, architecture, tasks, and milestones.
        </p>

        {/* Input Card */}
        <div
          className="rounded-xl p-6 shadow-lg border border-gray-300 dark:border-gray-700"
          style={{ background: "var(--bg2)" }}
        >
          <label className="text-lg font-medium">
            Enter Project Goal / Feature
          </label>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Example: Build an AI-powered developer workspace for planning, documentation & execution…"
            className="w-full mt-3 p-4 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 h-32"
            style={{ background: "var(--bg)", color: "var(--text)" }}
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-4 w-full md:w-auto px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-50 font-semibold text-black"
          >
            {loading ? "Generating..." : "Generate AI Plan"}
          </button>
        </div>

        {/* Output Card */}
        {result && (
          <div
            className="mt-8 rounded-xl p-6 shadow-lg border border-gray-300 dark:border-gray-700 whitespace-pre-wrap"
            style={{ background: "var(--bg2)" }}
          >
            <h2 className="text-xl font-semibold mb-3">📄 AI Generated Plan</h2>

            {result.error && <p className="text-red-500">{result.error}</p>}

            {result.mindmap && (
              <>
                <h3 className="text-lg font-bold mt-4">🧩 Mindmap</h3>
                <pre className="p-3 bg-black text-green-400 rounded-lg">
                  {result.mindmap}
                </pre>
              </>
            )}

            {result.breakdown && (
              <>
                <h3 className="text-lg font-bold mt-4">📌 Breakdown</h3>
                <div>{result.breakdown}</div>
              </>
            )}

            {result.architecture && (
              <>
                <h3 className="text-lg font-bold mt-4">
                  🏛 Technical Architecture
                </h3>
                <div>{result.architecture}</div>
              </>
            )}

            {result.tasks && (
              <>
                <h3 className="text-lg font-bold mt-4">📝 Task Breakdown</h3>
                <div>{result.tasks}</div>
              </>
            )}

            {result.milestones && (
              <>
                <h3 className="text-lg font-bold mt-4">🚀 Milestones</h3>
                <div>{result.milestones}</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

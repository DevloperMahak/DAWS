import React, { useState } from "react";

export default function PlannerAgent() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setResult(`
📌 **AI-Generated Planning Breakdown**

**User Goal:** ${input}

### 🎯 Step 1: Identify Requirements  
AI breaks down your idea into functional + non-functional requirements.

### 🛠 Step 2: Technical Architecture  
Stack, UI/UX flow, backend needs, APIs, database, agents, etc.

### 📋 Step 3: Task Breakdown  
Features → User Stories → Subtasks → Timeline.

### 🚀 Step 4: Delivery Plan  
Milestones + deadlines + team assignment.

(Backend integration will return a real dynamic plan.)
      `);
      setLoading(false);
    }, 1500);
  };

  return (
    <div
      className="min-h-screen px-6 py-10"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">🧠 Planner Agent</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Convert your idea or requirement into a{" "}
          <strong>structured plan</strong>, including tasks, architecture,
          milestones, timelines, and dependencies.
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
            {loading ? "Generating..." : "Generate Plan"}
          </button>
        </div>

        {/* Output Card */}
        {result && (
          <div
            className="mt-8 rounded-xl p-6 shadow-lg border border-gray-300 dark:border-gray-700 whitespace-pre-wrap"
            style={{ background: "var(--bg2)" }}
          >
            <h2 className="text-xl font-semibold mb-3">📄 Generated Plan</h2>
            <div style={{ color: "var(--text)" }}>{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}

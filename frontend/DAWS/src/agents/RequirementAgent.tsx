import React, { useState } from "react";

export default function RequirementsAgent() {
  const [model, setModel] = useState("gpt-4");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleExtract = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResult("");

    // 🔥 Mock API response – you will replace this with your own backend later
    setTimeout(() => {
      setResult(`
🔹 **Functional Requirements**
- The system must allow users to upload project documents.
- It should auto-extract user stories and features.
- Output must be structured in markdown format.

🔹 **Non-Functional Requirements**
- Fast extraction (under 5 seconds)
- Clean UI and easy to use
- Dark & Light theme support
`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-[#e6edf3]">
          Requirements Extraction Agent
        </h1>
        <p className="text-sm text-gray-600 dark:text-[#8b949e]">
          Paste project description and extract features, user stories &
          acceptance criteria.
        </p>
      </div>

      {/* Model Selector */}
      <div className="flex items-center gap-4">
        <label className="text-sm text-gray-700 dark:text-gray-300 font-medium">
          Select AI Model:
        </label>

        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="px-4 py-2 rounded-md bg-white dark:bg-[#161b22] 
          text-gray-800 dark:text-gray-200 border border-gray-300 
          dark:border-gray-700 focus:outline-none"
        >
          <option value="gpt-4">ChatGPT (GPT-4)</option>
          <option value="gpt-4o">ChatGPT (GPT-4o)</option>
          <option value="gemini-1.5">Gemini 1.5 Pro</option>
          <option value="claude-3">Claude 3 Opus</option>
          <option value="groq-mixtral">Groq Mixtral 8x7B</option>
        </select>
      </div>

      {/* Input Box */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Project Description / Requirements Document
        </label>

        <textarea
          rows={8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#161b22] 
          text-gray-800 dark:text-gray-200 border border-gray-300 
          dark:border-gray-700 focus:outline-none resize-none"
          placeholder="Paste your project idea or document here..."
        />
      </div>

      {/* Action Button */}
      <button
        onClick={handleExtract}
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-[#f89f23] hover:bg-[#ffb647] text-black 
        font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Extracting..." : "Extract Requirements"}
      </button>

      {/* Output Panel */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-[#e6edf3] mb-2">
          Output
        </h2>

        <div
          className="min-h-[180px] p-4 rounded-xl bg-gray-50 dark:bg-[#0d1117] 
        border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 whitespace-pre-line"
        >
          {loading ? (
            <div className="animate-pulse text-gray-500 dark:text-gray-400">
              Processing…
            </div>
          ) : result ? (
            result
          ) : (
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Output will appear here…
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { docsAgent } from "../utils/agentsApi";

export default function DocumentationAgent() {
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("summary");
  const [output, setOutput] = useState("");

  const generateDoc = async () => {
    if (!input.trim()) return;

    setOutput("⏳ Generating documentation...");

    try {
      const { data } = await docsAgent(input, "gemini-2.5-pro");
      setOutput(data.result || "No documentation generated.");
    } catch (err) {
      console.error("DocsAgent Error:", err);
      setOutput("❌ Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6 transition-colors duration-300">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">Documentation Agent</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* ---------- Sidebar ---------- */}
        <aside
          className="p-4 rounded-xl shadow-sm"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <h2 className="font-semibold mb-3">Sections</h2>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer hover:text-blue-500">📄 Summary</li>
            <li className="cursor-pointer hover:text-blue-500">📝 Steps</li>
            <li className="cursor-pointer hover:text-blue-500">🔧 Code</li>
            <li className="cursor-pointer hover:text-blue-500">💡 Examples</li>
          </ul>
        </aside>

        {/* ---------- Main Content ---------- */}
        <main className="md:col-span-3 space-y-6">
          {/* Input Box */}
          <div
            className="p-5 rounded-xl shadow-sm"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
            }}
          >
            <label className="text-sm font-medium">
              Enter text to generate documentation:
            </label>

            <textarea
              className="w-full mt-2 p-3 rounded-lg outline-none"
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Explain your function, component, or feature…"
              style={{
                background: "var(--input-bg)",
                color: "var(--text)",
                border: "1px solid var(--card-border)",
              }}
            />

            <button
              onClick={generateDoc}
              className="mt-3 px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Generate
            </button>
          </div>

          {/* ---------- Output Section ---------- */}
          {output && (
            <div
              className="p-5 rounded-xl shadow-sm"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              {/* Tabs */}
              <div
                className="flex gap-3 border-b pb-2"
                style={{ borderColor: "var(--card-border)" }}
              >
                {["summary", "steps", "code", "examples"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`capitalize px-3 py-1 rounded-lg text-sm ${
                      activeTab === tab
                        ? "bg-blue-600 text-white"
                        : "hover:opacity-70"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Output Box */}
              <div
                className="mt-4 p-4 rounded-lg whitespace-pre-wrap"
                style={{
                  background: "var(--output-bg)",
                  color: "var(--text)",
                  border: "1px solid var(--card-border)",
                }}
              >
                {activeTab === "summary" && <p>{output}</p>}
                {activeTab === "steps" && <p>• Step-by-step details…</p>}
                {activeTab === "code" && (
                  <pre className="text-sm">
                    📌 Generated code example coming here…
                  </pre>
                )}
                {activeTab === "examples" && <p>• Example usage…</p>}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

import React, { useState } from "react";

export default function DevAssistantAgent() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [tab, setTab] = useState("response");

  const generateResponse = () => {
    if (!input.trim()) return;

    setOutput(`
🧠 **AI Developer Assistant Response**

You asked:  
${input}

✨ This is placeholder output.  
Backend AI will replace this with real explanations, debugging, optimization, and code fixes.
    `);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6 transition-all duration-300">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-4">💻 Developer Assistant</h1>
        <p className="text-sm opacity-70 mb-8">
          Ask anything related to debugging, code explanation, optimization, or
          development help.
        </p>

        {/* INPUT BOX */}
        <div
          className="p-5 rounded-xl shadow-sm mb-8"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <label className="text-sm font-medium">
            Enter your code or question:
          </label>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Example: Why is my React component re-rendering infinitely?"
            rows={5}
            className="w-full mt-3 p-3 rounded-lg outline-none text-sm"
            style={{
              background: "var(--input-bg)",
              color: "var(--text)",
              border: "1px solid var(--card-border)",
            }}
          />

          <button
            onClick={generateResponse}
            className="mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Generate Response
          </button>
        </div>

        {/* OUTPUT SECTION */}
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
              className="flex gap-3 border-b pb-3"
              style={{ borderColor: "var(--card-border)" }}
            >
              {["response", "fixes", "optimized", "explain"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`capitalize px-3 py-1 text-sm rounded-lg ${
                    tab === t ? "bg-blue-600 text-white" : "hover:opacity-70"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Output Content */}
            <div
              className="mt-4 p-4 rounded-lg whitespace-pre-wrap text-sm"
              style={{
                background: "var(--output-bg)",
                border: "1px solid var(--card-border)",
                color: "var(--text)",
              }}
            >
              {tab === "response" && <p>{output}</p>}
              {tab === "fixes" && (
                <p>🔧 AI-generated code fixes will appear here…</p>
              )}
              {tab === "optimized" && (
                <p>⚡ Optimized code suggestions will appear here…</p>
              )}
              {tab === "explain" && (
                <p>📘 AI explanation of your code will appear here…</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

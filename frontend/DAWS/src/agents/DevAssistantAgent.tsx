import React, { useState } from "react";
import { devChatAgent } from "../utils/agentsApi"; // <-- your API

export default function DevAssistantAgent() {
  const [input, setInput] = useState("");
  const [tab, setTab] = useState("response");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    response: "",
    fixes: "",
    optimized: "",
    explain: "",
  });

  const generateResponse = async () => {
    if (!input.trim()) return;

    setLoading(true);

    try {
      const res = await devChatAgent(input);
      const ai = res.data?.data || "No output";

      // BASIC SPLITTING INTO TABS
      setData({
        response: ai,
        fixes:
          "🔧 Extracting fixes:\n" + ai.replace(/```/g, "") || "No fixes found",
        optimized:
          "⚡ Optimized version:\n" + ai.replace(/```/g, "") ||
          "No optimization found",
        explain: "📘 Explanation:\n" + ai || "No explanation found",
      });
    } catch (err) {
      setData({
        response: "❌ Server error. Check backend.",
        fixes: "",
        optimized: "",
        explain: "",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6 transition-all duration-300">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-4">💻 Developer Assistant</h1>
        <p className="text-sm opacity-70 mb-8">
          Ask anything about debugging, optimization, code fixes, or development
          help.
        </p>

        {/* INPUT CARD */}
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
            disabled={loading}
            className="mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Response"}
          </button>
        </div>

        {/* OUTPUT SECTION */}
        {data.response && (
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
              {tab === "response" && <p>{data.response}</p>}
              {tab === "fixes" && <p>{data.fixes}</p>}
              {tab === "optimized" && <p>{data.optimized}</p>}
              {tab === "explain" && <p>{data.explain}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

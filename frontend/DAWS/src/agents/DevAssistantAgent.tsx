import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { devChatAgent } from "../utils/agentsApi";

export default function DevAssistantAgent() {
  const { id: projectId } = useParams();

  const [input, setInput] = useState("");
  const [tab, setTab] = useState("response");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    response: "",
    fixes: "",
    optimized: "",
    explain: "",
  });

  const gradientCardStyle = {
    border: "2px solid transparent",
    background:
      "linear-gradient(var(--card-bg), var(--card-bg)) padding-box, linear-gradient(90deg, #8441A4, #FF5894) border-box",
  };

  const generateResponse = async () => {
    if (!input.trim()) return;

    setLoading(true);

    try {
      const res = await devChatAgent({
        input,
        projectId,
      });

      const ai = res.data?.data || "No output";

      setData({
        response: ai,
        fixes: "🔧 Suggested fixes:\n" + ai.replace(/```/g, ""),
        optimized: "⚡ Optimized version:\n" + ai.replace(/```/g, ""),
        explain: "📘 Explanation:\n" + ai,
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
        <div
          className="mb-6 p-5 rounded-xl shadow-sm"
          style={gradientCardStyle}
        >
          <h1 className="text-3xl font-bold mb-2">💻 Developer Assistant</h1>
          <p className="text-sm opacity-70">
            Ask anything about debugging, optimization, code fixes, or
            development help.
          </p>
        </div>

        {/* INPUT CARD */}
        <div
          className="p-5 rounded-xl shadow-sm mb-8"
          style={gradientCardStyle}
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
            className="mt-4 px-6 py-2 rounded-lg text-white transition disabled:opacity-50
            bg-gradient-to-r from-[#8441A4] to-[#FF5894]"
          >
            {loading ? "Generating..." : "Generate Response"}
          </button>
        </div>

        {/* OUTPUT SECTION */}
        {data.response && (
          <div className="p-5 rounded-xl shadow-sm" style={gradientCardStyle}>
            {/* Tabs */}
            <div
              className="flex gap-3 border-b pb-3"
              style={{ borderColor: "var(--card-border)" }}
            >
              {["response", "fixes", "optimized", "explain"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`capitalize px-3 py-1 text-sm rounded-lg transition ${
                    tab === t
                      ? "bg-gradient-to-r from-[#8441A4] to-[#FF5894] text-white"
                      : "hover:opacity-70"
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

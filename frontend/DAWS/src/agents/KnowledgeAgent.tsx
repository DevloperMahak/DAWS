import React, { useState } from "react";
import { knowledgeAgent } from "../utils/agentsApi";
import { FiSearch } from "react-icons/fi";
import { useParams } from "react-router-dom";

export default function KnowledgeAgent() {
  const { id: projectId } = useParams();
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await knowledgeAgent(query, projectId as string);
      const data = res.data?.data || "No response";
      setResponse(data);
    } catch (err) {
      setResponse("❌ Server error. Check backend.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6 transition-all duration-300">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div
          className="p-6 rounded-2xl shadow-md mb-6"
          style={{
            border: "2px solid transparent",
            background:
              "linear-gradient(var(--card-bg), var(--card-bg)) padding-box, linear-gradient(90deg, #8441A4, #FF5894) border-box",
          }}
        >
          <h1 className="text-3xl font-bold">📚 Knowledge Agent</h1>
          <p className="mt-2 opacity-70 text-sm">
            Ask anything — concepts, summaries, research, explanations, and
            technical learning.
          </p>
        </div>

        {/* INPUT CARD */}
        <div
          className="p-5 rounded-2xl shadow-sm"
          style={{
            border: "2px solid transparent",
            background:
              "linear-gradient(var(--card-bg), var(--card-bg)) padding-box, linear-gradient(90deg, #8441A4, #FF5894) border-box",
          }}
        >
          <label className="text-sm font-medium">
            Enter topic, question, or concept
          </label>

          <div className="flex gap-3 mt-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Example: Explain multi-agent architecture in simple words"
              className="flex-1 p-3 rounded-lg outline-none text-sm"
              style={{
                background: "var(--input-bg)",
                color: "var(--text)",
                border: "1px solid var(--card-border)",
              }}
            />

            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-5 rounded-lg text-white transition disabled:opacity-50
              bg-gradient-to-r from-[#8441A4] to-[#FF5894]"
            >
              {loading ? "Searching..." : <FiSearch size={18} />}
            </button>
          </div>
        </div>

        {/* OUTPUT */}
        {response && (
          <div
            className="mt-8 p-6 rounded-2xl shadow-sm whitespace-pre-wrap text-sm"
            style={{
              border: "2px solid transparent",
              background:
                "linear-gradient(var(--card-bg), var(--card-bg)) padding-box, linear-gradient(90deg, #8441A4, #FF5894) border-box",
              color: "var(--text)",
            }}
          >
            <h2 className="text-lg font-semibold mb-3">
              🧠 AI Knowledge Response
            </h2>

            <div
              className="p-4 rounded-xl"
              style={{
                background: "var(--output-bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              {response}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

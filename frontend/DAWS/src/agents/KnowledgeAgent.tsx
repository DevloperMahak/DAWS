import React, { useState } from "react";

export default function KnowledgeAgent() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);

    // placeholder response
    setTimeout(() => {
      setResponse(`
🔍 **AI Knowledge Search Result**

**Query:** ${query}

### 📘 Summary  
AI provides a condensed understanding of the topic.

### 🧠 Explanation  
Detailed breakdown with easy explanation.

### 📚 Extra Knowledge  
Related terms, background concepts, and real-world examples.

(Backend will generate real responses.)
      `);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6 transition-all duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">📚 Knowledge Agent</h1>
        <p className="mb-8 opacity-70">
          Ask anything — the AI agent will provide summaries, explanations,
          facts, and related information.
        </p>

        {/* Input Card */}
        <div
          className="p-5 rounded-xl shadow-sm border"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--card-border)",
          }}
        >
          <label className="text-sm font-medium">
            Enter topic, question, or concept
          </label>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Example: Explain quantum computing in simple words"
            className="w-full mt-3 p-3 rounded-lg outline-none text-sm"
            style={{
              background: "var(--input-bg)",
              color: "var(--text)",
              border: "1px solid var(--card-border)",
            }}
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className="mt-4 px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Output */}
        {response && (
          <div
            className="mt-8 p-6 rounded-xl shadow-sm border whitespace-pre-wrap text-sm"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--card-border)",
              color: "var(--text)",
            }}
          >
            {response}
          </div>
        )}
      </div>
    </div>
  );
}

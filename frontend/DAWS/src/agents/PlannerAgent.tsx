import React, { useState, useEffect } from "react";
import { a2aMessage, fetchInbox } from "../utils/agentsApi";

export default function PlannerAgent() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("mindmap");
  const [inbox, setInbox] = useState([]);

  // NEW → A2A manual message UI
  const [outgoingMsg, setOutgoingMsg] = useState("");

  useEffect(() => {
    loadInbox();
  }, []);

  const loadInbox = async () => {
    const res = await fetchInbox("planner");
    setInbox(res || []);
  };

  const sendA2AMessage = async () => {
    if (!outgoingMsg.trim()) return;

    await a2aMessage({
      from: "planner",
      to: "requirements",
      message: outgoingMsg,
    });
    await loadInbox();
    setOutgoingMsg("");
    alert("Message sent to Requirements Agent!");
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        "https://daws-backend.onrender.com/agents/planning",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ goal: input }),
        }
      );

      const data = await res.json();
      setResult(data);

      await a2aMessage({
        from: "planner",
        to: "requirements",
        message: data.breakdown || "New plan generated",
      });
    } catch (e) {
      setResult({ error: "Something went wrong" });
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
    return (
      <pre className="p-4 bg-black text-green-400 rounded-lg max-h-[400px] overflow-auto">
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
        <h1 className="text-3xl font-bold mb-4">🧠 Planner Agent</h1>

        {/* INPUT BOX */}
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

        {/* TABS */}
        {result && (
          <div
            className="mt-6 p-6 rounded-xl shadow-lg"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
            }}
          >
            <div className="flex space-x-3 border-b pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-t-lg ${
                    activeTab === tab.id
                      ? "bg-yellow-500 text-black"
                      : "opacity-60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-4">{renderTabContent()}</div>
          </div>
        )}

        {/* SEND MESSAGE TO REQUIREMENTS AGENT */}
        <div
          className="mt-6 p-5 rounded-xl"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <h2 className="text-xl font-bold mb-3">
            📤 Send Message to Requirements Agent
          </h2>

          <textarea
            className="w-full p-3 rounded-lg border"
            style={{
              background: "var(--input-bg)",
              borderColor: "var(--card-border)",
              color: "var(--text)",
            }}
            placeholder="Type message…"
            value={outgoingMsg}
            onChange={(e) => setOutgoingMsg(e.target.value)}
          />

          <button
            onClick={sendA2AMessage}
            className="mt-3 px-4 py-2 bg-yellow-500 rounded-lg text-black font-semibold"
          >
            Send Message
          </button>
        </div>

        {/* INBOX */}
        <div
          className="mt-6 p-5 rounded-xl"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <h2 className="text-xl font-bold mb-3">
            📩 Messages From Requirements Agent
          </h2>

          {inbox.length === 0 && <p>No messages yet</p>}

          {inbox.map((msg, i) => (
            <div
              key={i}
              className="p-3 mb-2 rounded-lg"
              style={{
                background: "var(--input-bg)",
                border: "1px solid var(--card-border)",
              }}
            >
              {msg.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

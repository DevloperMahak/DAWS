import React, { useState, useEffect } from "react";
import { a2aMessage, fetchInbox } from "../utils/agentsApi";
import { useParams } from "react-router-dom";

type PlanResult = {
  mindmap?: string;
  breakdown?: string;
  architecture?: string;
  tasks?: string;
  milestones?: string;
  error?: string;
};

export default function PlannerAgent() {
  const { id: projectId } = useParams();

  const [input, setInput] = useState("");
  const [result, setResult] = useState<PlanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("mindmap");
  const [inbox, setInbox] = useState<any[]>([]);
  const [outgoingMsg, setOutgoingMsg] = useState("");

  const loadInbox = async () => {
    const res = await fetchInbox("planner", projectId);
    setInbox(res || []);
  };

  useEffect(() => {
    if (projectId) {
      loadInbox();
    }
  }, [projectId]);

  const sendA2AMessage = async () => {
    if (!outgoingMsg.trim()) return;

    await a2aMessage({
      projectId,
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
          body: JSON.stringify({
            goal: input,
            projectId,
          }),
        },
      );

      const data = await res.json();
      setResult(data);

      await a2aMessage({
        projectId,
        from: "planner",
        to: "requirements",
        message: data.breakdown || "New plan generated",
      });

      await loadInbox();
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

    const data = result[activeTab as keyof PlanResult];

    return (
      <pre
        className="p-4 rounded-lg max-h-[400px] overflow-auto"
        style={{
          background: "black",
          color: "lime",
          fontSize: "0.9rem",
        }}
      >
        {typeof data === "string" ? data : JSON.stringify(data, null, 2)}
      </pre>
    );
  };

  return (
    <div
      className="min-h-screen px-6 py-10"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div
          className="p-6 rounded-2xl shadow-md mb-6"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <h1 className="text-3xl font-bold">🧠 Planner Agent</h1>
          <p className="opacity-70 mt-2">
            Convert requirements into architecture, tasks, and milestones
          </p>
        </div>

        {/* INPUT BOX */}
        <div
          className="rounded-2xl p-6 shadow-lg"
          style={{
            border: "2px solid transparent",
            background:
              "linear-gradient(var(--card-bg), var(--card-bg)) padding-box, linear-gradient(90deg, #8441A4, #FF5894) border-box",
          }}
        >
          <label className="text-lg font-medium">Enter Project Goal</label>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Example: Build an AI-powered developer workspace…"
            className="w-full mt-3 p-4 rounded-lg h-32 outline-none"
            style={{
              background: "var(--bg)",
              color: "var(--text)",
              border: "1px solid var(--card-border)",
            }}
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-4 px-6 py-3 rounded-lg font-semibold text-white
            bg-gradient-to-r from-[#8441A4] to-[#FF5894]"
          >
            {loading ? "Generating..." : "🚀 Generate AI Plan"}
          </button>
        </div>

        {/* TABS */}
        {result && (
          <div
            className="mt-6 p-6 rounded-2xl shadow-lg"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
            }}
          >
            <div className="flex flex-wrap gap-3 border-b pb-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg transition ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#8441A4] to-[#FF5894] text-white"
                      : "opacity-70"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-4">{renderTabContent()}</div>
          </div>
        )}

        {/* SEND MESSAGE */}
        <div
          className="mt-6 p-6 rounded-2xl"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <h2 className="text-xl font-bold mb-3">
            📤 Send Message to Requirements Agent
          </h2>

          <textarea
            className="w-full p-3 rounded-lg"
            style={{
              background: "var(--bg)",
              border: "1px solid var(--card-border)",
              color: "var(--text)",
            }}
            placeholder="Type message…"
            value={outgoingMsg}
            onChange={(e) => setOutgoingMsg(e.target.value)}
          />

          <button
            onClick={sendA2AMessage}
            className="mt-3 px-4 py-2 rounded-lg text-white font-semibold
            bg-gradient-to-r from-[#8441A4] to-[#FF5894]"
          >
            Send Message
          </button>
        </div>

        {/* INBOX */}
        <div
          className="mt-6 p-6 rounded-2xl"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <h2 className="text-xl font-bold mb-3">
            📩 Messages From Requirements Agent
          </h2>

          {inbox.length === 0 && <p className="opacity-70">No messages yet</p>}

          {inbox.map((msg, i) => (
            <div
              key={i}
              className="p-3 mb-2 rounded-lg"
              style={{
                background: "var(--bg)",
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

import React, { useState, useEffect } from "react";
import { a2aMessage, fetchInbox } from "../utils/agentsApi";
import { useParams } from "react-router-dom";
import MindMapFlow from "../components/MindMapTree";
import NotebookMindMap from "../components/NotebookMindMap";

type MindMapNode = {
  title: string;
  children?: MindMapNode[];
};

type PlanResult = {
  mindmap?: MindMapNode;
  breakdown?: {
    summary?: string;
    requirements?: string;
    nonFunctional?: string;
  };
  architecture?: {
    frontend?: string;
    backend?: string;
    database?: string;
    APIs?: string;
    systemDiagram?: string;
  };
  tasks?: string[];
  milestones?: string[];
  error?: string;
};

type InboxMessage = {
  from: string;
  to?: string;
  message: string;
  projectId?: string;
  timestamp?: number;
};

export default function PlannerAgent() {
  const { id: projectId } = useParams<{ id: string }>();

  const [input, setInput] = useState("");
  const [result, setResult] = useState<PlanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<keyof PlanResult>("mindmap");
  const [inbox, setInbox] = useState<InboxMessage[]>([]);
  const [outgoingMsg, setOutgoingMsg] = useState("");

  const loadInbox = async () => {
    try {
      const res = await fetchInbox("planner", projectId);
      const messages = Array.isArray(res) ? res : [];
      setInbox(messages);

      // ✅ Auto use latest requirements message
      if (messages.length > 0 && !input) {
        const latestMessage = messages[messages.length - 1];
        setInput(latestMessage.message);
      }
    } catch (error) {
      console.error("Inbox load failed:", error);
    }
  };

  useEffect(() => {
    if (projectId) {
      loadInbox();
    }
  }, [projectId]);

  const sendA2AMessage = async () => {
    if (!outgoingMsg.trim()) return;

    try {
      await a2aMessage({
        projectId,
        from: "planner",
        to: "requirements",
        message: outgoingMsg,
      });

      await loadInbox();
      setOutgoingMsg("");
      alert("Message sent to Requirements Agent!");
    } catch (error) {
      console.error("Message send failed:", error);
    }
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      setResult(null);

      const res = await fetch(
        //"https://daws-backend.onrender.com/agents/planning",
        "http://localhost:5000/agents/planning",
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
      console.log("Planner Response:", data);

      if (!res.ok) {
        setResult({
          error: data.error || "Planner failed",
        });
        return;
      }

      setResult(data);

      await a2aMessage({
        projectId,
        from: "planner",
        to: "requirements",
        message:
          typeof data.breakdown === "object"
            ? data.breakdown.summary || "New plan generated"
            : "New plan generated",
      });

      await loadInbox();
    } catch (error) {
      console.error("Planner error:", error);
      setResult({
        error: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const tabs: { id: keyof PlanResult; label: string }[] = [
    { id: "mindmap", label: "🧩 Mindmap" },
    { id: "breakdown", label: "📌 Breakdown" },
    { id: "architecture", label: "🏛 Architecture" },
    { id: "tasks", label: "📝 Tasks" },
    { id: "milestones", label: "🚀 Milestones" },
  ];

  const renderTabContent = () => {
    if (!result) return null;

    // ✅ Mindmap Tab
    if (activeTab === "mindmap") {
      console.log("Mindmap Data:", result.mindmap);
      const mapData = result.mindmap;

      if (!mapData) {
        return <div className="p-4 opacity-70">No mindmap generated yet</div>;
      }

      return (
        <div
          className="rounded-xl overflow-hidden"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--card-border)",
            height: "500px",
          }}
        >
          <MindMapFlow
            data={
              result.mindmap || {
                title: "No Data",
                children: [],
              }
            }
          />
        </div>
      );
    }

    const data = result[activeTab];

    if (!data) {
      return (
        <div className="p-4 opacity-70">No {activeTab} data available</div>
      );
    }

    return (
      <pre
        className="p-4 rounded-lg max-h-[400px] overflow-auto"
        style={{
          background: "#0f172a",
          color: "#22c55e",
          fontSize: "0.9rem",
        }}
      >
        {JSON.stringify(data, null, 2)}
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

import React, { useState, useEffect } from "react";
import { a2aMessage, reqAgent, fetchInbox } from "../utils/agentsApi";
import { FiMic, FiUpload } from "react-icons/fi";
import { useParams } from "react-router-dom";

type InboxMessage = {
  message: string;
};

type RequirementItem = {
  id: string;
  title: string;
  type: string;
  priority: string;
  status: string;
  createdAt: string;
};

export default function RequirementsAgent() {
  const [model] = useState("gemini-1.5-pro");
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [requirementsList, setRequirementsList] = useState<RequirementItem[]>(
    [],
  );
  const [outgoingMsg, setOutgoingMsg] = useState("");
  const [inbox, setInbox] = useState<InboxMessage[]>([]);
  const [listening, setListening] = useState(false);

  const { id: projectId } = useParams();

  // -------------------------------
  // Load project-specific inbox
  // -------------------------------
  const loadInbox = async () => {
    try {
      const res = await fetchInbox("requirements", projectId);
      setInbox(res || []);
    } catch (error) {
      console.error("Inbox load failed:", error);
    }
  };

  useEffect(() => {
    loadInbox();
  }, [projectId]);

  // -------------------------------
  // Voice input
  // -------------------------------
  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support voice input");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("");

      setInput(transcript);
    };

    recognition.onerror = (err: any) => {
      console.error(err);
      setListening(false);
    };

    recognition.onend = () => setListening(false);

    recognition.start();
  };

  // -------------------------------
  // Extract requirements
  // -------------------------------
  const handleExtract = async () => {
    if (!input.trim() && !file) return;

    setLoading(true);
    setResult("");

    try {
      const fd = new FormData();
      fd.append("text", input);
      fd.append("model", model);
      fd.append("projectId", projectId || "");

      if (file) fd.append("file", file);

      const response = await reqAgent(fd);
      const extractedResult = response.data.result;

      setResult(extractedResult);

      // Auto-send to planner agent
      await a2aMessage({
        projectId,
        from: "requirements",
        to: "planner",
        message: extractedResult,
      });

      setRequirementsList((prev) => [
        ...prev,
        {
          id: `REQ-${(prev.length + 1).toString().padStart(3, "0")}`,
          title: extractedResult.slice(0, 60),
          type: "Functional",
          priority: "Medium",
          status: "Draft",
          createdAt: new Date().toLocaleDateString(),
        },
      ]);

      await loadInbox();
    } catch (error) {
      console.error(error);
      setResult("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // File input handling
  // -------------------------------
  const extractTextFromFile = async (selectedFile: File) => {
    const ext = selectedFile.name.split(".").pop()?.toLowerCase();

    try {
      const form = new FormData();
      form.append("file", selectedFile);
      form.append("projectId", projectId || "");

      if (["png", "jpg", "jpeg"].includes(ext || "")) {
        form.append("ocr", "true");
      } else if (ext === "pdf") {
        form.append("pdf_to_text", "true");
      } else if (["mp3", "wav", "m4a"].includes(ext || "")) {
        form.append("stt", "true");
      } else {
        alert("File format not supported");
        return;
      }

      const res = await reqAgent(form);
      setInput(res.data.text || "");
    } catch (error) {
      console.error("File processing failed:", error);
    }
  };

  // -------------------------------
  // Manual A2A messaging
  // -------------------------------
  const sendA2AMessage = async () => {
    if (!outgoingMsg.trim()) return;

    try {
      await a2aMessage({
        projectId,
        from: "requirements",
        to: "planner",
        message: outgoingMsg,
      });

      await loadInbox();
      setOutgoingMsg("");
      alert("Message sent!");
    } catch (error) {
      console.error("Send failed:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6">
      {/* HEADER */}
      <div className="p-6 rounded-2xl shadow-md bg-[var(--card-bg)] text-[var(--text)] border border-[color-mix(in_oklab,var(--text),transparent_80%)]">
        <h1 className="text-2xl font-bold">📝 Requirements Agent</h1>
        <p className="text-sm opacity-70 mt-1">
          Project Workspace ID: {projectId}
        </p>
      </div>

      {/* INPUT AREA */}
      <div className="p-6 rounded-2xl space-y-4 bg-[var(--card-bg)] text-[var(--text)] border border-[color-mix(in_oklab,var(--text),transparent_80%)]">
        <label className="font-semibold">Describe your requirement:</label>

        <div className="flex items-center w-full p-3 rounded-lg space-x-3 bg-[var(--bg)] border border-[color-mix(in_oklab,var(--text),transparent_50%)]">
          <textarea
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Explain your requirement…"
            className="w-full resize-none bg-transparent outline-none text-sm"
          />

          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*,audio/*,.pdf"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;

                setFile(f);
                await extractTextFromFile(f);
              }}
            />
            <FiUpload size={22} className="opacity-80 hover:opacity-100" />
          </label>

          <FiMic
            size={22}
            style={{
              color: listening ? "red" : "var(--text)",
              opacity: 0.85,
              cursor: "pointer",
            }}
            onClick={handleVoiceInput}
          />
        </div>

        <button
          onClick={handleExtract}
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-[#8441A4] to-[#FF5894] text-white"
        >
          {loading ? "Extracting…" : "🤖 Extract Requirements"}
        </button>
      </div>

      {/* OUTPUT */}
      <div
        className="mt-6 p-6 rounded-xl shadow-lg"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
        }}
      >
        <h2 className="text-xl font-bold mb-3">📤 Extracted Requirements</h2>

        <pre className="p-4 rounded-lg max-h-[400px] overflow-auto bg-black text-lime-400 text-sm">
          {loading ? "Processing..." : result || "Output will appear here…"}
        </pre>
      </div>

      {/* SEND MESSAGE */}
      <div className="p-6 rounded-2xl bg-[var(--card-bg)] text-[var(--text)] border border-[color-mix(in_oklab,var(--text),transparent_80%)]">
        <h2 className="text-xl font-bold mb-2">
          📤 Send Message to Planner Agent
        </h2>

        <textarea
          className="w-full p-3 rounded-lg border bg-[var(--bg)]"
          placeholder="Type message…"
          value={outgoingMsg}
          onChange={(e) => setOutgoingMsg(e.target.value)}
        />

        <button
          onClick={sendA2AMessage}
          className="mt-3 px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-[#8441A4] to-[#FF5894] text-white"
        >
          Send Message
        </button>
      </div>

      {/* INBOX */}
      <div className="p-6 rounded-2xl bg-[var(--card-bg)] text-[var(--text)] border border-[color-mix(in_oklab,var(--text),transparent_80%)]">
        <h2 className="text-xl font-bold mb-2">
          📩 Messages From Planner Agent
        </h2>

        {inbox.length === 0 ? (
          <p className="opacity-70 text-sm">No messages received yet.</p>
        ) : (
          inbox.map((msg, i) => (
            <div key={i} className="p-3 mb-2 rounded-lg bg-[var(--bg)] border">
              {msg.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

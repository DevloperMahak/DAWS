import React, { useState, useEffect } from "react";
import { a2aMessage, reqAgent, fetchInbox } from "../utils/agentsApi";
import { FiMic, FiUpload } from "react-icons/fi";

export default function RequirementsAgent() {
  const [model, setModel] = useState("gemini-1.5-pro");
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);
  const [outgoingMsg, setOutgoingMsg] = useState("");
  const [inbox, setInbox] = useState([]);
  const [listening, setListening] = useState(false);

  const loadInbox = async () => {
    const res = await fetchInbox("requirements");
    setInbox(res || []);
  };

  useEffect(() => {
    loadInbox();
  }, []);

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

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setInput(transcript);
    };

    recognition.onerror = (err) => {
      console.error(err);
      setListening(false);
    };

    recognition.onend = () => setListening(false);

    recognition.start();
  };

  const handleExtract = async () => {
    if (!input.trim() && !file) return;

    setLoading(true);
    setResult("");

    try {
      const fd = new FormData();
      fd.append("text", input);
      fd.append("model", model);
      if (file) fd.append("file", file);

      const response = await reqAgent(fd);
      setResult(response.data.result);

      await a2aMessage({
        from: "requirements",
        to: "planner",
        message: response.data.result,
      });

      setRequirementsList((prev) => [
        ...prev,
        {
          id: `REQ-${(prev.length + 1).toString().padStart(3, "0")}`,
          title: response.data.result.slice(0, 60),
          type: "Functional",
          priority: "Medium",
          status: "Draft",
          createdAt: new Date().toLocaleDateString(),
        },
      ]);
    } catch {
      setResult("❌ Something went wrong");
    }

    setLoading(false);
  };

  const extractTextFromFile = async (file: File) => {
    const ext = file.name.split(".").pop().toLowerCase();

    if (["png", "jpg", "jpeg"].includes(ext)) {
      // IMAGE → OCR
      const form = new FormData();
      form.append("file", file);
      form.append("ocr", "true");

      const res = await reqAgent(form);
      setInput(res.data.text || "");
    } else if (ext === "pdf") {
      // PDF → TEXT
      const form = new FormData();
      form.append("file", file);
      form.append("pdf_to_text", "true");

      const res = await reqAgent(form);
      setInput(res.data.text || "");
    } else if (["mp3", "wav", "m4a"].includes(ext)) {
      // AUDIO → SPEECH-TO-TEXT
      const form = new FormData();
      form.append("file", file);
      form.append("stt", "true");

      const res = await reqAgent(form);
      setInput(res.data.text || "");
    } else {
      alert("File format not supported");
    }
  };

  const sendA2AMessage = async () => {
    if (!outgoingMsg.trim()) return;

    await a2aMessage({
      from: "requirements",
      to: "planner",
      message: outgoingMsg,
    });

    await loadInbox();
    setOutgoingMsg("");
    alert("Message sent!");
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6">
      {/* HEADER */}
      <div
        className="p-6 rounded-2xl shadow-md transition
        bg-[var(--card-bg)] text-[var(--text)]
        border border-[color-mix(in_oklab,var(--text),transparent 80%)]"
      >
        <h1 className="text-2xl font-bold">📝 Requirements Agent</h1>
      </div>

      {/* INPUT AREA */}
      <div
        className="p-6 rounded-2xl space-y-4 transition
        bg-[var(--card-bg)] text-[var(--text)]
        border border-[color-mix(in_oklab,var(--text),transparent 80%)]"
      >
        <label className="font-semibold">Describe your requirement:</label>

        <div
          className="flex items-center w-full p-3 rounded-lg space-x-3 transition
          bg-[var(--bg)] border border-[color-mix(in_oklab,var(--text),transparent 50%)]"
        >
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
              accept="image/*,audio/*"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files[0];
                setFile(f);
                if (f) await extractTextFromFile(f);
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
              transition: "0.2s ease",
            }}
            onClick={handleVoiceInput}
            className="hover:opacity-100"
          />
        </div>

        <button
          onClick={handleExtract}
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold
          bg-gradient-to-r from-[#8441A4] to-[#FF5894] text-white transition"
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

        <pre
          className="p-4 rounded-lg max-h-[400px] overflow-auto"
          style={{
            background: "black",
            color: "lime",
            fontSize: "0.9rem",
          }}
        >
          {loading
            ? "Processing..."
            : result
            ? result
            : "Output will appear here…"}
        </pre>
      </div>

      {/* SEND MESSAGE */}
      <div
        className="p-6 rounded-2xl transition
        bg-[var(--card-bg)] text-[var(--text)]
        border border-[color-mix(in_oklab,var(--text),transparent 80%)]"
      >
        <h2 className="text-xl font-bold mb-2">
          📤 Send Message to Planner Agent
        </h2>

        <textarea
          className="w-full p-3 rounded-lg border
          bg-[var(--bg)] text-[var(--text)]
          border-[color-mix(in_oklab,var(--text),transparent 50%)]"
          placeholder="Type message…"
          value={outgoingMsg}
          onChange={(e) => setOutgoingMsg(e.target.value)}
        />

        <button
          onClick={sendA2AMessage}
          className="mt-3 px-4 py-2 rounded-lg font-semibold
          bg-gradient-to-r from-[#8441A4] to-[#FF5894] text-white transition"
        >
          Send Message
        </button>
      </div>

      {/* INBOX */}
      <div
        className="p-6 rounded-2xl transition
        bg-[var(--card-bg)] text-[var(--text)]
        border border-[color-mix(in_oklab,var(--text),transparent 80%)]"
      >
        <h2 className="text-xl font-bold mb-2">
          📩 Messages From Planner Agent
        </h2>

        {inbox.length === 0 && (
          <p className="opacity-70 text-sm">No messages received yet.</p>
        )}

        {inbox.map((msg, i) => (
          <div
            key={i}
            className="p-3 mb-2 rounded-lg transition
            bg-[var(--bg)] text-[var(--text)]
            border border-[color-mix(in_oklab,var(--text),transparent 50%)]"
          >
            {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState, useRef } from "react";
import { reqAgent } from "../utils/agentsApi";

export default function RequirementsAgent() {
  const [model, setModel] = useState("gemini-1.5-pro");
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);

  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);

  // 🎤 Start Audio Recording
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    mediaRecorderRef.current = recorder;

    const audioChunks = [];

    recorder.ondataavailable = (e) => audioChunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: "audio/mp3" });
      setAudioBlob(blob);
    };

    recorder.start();
    setRecording(true);
  };

  // 🎤 Stop Recording
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  // 📤 Submit to Backend
  const handleExtract = async () => {
    if (!input.trim() && !file && !audioBlob) return;

    setLoading(true);
    setResult("");

    try {
      const fd = new FormData();
      fd.append("text", input);
      fd.append("model", model);

      if (file) fd.append("file", file);
      if (audioBlob) fd.append("file", audioBlob);

      const response = await reqAgent(fd);

      setResult(response.data.result);

      // Append requirement into list
      setRequirementsList((prev) => [
        ...prev,
        {
          id: `REQ-${(prev.length + 1).toString().padStart(3, "0")}`,
          title: response.data.result.slice(0, 50) + "...",
          type: "Functional",
          priority: "Medium",
          status: "Draft",
          createdAt: new Date().toLocaleDateString(),
        },
      ]);
    } catch (err) {
      console.error(err);
      setResult("❌ Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen p-6 transition-all"
      style={{ background: "var(--bg)", color: "var(--text)" }}
    >
      {/* Header */}
      <div
        className="p-4 rounded-lg shadow-md"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
        }}
      >
        <h1 className="text-2xl font-bold flex justify-between">
          📝 Multimodal Requirements Agent
          <span className="text-sm opacity-70">AI Workspace</span>
        </h1>
      </div>

      {/* Input Section */}
      <div
        className="mt-4 p-5 rounded-xl space-y-4"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
        }}
      >
        <label className="font-semibold">Describe your requirement:</label>

        {/* ChatGPT Style Input Bar */}
        <div
          className="flex items-center w-full p-3 rounded-lg"
          style={{
            background: "var(--input-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <textarea
            rows={3}
            placeholder="Explain your requirement…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full resize-none bg-transparent outline-none text-sm"
            style={{ color: "var(--text)" }}
          />

          {/* File Upload Icon */}
          <label className="cursor-pointer ml-3">
            <input
              type="file"
              accept="image/*,audio/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <span className="text-xl opacity-80 hover:opacity-100">📎</span>
          </label>

          {/* Voice Input Icon */}
          {!recording ? (
            <button
              onClick={startRecording}
              className="ml-3 text-xl opacity-80 hover:opacity-100"
            >
              🎤
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="ml-3 text-xl opacity-80 hover:opacity-100 text-red-500"
            >
              ⏹
            </button>
          )}
        </div>

        {/* Audio Preview */}
        {audioBlob && (
          <audio
            controls
            src={URL.createObjectURL(audioBlob)}
            className="mt-2 w-full"
          ></audio>
        )}

        {/* Model Selector */}
        <div>
          <label className="font-semibold">AI Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="ml-2 px-3 py-2 rounded-md"
            style={{
              background: "var(--input-bg)",
              border: "1px solid var(--card-border)",
              color: "var(--text)",
            }}
          >
            <option value="gemini-1.5-flash">gemini-1.5-flash</option>
            <option value="gemini-1.5-pro">gemini-1.5-pro</option>
          </select>
        </div>

        {/* Extract Button */}
        <button
          onClick={handleExtract}
          disabled={loading}
          className="w-full py-3 rounded-md font-semibold bg-yellow-500 text-black mt-2"
        >
          {loading ? "Extracting…" : "🤖 Extract Requirements"}
        </button>
      </div>

      {/* Output Box */}
      <div
        className="mt-4 p-4 rounded-xl whitespace-pre-line"
        style={{
          minHeight: 120,
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
        }}
      >
        {loading ? "Processing…" : result || "Output will appear here…"}
      </div>

      {/* Requirements List */}
      <div
        className="mt-6 p-4 rounded-xl"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
        }}
      >
        <h2 className="text-xl font-bold mb-3">📋 Extracted Requirements</h2>

        {requirementsList.map((req) => (
          <div
            key={req.id}
            className="p-3 rounded-md mb-2"
            style={{
              background: "var(--input-bg)",
              border: "1px solid var(--card-border)",
            }}
          >
            <div className="font-semibold">
              {req.id} — {req.priority}
            </div>
            <div className="opacity-80">{req.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

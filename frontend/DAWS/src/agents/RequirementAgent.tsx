import React, { useState } from "react";
import { reqAgent } from "../utils/agentsApi";

export default function RequirementsAgent() {
  const [model, setModel] = useState("gemini-1.5-pro");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [requirementsList, setRequirementsList] = useState([
    {
      id: "REQ-001",
      title: "User authentication with email and social login",
      type: "Functional",
      priority: "Critical",
      status: "Approved",
      createdAt: "Jan 15",
    },
    // Add more sample items here
  ]);

  const handleExtract = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const response = await reqAgent({ text: input, model: model });
      setResult(response.data.result || "No output received.");
      // Optionally add extracted requirement to the list
      setRequirementsList((prev) => [
        ...prev,
        {
          id: `REQ-${(prev.length + 1).toString().padStart(3, "0")}`,
          title: response.data.result || "New Requirement",
          type: "Functional",
          priority: "Medium",
          status: "Draft",
          createdAt: new Date().toLocaleDateString(),
        },
      ]);
    } catch (error: any) {
      console.error("Error extracting requirements:", error);
      setResult("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div className="bg-[#1f2937] text-white px-4 py-2 rounded-t-lg">
        <h1 className="text-xl font-bold flex justify-between">
          📝 Requirements Agent
          <span className="text-sm font-normal">AI Workspace</span>
        </h1>
      </div>

      {/* Input Box */}
      <div className="border border-gray-400 rounded-lg p-4 space-y-3 bg-[#111827] text-white">
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Describe your requirement:
          </label>
          <textarea
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 rounded-md bg-[#1f2937] border border-gray-600 text-white focus:outline-none resize-none"
            placeholder="I need users to be able to checkout with multiple payment methods..."
          />
        </div>

        {/* Model Selector */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">AI Model:</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="px-3 py-1 rounded-md bg-[#1f2937] text-white border border-gray-600 focus:outline-none"
          >
            <option value="gemini-1.5-flash">gemini-1.5-flash</option>
            <option value="gemini-1.5-pro">gemini-1.5-pro</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <button
            onClick={handleExtract}
            disabled={loading}
            className="px-4 py-2 bg-[#f89f23] hover:bg-[#ffb647] text-black font-semibold rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Extracting..." : "🤖 AI Parse"}
          </button>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md">
            💾 Save Draft
          </button>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-md">
            ✅ Add to Project
          </button>
        </div>
      </div>

      {/* Output Box */}
      <div className="bg-[#111827] border border-gray-600 rounded-lg p-4 text-white min-h-[120px] whitespace-pre-line">
        {loading ? (
          <div className="animate-pulse text-gray-400">Processing…</div>
        ) : result ? (
          result
        ) : (
          <div className="text-gray-400 text-sm">Output will appear here…</div>
        )}
      </div>

      {/* Requirements List */}
      <div className="bg-[#1f2937] rounded-lg p-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-300">
          <span>Filters: [All] [Functional] [Technical] [Business]</span>
          <span>Priority: [All] [Critical] [High] [Medium] [Low]</span>
          <span>Status: [All] [Draft] [Approved] [Implemented]</span>
        </div>

        <div className="space-y-2 mt-2">
          {requirementsList.map((req) => (
            <div
              key={req.id}
              className="border border-gray-600 rounded-md p-3 bg-[#111827] hover:bg-[#1e293b] transition"
            >
              <div className="flex justify-between items-center text-sm font-semibold">
                <span
                  className={
                    req.priority === "Critical"
                      ? "text-red-500"
                      : "text-yellow-400"
                  }
                >
                  🔴 {req.id} | {req.priority.toUpperCase()} | {req.status}
                </span>
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-white text-xs">
                    View Details
                  </button>
                  <button className="text-gray-400 hover:text-white text-xs">
                    Edit
                  </button>
                  <button className="text-gray-400 hover:text-white text-xs">
                    Link to Plan
                  </button>
                  <button className="text-gray-400 hover:text-white text-xs">
                    🗑️
                  </button>
                </div>
              </div>
              <div className="text-gray-200 mt-1 text-sm">{req.title}</div>
              <div className="text-gray-400 text-xs">
                Type: {req.type} | Created: {req.createdAt}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

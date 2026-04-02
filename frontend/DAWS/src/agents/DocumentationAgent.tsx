import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { docsAgent } from "../utils/agentsApi";

export default function DocumentationAgent() {
  const { id: projectId } = useParams();

  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("summary");
  const [loading, setLoading] = useState(false);

  const [docData, setDocData] = useState({
    summary: "",
    steps: "",
    code: "",
    examples: "",
  });

  const gradientCardStyle = {
    border: "2px solid transparent",
    background:
      "linear-gradient(var(--card-bg), var(--card-bg)) padding-box, linear-gradient(90deg, #8441A4, #FF5894) border-box",
  };

  const generateDoc = async () => {
    if (!input.trim()) return;

    setLoading(true);

    try {
      const { data } = await docsAgent({
        input,
        model: "gemini-2.5-pro",
        projectId,
      });

      const result = data.result || "No documentation generated.";

      setDocData({
        summary: result,
        steps: "📌 Step-by-step implementation:\n" + result,
        code: "💻 Related code documentation:\n" + result,
        examples: "🧪 Example usage:\n" + result,
      });
    } catch (err) {
      console.error("DocsAgent Error:", err);
      setDocData({
        summary: "❌ Something went wrong. Try again.",
        steps: "",
        code: "",
        examples: "",
      });
    }

    setLoading(false);
  };

  const sections = [
    { id: "summary", label: "📄 Summary" },
    { id: "steps", label: "📝 Steps" },
    { id: "code", label: "🔧 Code" },
    { id: "examples", label: "💡 Examples" },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6 transition-colors duration-300">
      {/* Page Title */}
      <div className="mb-6 p-5 rounded-xl shadow-sm" style={gradientCardStyle}>
        <h1 className="text-3xl font-bold">📚 Documentation Agent</h1>
        <p className="text-sm opacity-70 mt-2">
          Generate technical documentation, implementation steps, code
          references, and examples.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* ---------- Sidebar ---------- */}
        <aside className="p-4 rounded-xl shadow-sm" style={gradientCardStyle}>
          <h2 className="font-semibold mb-3">Sections</h2>
          <ul className="space-y-2 text-sm">
            {sections.map((section) => (
              <li
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`cursor-pointer rounded-lg px-3 py-2 transition ${
                  activeTab === section.id
                    ? "bg-gradient-to-r from-[#8441A4] to-[#FF5894] text-white"
                    : "hover:opacity-70"
                }`}
              >
                {section.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* ---------- Main Content ---------- */}
        <main className="md:col-span-3 space-y-6">
          {/* Input Box */}
          <div className="p-5 rounded-xl shadow-sm" style={gradientCardStyle}>
            <label className="text-sm font-medium">
              Enter text to generate documentation:
            </label>

            <textarea
              className="w-full mt-2 p-3 rounded-lg outline-none"
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Explain your function, component, feature, or architecture…"
              style={{
                background: "var(--input-bg)",
                color: "var(--text)",
                border: "1px solid var(--card-border)",
              }}
            />

            <button
              onClick={generateDoc}
              disabled={loading}
              className="mt-3 px-5 py-2 rounded-lg text-white
              bg-gradient-to-r from-[#8441A4] to-[#FF5894]"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>

          {/* ---------- Output Section ---------- */}
          {docData.summary && (
            <div className="p-5 rounded-xl shadow-sm" style={gradientCardStyle}>
              {/* Tabs */}
              <div
                className="flex gap-3 border-b pb-2"
                style={{ borderColor: "var(--card-border)" }}
              >
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`capitalize px-3 py-1 rounded-lg text-sm transition ${
                      activeTab === section.id
                        ? "bg-gradient-to-r from-[#8441A4] to-[#FF5894] text-white"
                        : "hover:opacity-70"
                    }`}
                  >
                    {section.id}
                  </button>
                ))}
              </div>

              {/* Output Box */}
              <div
                className="mt-4 p-4 rounded-lg whitespace-pre-wrap"
                style={{
                  background: "var(--output-bg)",
                  color: "var(--text)",
                  border: "1px solid var(--card-border)",
                }}
              >
                <p>{docData[activeTab as keyof typeof docData]}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

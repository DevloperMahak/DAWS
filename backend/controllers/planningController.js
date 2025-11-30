import { runLLM } from "../services/llmService.js";

export const generatePlan = async (req, res) => {
  try {
    const { goal } = req.body;

    if (!goal) return res.status(400).json({ error: "Goal is required" });

    const prompt = `
You are a NotebookLM-style multi-modal AI Planning Agent.

Generate a FULL structured project plan for the following goal:

"${goal}"

Return the output in the following format:

{
  "mindmap": "text-based mindmap or Mermaid diagram",
  "breakdown": {
    "summary": "...",
    "requirements": "...",
    "nonFunctional": "..."
  },
  "architecture": {
    "frontend": "...",
    "backend": "...",
    "database": "...",
    "APIs": "...",
    "systemDiagram": "Mermaid architecture diagram"
  },
  "tasks": [
    { "title": "", "description": "", "subtasks": [] }
  ],
  "milestones": [
    { "title": "", "timeline": "" }
  ]
}

Make sure response is VALID JSON (very important).
`;

    const result = await runLLM(prompt);
    res.json({ plan: result });
  } catch (error) {
    console.error("PlanningAgent Error:", error);
    res.status(500).json({ error: "Something went wrong generating plan." });
  }
};

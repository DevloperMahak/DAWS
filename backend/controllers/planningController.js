import { runLLM } from "../services/plannerService.js";

export const generatePlan = async (req, res) => {
  try {
    const { goal } = req.body;

    if (!goal) return res.status(400).json({ error: "Goal is required" });

    const prompt = `
Return ONLY valid JSON.

Follow this schema strictly:

{
  "mindmap": "",
  "breakdown": {
    "summary": "",
    "requirements": "",
    "nonFunctional": ""
  },
  "architecture": {
    "frontend": "",
    "backend": "",
    "database": "",
    "APIs": "",
    "systemDiagram": ""
  },
  "tasks": [],
  "milestones": []
}

Goal: "${goal}"
`;

    // Run LLM
    const llmText = await runLLM(prompt);

    // Parse JSON response safely
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(llmText);
    } catch (err) {
      console.error("❌ LLM JSON Parse Error:", err);

      return res.status(500).json({
        error: "AI returned invalid JSON.",
        raw: llmText,
      });
    }

    return res.json(jsonResponse);
  } catch (error) {
    console.error("PlanningAgent Error:", error);
    res.status(500).json({ error: "Something went wrong generating plan." });
  }
};

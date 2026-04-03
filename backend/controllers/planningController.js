import { runPlannerLLM } from "../services/plannerService.js";
import { saveWorkspaceMemory } from "../utils/workspaceMemory.js";
import { getWorkspaceMemory } from "../utils/getWorkspaceMemory.js";

export const generatePlan = async (req, res) => {
  try {
    const { goal, projectId } = req.body;

    if (!goal || !projectId) {
      return res.status(400).json({
        error: "Goal and projectId are required",
      });
    }

    const previousMemory = await getWorkspaceMemory(projectId);

    const memoryContext = previousMemory
      .map(
        (m) => `
[${m.agent.toUpperCase()} - ${m.type}]
${m.content}
`,
      )
      .join("\n");

    const prompt = `
Generate project roadmap in STRICT JSON.

Goal:
${goal}

Project memory:
${memoryContext}

JSON schema:
{
  "mindmap": "string",
  "breakdown": {
    "summary": "string",
    "requirements": "string",
    "nonFunctional": "string"
  },
  "architecture": {
    "frontend": "string",
    "backend": "string",
    "database": "string",
    "APIs": "string",
    "systemDiagram": "string"
  },
  "tasks": ["task1", "task2"],
  "milestones": ["m1", "m2"]
}
`;

    const llmText = await runPlannerLLM(prompt);

    console.log("🧠 RAW PLAN:", llmText);

    // ✅ safer cleanup
    let cleanText = llmText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // ✅ extract JSON only from text
    const firstBrace = cleanText.indexOf("{");
    const lastBrace = cleanText.lastIndexOf("}");

    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanText = cleanText.slice(firstBrace, lastBrace + 1);
    }

    let jsonResponse;

    try {
      jsonResponse = JSON.parse(cleanText);
    } catch (err) {
      console.error("❌ Planner JSON parse failed");
      console.error(cleanText);

      return res.status(500).json({
        error: "Planner returned invalid JSON",
        raw: cleanText,
      });
    }

    await saveWorkspaceMemory({
      projectId,
      agent: "planner",
      type: "planning",
      title: "Project Roadmap",
      content: JSON.stringify(jsonResponse),
    });

    return res.json(jsonResponse);
  } catch (error) {
    console.error("PlanningAgent Error:", error);

    return res.status(500).json({
      error: "Something went wrong generating plan.",
    });
  }
};

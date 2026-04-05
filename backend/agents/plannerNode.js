import { runPlannerLLM } from "../services/plannerService.js";

export const plannerNode = async (state) => {
  const prompt = `
You are a software architecture planner.

Based on the project requirements below, generate a JSON mind map.

Requirements:
${state.requirements}

Return ONLY valid JSON in this exact structure:
{
  "title": "Project Name",
  "children": [
    {
      "title": "Architecture",
      "children": [
        { "title": "Frontend" },
        { "title": "Backend" },
        { "title": "Database" }
      ]
    },
    {
      "title": "Milestones",
      "children": [
      { "title": "Phase 1" },
        { "title": "Phase 2" }
      ]
    },
    {
      "title": "APIs",
      "children": [
        { "title": "Auth API" },
        { "title": "Planner API" }
      ]
    }
  ]
}

Rules:
- JSON only
- no markdown
- no explanation
- nested roadmap tree format
`;
  const result = await runPlannerLLM(prompt);

  let parsed;
  try {
    const cleaned = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    parsed = JSON.parse(cleaned);
  } catch (error) {
    console.error("Mindmap parse failed:", result);

    parsed = {
      title: "Planning Failed",
      children: [{ title: "Could not parse plan" }],
    };
  }

  return {
    mindmap: parsed,
    breakdown: {
      summary: "AI generated roadmap created successfully",
      requirements: state.requirements,
      nonFunctional: "Scalable, maintainable, modular architecture",
    },
    architecture: {
      frontend: "React + TypeScript",
      backend: "Node.js + Express",
      database: "MySQL / MongoDB",
      APIs: "REST APIs",
      systemDiagram: "Frontend → Backend → DB",
    },
    tasks: [
      "Setup frontend",
      "Create backend APIs",
      "Implement auth",
      "Build planner workflow",
    ],
    milestones: [
      "Phase 1 - Requirements",
      "Phase 2 - Planner",
      "Phase 3 - Builder",
    ],
    currentStep: "planning_done",
  };
};

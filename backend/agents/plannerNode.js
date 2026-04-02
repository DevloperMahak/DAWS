import { runLLM } from "../services/llmService.js";

export const plannerNode = async (state) => {
  const prompt = `
Create software development roadmap from:
${state.requirements}

Return:
- architecture
- tasks
- milestones
- APIs
`;

  const result = await runLLM(prompt);

  return {
    plan: result,
    currentStep: "planning_done",
  };
};

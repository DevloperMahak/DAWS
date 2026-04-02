import { runLLM } from "../services/llmService.js";

export const devNode = async (state) => {
  const prompt = `
You are a Senior Software Developer Agent.

Using this software plan:
${state.plan}

Generate:
- backend module structure
- frontend module structure
- API endpoints
- folder structure
- code starter templates
`;

  const result = await runLLM(prompt);

  return {
    devOutput: result,
    currentStep: "development_done",
  };
};

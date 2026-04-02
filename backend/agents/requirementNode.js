import { runLLM } from "../services/llmService.js";

export const requirementNode = async (state) => {
  const prompt = `
You are a Requirements Engineering Agent.

Extract:
- Functional requirements
- Non-functional requirements
- User stories
- Acceptance criteria

Project: ${state.projectName}
Description: ${state.description}
`;

  const result = await runLLM(prompt);

  return {
    requirements: result,
    currentStep: "requirements_done",
  };
};

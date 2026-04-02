import { runLLM } from "../services/llmService.js";

export const docsNode = async (state) => {
  const prompt = `
Create project documentation from this implementation:

${state.devOutput}

Include:
- API docs
- setup guide
- architecture docs
- README
`;

  const result = await runLLM(prompt);

  return {
    documentation: result,
    currentStep: "docs_done",
  };
};

import { runLLM } from "../services/llmService.js";

export const generateRequirements = async (req, res) => {
  try {
    const { text, model } = req.body;

    const prompt = `
    Analyze the following project description and extract:
    - Key Features
    - User Stories
    - Acceptance Criteria

    Project Description:
    ${text}
    `;

    const result = await runLLM(prompt, model);

    res.json({ success: true, result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "LLM error" });
  }
};

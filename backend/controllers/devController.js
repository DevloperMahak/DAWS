import { runLLM } from "../services/llmService.js";

export const devChat = async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = `
    You are a senior software engineer.
    Answer the following developer question, including:
    - Code examples
    - Explanation
    - Fixes if needed

    User message:
    ${message}
    `;

    const output = await runLLM(prompt);

    res.json({ success: true, data: output });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

import { runLLM } from "../services/llmService.js";

export const knowledgeSearch = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query is required",
      });
    }

    const prompt = `
You are a powerful AI knowledge assistant.

Provide the following for the user's query:

### 🔍 Summary
Short and clear.

### 🧠 Explanation
Explain like I am 12 years old.

### 📚 Extra Knowledge
Add related facts, examples, and deeper understanding.

User query:
${query}
`;

    const output = await runLLM(prompt);

    res.json({
      success: true,
      data: output,
    });
  } catch (error) {
    console.error("Knowledge Agent Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

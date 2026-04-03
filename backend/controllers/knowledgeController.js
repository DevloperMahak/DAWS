import { runLLM } from "../services/llmService.js";
import { saveWorkspaceMemory } from "../utils/workspaceMemory.js";
import { getWorkspaceMemory } from "../utils/getWorkspaceMemory.js";

export const knowledgeSearch = async (req, res) => {
  try {
    const { query, projectId } = req.body;

    if (!query || !projectId) {
      return res.status(400).json({
        success: false,
        message: "query and projectId are required",
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
You are a powerful AI knowledge assistant.

Use project memory:
${memoryContext}

Now answer this user query:
${query}

Provide:
### 🔍 Summary
### 🧠 Explanation
### 📚 Extra Knowledge
`;

    const output = await runLLM(prompt);
    const aiResponse = output;
    await saveWorkspaceMemory({
      projectId,
      agent: "knowledge",
      type: "research",
      title: "Knowledge Search",
      content: aiResponse,
    });

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

import { runLLM } from "../services/llmService.js";
import { saveWorkspaceMemory } from "../utils/workspaceMemory.js";
import { getWorkspaceMemory } from "../utils/getWorkspaceMemory.js";

export const devChat = async (req, res) => {
  try {
    const { message, projectId } = req.body;

    if (!message || !projectId) {
      return res.status(400).json({
        success: false,
        message: "message and projectId are required",
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
You are a senior software engineer AI assistant.

Use the full project context below:
${memoryContext}

Now solve this developer task:
${message}

Provide:
- Fixes
- Optimized code
- Explanation
- Best practices
`;
    const output = await runLLM(prompt);
    const aiOutput = output;
    await saveWorkspaceMemory({
      projectId,
      agent: "dev",
      type: "code-help",
      title: "Developer Assistant",
      content: aiOutput,
    });

    res.json({ success: true, data: output });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

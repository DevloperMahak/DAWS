import { runLLM } from "../services/llmService.js";
import { saveWorkspaceMemory } from "../utils/workspaceMemory.js";
import { getWorkspaceMemory } from "../utils/getWorkspaceMemory.js";

export const generateDocs = async (req, res) => {
  try {
    console.log("==> /agents/docs body:", req.body);

    const { requirements, model } = req.body;
    if (!requirements) {
      return res
        .status(400)
        .json({ success: false, message: "requirements is required" });
    }

    const previousMemory = await getWorkspaceMemory(req.body.projectId);

    const memoryContext = previousMemory
      .map((m) => `[${m.agent}] ${m.content}`)
      .join("\n");

    const prompt = `
Using full project memory:

${memoryContext}

Generate professional project documentation.
`;

    const result = await runLLM(prompt, model);
    await saveWorkspaceMemory({
      projectId: req.body.projectId,
      agent: "docs",
      type: "documentation",
      title: "Generated Documentation",
      content: result,
    });

    return res.json({ success: true, result });
  } catch (err) {
    console.error("DocsAgent controller error:", err);
    // include useful error details in response (for dev only)
    const extra = err?.response?.data || err?.message || String(err);
    return res.status(500).json({
      success: false,
      message: "Docs generation failed",
      error: extra,
    });
  }
};

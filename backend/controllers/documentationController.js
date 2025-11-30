import { runLLM } from "../services/llmService.js";

export const generateDocs = async (req, res) => {
  try {
    console.log("==> /agents/docs body:", req.body);

    const { requirements, model } = req.body;
    if (!requirements) {
      return res
        .status(400)
        .json({ success: false, message: "requirements is required" });
    }

    const prompt = `Convert requirements into docs: ${requirements}`;
    const result = await runLLM(prompt, model);

    return res.json({ success: true, result });
  } catch (err) {
    console.error("DocsAgent controller error:", err);
    // include useful error details in response (for dev only)
    const extra = err?.response?.data || err?.message || String(err);
    return res
      .status(500)
      .json({
        success: false,
        message: "Docs generation failed",
        error: extra,
      });
  }
};

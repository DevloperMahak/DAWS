import { runLLM } from "../services/llmService.js";
import multer from "multer";
import fs from "fs";

// For uploading images/audio
const upload = multer({ dest: "uploads/" });
export const requirementsUpload = upload.single("file");

export const generateRequirements = async (req, res) => {
  try {
    const { text, model } = req.body;
    let fileContent = "";

    // If file exists → process image or audio
    if (req.file) {
      const buffer = fs.readFileSync(req.file.path);
      fileContent = buffer.toString("base64");

      // Delete file after reading
      fs.unlinkSync(req.file.path);
    }

    const prompt = `
You are a Multimodal Requirements Extraction Agent.

Extract:
- Functional Requirements
- Non-Functional Requirements
- User Stories
- Acceptance Criteria

User Input (Text):
${text || "No text provided"}

${
  req.file
    ? `
User provided a ${
        req.file.mimetype.includes("image") ? "Image" : "Audio"
      } (Base64):
${fileContent}
`
    : ""
}
`;

    const result = await runLLM(prompt, model);

    res.json({ success: true, result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "LLM error" });
  }
};

import { runLLM } from "../services/llmService.js";

export async function requirementsAgent(message) {
  if (message.type !== "ARCHITECTURE") {
    throw new Error("Invalid message type received.");
  }

  const { architecture, breakdown } = message.payload;

  const requirements = await runLLM(`
Write detailed software requirements based on:

ARCHITECTURE:
${architecture}

BREAKDOWN:
${breakdown}
  `);

  return {
    sender: "requirements",
    receiver: "ui",
    type: "REQUIREMENTS",
    payload: requirements,
    timestamp: Date.now(),
  };
}

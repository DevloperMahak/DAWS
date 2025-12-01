import { createA2AMessage } from "./a2aMessage.js";
import { runLLM } from "../services/llmService.js";

export async function plannerAgent(prompt) {
  const response = await runLLM(`
Generate:
1. Mindmap  
2. Architecture  
3. Step-by-step breakdown  

For the project: ${prompt}

Return the sections clearly using the format:

[MINDMAP]
...

[ARCHITECTURE]
...

[BREAKDOWN]
...
  `);

  // extract sections from LLM result
  const mindmap = response
    .split("[MINDMAP]")[1]
    ?.split("[ARCHITECTURE]")[0]
    ?.trim();
  const architecture = response
    .split("[ARCHITECTURE]")[1]
    ?.split("[BREAKDOWN]")[0]
    ?.trim();
  const breakdown = response.split("[BREAKDOWN]")[1]?.trim();

  return createA2AMessage("planner", "requirements", "ARCHITECTURE", {
    mindmap,
    architecture,
    breakdown,
  });
}

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const runLLM = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-pro",
    });

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("LLM Service Error:", error);
    throw error;
  }
};

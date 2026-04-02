import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const runLLM = async (prompt) => {
  // 1) Try Gemini first
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.warn("⚠️ Gemini failed, switching to GROQ...");

    // 2) Fallback to GROQ
    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      return completion.choices[0].message.content;
    } catch (groqError) {
      console.error("❌ GROQ fallback also failed:", groqError);
      throw groqError;
    }
  }
};

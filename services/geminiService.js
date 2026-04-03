// services/geminiService.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

class GeminiService {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY missing in .env");
    }

    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

   this.model = this.genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});
  }

  createPrompt(ingredients) {
    return `
You are a certified nutrition expert.

Analyze the ingredients below.

Return ONLY a valid JSON array.

Ingredients:
${ingredients}

Format:
[
  {
    "ingredient": "Sugar",
    "status": "Bad",
    "reason": "High glycemic index",
    "concerns": ["Diabetes"]
  }
]
`;
  }

  async analyze(ingredients) {
    try {
      const prompt = this.createPrompt(ingredients);

      const result = await this.model.generateContent(prompt);

      const response = await result.response;
      const text = response.text();

      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const jsonMatch = cleaned.match(/\[[\s\S]*\]/);

      if (!jsonMatch) {
        throw new Error("Gemini returned invalid JSON");
      }

      return {
        analysis: JSON.parse(jsonMatch[0]),
        success: true,
      };
    } catch (error) {
      console.error("❌ Gemini Error:", error.message);
      throw error;
    }
  }
}

export default new GeminiService();
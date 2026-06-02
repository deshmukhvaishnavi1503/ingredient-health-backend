import express from "express";
import { createWorker } from "tesseract.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

console.log("✅ analysisRoutes loaded successfully");

/* ===============================
   TEXT CLEANING
================================= */
const cleanText = (text) => {
  return text
    .replace(/[^a-zA-Z0-9%,()\[\]&.\-\s]/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) =>
        line.length > 2 &&
        /[a-zA-Z]/.test(line) &&
        !line.toLowerCase().includes("system")
    );
};

/* ===============================
   SAFE JSON EXTRACTION
================================= */
const extractJSON = (text) => {
  try {
    if (!text) return null;

    let cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start === -1 || end === -1) {
      return null;
    }

    cleaned = cleaned.substring(start, end + 1);

    // Remove trailing commas
    cleaned = cleaned.replace(/,\s*}/g, "}");
    cleaned = cleaned.replace(/,\s*]/g, "]");

    return JSON.parse(cleaned);

  } catch (err) {
    console.log("⚠ JSON Parse Failed:", err.message);
    return null;
  }
};

/* ===============================
   HEALTH SCORE CALCULATION
================================= */
const calculateScore = (analysis) => {

  const healthy =
    analysis.healthy?.length || 0;

  const moderate =
    analysis.moderate?.length || 0;

  const additives =
    analysis.additives?.length || 0;

  const harmful =
    analysis.harmful?.length || 0;

  const allergens =
    analysis.allergens?.length || 0;

  // Base score
  let score = 80;

  // Nutrition impact
  score += healthy * 2;
  score -= moderate * 0.5;
  score -= additives * 0.3;

  // Stronger penalties (important change)
  score -= harmful * 8;
  score -= allergens * 1;

  // Clamp score
  score = Math.round(
    Math.max(1, Math.min(100, score))
  );

  /* ===============================
     RISK LEVEL LOGIC (IMPROVED)
  ================================= */

  let riskLevel = "Low";

  // HIGH risk (priority first)
  if (harmful >= 3 || score < 45) {
    riskLevel = "High";
  }

  // MEDIUM risk
  else if (
    allergens >= 3 ||
    harmful >= 1 ||
    additives >= 8 ||
    score < 70
  ) {
    riskLevel = "Medium";
  }

  return {
    score,
    riskLevel,
  };
};

/* ===============================
   DETAILED ANALYSIS GENERATOR
================================= */
const buildDetailedAnalysis = (analysis) => {

  const detailed = [];

  analysis.healthy?.forEach((item) => {
    detailed.push({
      ingredient: item,
      category: "Healthy",
      severity: "Low",
      reason:
        "Contains beneficial nutrients and is generally safe for consumption.",
    });
  });

  analysis.moderate?.forEach((item) => {
    detailed.push({
      ingredient: item,
      category: "Moderate",
      severity: "Medium",
      reason:
        "Should be consumed in moderation because excess intake may affect health.",
    });
  });

  analysis.harmful?.forEach((item) => {
    detailed.push({
      ingredient: item,
      category: "Harmful",
      severity: "High",
      reason:
        "Frequent consumption may increase health risks such as obesity, diabetes, or heart disease.",
    });
  });

  analysis.additives?.forEach((item) => {
    detailed.push({
      ingredient: item,
      category: "Additive",
      severity: "Medium",
      reason:
        "Processed additive used for preservation, texture improvement, or flavor enhancement.",
    });
  });

  return detailed;
};

/* ===============================
   SMART FALLBACK LOGIC
================================= */
const fallbackAnalysis = (ingredients) => {

  const lower = ingredients.map((i) => i.toLowerCase());

  return {
    ingredients,

    healthy: ingredients.filter((i, idx) =>
      lower[idx].includes("vitamin") ||
      lower[idx].includes("mineral")
    ),

    moderate: ingredients.filter((i, idx) =>
      lower[idx].includes("flour") ||
      lower[idx].includes("oil") ||
      lower[idx].includes("salt") ||
      lower[idx].includes("maida")
    ),

    harmful: ingredients.filter((i, idx) =>
      lower[idx].includes("sugar") ||
      lower[idx].includes("syrup")
    ),

    additives: ingredients.filter((i, idx) =>
      i.includes("(") ||
      i.includes("[") ||
      lower[idx].includes("emulsifier") ||
      lower[idx].includes("colour") ||
      lower[idx].includes("flavour")
    ),

    allergens: ingredients.filter((i, idx) =>
      lower[idx].includes("milk") ||
      lower[idx].includes("wheat") ||
      lower[idx].includes("gluten")
    ),

    advice:
      "This product contains processed ingredients, added sugars, and food additives. Consume occasionally and in moderation.",
  };
};

/* ===============================
   MAIN ANALYZE ROUTE
================================= */
router.post("/analyze", async (req, res) => {

  let worker;

  try {

    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No image provided",
      });
    }

    console.log("📥 Image received");

    const base64Data = image.replace(
      /^data:image\/\w+;base64,/,
      ""
    );

    const buffer = Buffer.from(base64Data, "base64");

    const startTime = Date.now();

    /* ===============================
       OCR PROCESS
    ================================= */

    worker = await createWorker("eng");

    const {
      data: { text },
    } = await worker.recognize(buffer);

    await worker.terminate();
    worker = null;

    /* ===============================
       INGREDIENT EXTRACTION
    ================================= */

    const cleanedLines = cleanText(text);

    const ingredients = cleanedLines
      .join(" ")
      .replace(/ingredients[:\-]*/gi, "")
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i.length > 2);

    console.log("📝 Extracted:", ingredients);

    /* ===============================
       EMPTY RESULT
    ================================= */

    if (ingredients.length === 0) {

      const fallback = fallbackAnalysis([]);

      const detailedAnalysis =
        buildDetailedAnalysis(fallback);

      const { score, riskLevel } =
        calculateScore(fallback);

      return res.json({
        success: true,

        data: {
          extractedIngredients: [],
          totalIngredients: 0,
          processingTime: Date.now() - startTime,

          analysis: detailedAnalysis,

          groupedAnalysis: fallback,

          advice: fallback.advice,

          healthScore: score,

          riskLevel,
        },
      });
    }

    /* ===============================
       GEMINI PROMPT
    ================================= */

    const prompt = `
You are a professional food ingredient health analyzer.

Analyze these ingredients carefully.

Classify ingredients into:
- healthy
- moderate
- harmful
- additives
- allergens

IMPORTANT RULES:
1. Return ONLY valid JSON
2. Do NOT add markdown
3. Do NOT use triple backticks
4. Do NOT explain outside JSON
5. Arrays must contain strings only
6. JSON must be valid and complete

Ingredients:
${ingredients.join(", ")}

Return EXACTLY in this format:

{
  "healthy": [],
  "moderate": [],
  "harmful": [],
  "additives": [],
  "allergens": [],
  "advice": ""
}
`;

    console.log("🤖 Sending to Gemini...");

    /* ===============================
       GEMINI API CALL
    ================================= */

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const rawText = await response.text();

    /* ===============================
       GEMINI FAILED → FALLBACK
    ================================= */

    if (!response.ok) {

      console.log(
        "⚠ Gemini unavailable. Using fallback logic."
      );

      const fallback =
        fallbackAnalysis(ingredients);

      const detailedAnalysis =
        buildDetailedAnalysis(fallback);

      const { score, riskLevel } =
        calculateScore(fallback);

      return res.json({
        success: true,

        data: {
          extractedIngredients: ingredients,

          totalIngredients:
            ingredients.length,

          processingTime:
            Date.now() - startTime,

          analysis: detailedAnalysis,

          groupedAnalysis: fallback,

          advice: fallback.advice,

          healthScore: score,

          riskLevel,
        },
      });
    }

    /* ===============================
       PARSE AI RESPONSE
    ================================= */

    const parsedResponse =
      JSON.parse(rawText);

    const aiText =
      parsedResponse?.candidates?.[0]
        ?.content?.parts?.[0]?.text || "";

    console.log("🤖 Gemini Raw:", aiText);

    const parsed = extractJSON(aiText);

    /* ===============================
       INVALID JSON → FALLBACK
    ================================= */

    if (!parsed) {

      console.log(
        "⚠ Invalid AI JSON. Using fallback."
      );

      const fallback =
        fallbackAnalysis(ingredients);

      const detailedAnalysis =
        buildDetailedAnalysis(fallback);

      const { score, riskLevel } =
        calculateScore(fallback);

      return res.json({
        success: true,

        data: {
          extractedIngredients: ingredients,

          totalIngredients:
            ingredients.length,

          processingTime:
            Date.now() - startTime,

          analysis: detailedAnalysis,

          groupedAnalysis: fallback,

          advice: fallback.advice,

          healthScore: score,

          riskLevel,
        },
      });
    }

    /* ===============================
       SUCCESS
    ================================= */

    const detailedAnalysis =
      buildDetailedAnalysis(parsed);

    const { score, riskLevel } =
      calculateScore(parsed);

    return res.json({
      success: true,

      data: {
        extractedIngredients: ingredients,

        totalIngredients:
          ingredients.length,

        processingTime:
          Date.now() - startTime,

        analysis: detailedAnalysis,

        groupedAnalysis: parsed,

        advice: parsed.advice ||
          "Consume processed foods in moderation.",

        healthScore: score,

        riskLevel,
      },
    });

  } catch (error) {

    console.error(
      "🔥 Analyze Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });

  } finally {

    if (worker) {
      try {
        await worker.terminate();
      } catch {}
    }
  }
});

export default router;
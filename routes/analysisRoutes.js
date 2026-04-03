import express from "express";
import { createWorker } from "tesseract.js";

const router = express.Router();

const cleanText = (text) => {
  return text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 2 && /[a-zA-Z]/.test(line));
};

router.post("/analyze", async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No image provided",
      });
    }

    console.log("📥 Image received");

    // ✅ Remove base64 prefix
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

    const buffer = Buffer.from(base64Data, "base64");

    const startTime = Date.now();

    const worker = await createWorker("eng");

    const { data: { text } } = await worker.recognize(buffer);

    await worker.terminate();

    console.log("📝 Extracted text:", text);

    const ingredients = cleanText(text);

    const processingTime = `${Date.now() - startTime}ms`;

    res.json({
      success: true,
      data: {
        userType: "general",
        healthScore: ingredients.length > 0 ? 80 : 10,
        category: ingredients.length > 0 ? "Healthy" : "Unhealthy",
        totalIngredients: ingredients.length,
        processingTime,
        allergens: ["Example: gluten"],
        analysis: ingredients
      }
    });

  } catch (error) {
    console.error("🔥 OCR Error:", error);

    res.status(500).json({
      success: false,
      message: "OCR failed",
      error: error.message
    });
  }
});

export default router;
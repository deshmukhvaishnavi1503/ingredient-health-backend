// controllers/controller.js

import analysisService from "../services/analysisService.js";

export const analyzeIngredients = (req, res) => {
  try {
    const { ingredients, userType } = req.body;

    const result = analysisService.analyze(
      ingredients,
      userType || "general"
    );

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error("❌ Analysis Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Analysis failed"
    });
  }
};
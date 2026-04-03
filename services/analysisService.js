// services/analysisService.js

import ingredientDatabase from "../data/ingredientDatabase.js";

class AnalysisService {
  analyze(ingredientsText, userType = "general") {

    if (!ingredientsText) {
      return {
        userType,
        healthScore: 10,
        category: "Healthy",
        analysis: []
      };
    }

    const ingredients = ingredientsText
      .toLowerCase()
      .split(",")
      .map(i => i.trim())
      .filter(i => i.length > 0);

    let totalRisk = 0;
    const analysis = [];

    ingredients.forEach(item => {
      let matched = false;

      for (const key in ingredientDatabase) {

        // convert palm_oil → palm oil
        const formattedKey = key.replace(/_/g, " ");

        if (item.includes(formattedKey)) {
          const data = ingredientDatabase[key];

          // Personalized risk logic
          let risk = data.baseRisk;

          if (userType !== "general" && data.conditions[userType]) {
            risk = data.conditions[userType];
          }

          totalRisk += risk;

          analysis.push({
            ingredient: item,
            matchedWith: key,
            status: data.status,
            riskScore: risk,
            reason: data.reason,
            concerns: data.concerns
          });

          matched = true;
          break;
        }
      }

      if (!matched) {
        analysis.push({
          ingredient: item,
          status: "Unknown",
          riskScore: 0,
          reason: "Not found in database",
          concerns: []
        });
      }
    });

    const healthScore = Math.max(10 - totalRisk, 1);

    let category = "Healthy";
    if (healthScore <= 4) category = "Unhealthy";
    else if (healthScore <= 7) category = "Moderate";

    return {
      userType,
      healthScore,
      category,
      totalIngredients: ingredients.length,
      analysis
    };
  }
}

export default new AnalysisService();
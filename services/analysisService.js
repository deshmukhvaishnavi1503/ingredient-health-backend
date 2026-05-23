// services/analysisService.js

import ingredientDatabase from "../data/ingredientDatabase.js";

class AnalysisService {
  analyze(ingredientsText, userType = "general") {

    if (!ingredientsText) {
      return {
        userType,
        healthScore: 100,
        category: "Healthy",
        totalIngredients: 0,

        analysis: [],

        groupedAnalysis: {
          healthy: [],
          moderate: [],
          harmful: [],
          additives: [],
          allergens: [],
        },

        explanations: [
          "No ingredients detected. Product assumed safe."
        ]
      };
    }

    const ingredients = ingredientsText
      .toLowerCase()
      .split(",")
      .map(i => i.trim())
      .filter(i => i.length > 0);

    let totalRisk = 0;

    const analysis = [];

    const groupedAnalysis = {
      healthy: [],
      moderate: [],
      harmful: [],
      additives: [],
      allergens: [],
    };

    const explanations = [];

    ingredients.forEach(item => {

      let matched = false;

      for (const key in ingredientDatabase) {

        const formattedKey = key.replace(/_/g, " ");

        if (item.includes(formattedKey)) {

          const data = ingredientDatabase[key];

          let risk = data.baseRisk || 0;

          if (
            userType !== "general" &&
            data.conditions?.[userType]
          ) {
            risk = data.conditions[userType];
          }

          totalRisk += risk;

          /* ===============================
             Severity
          =============================== */

          let severity = "Low";

          if (risk >= 3) {
            severity = "High";
          } else if (risk === 2) {
            severity = "Medium";
          }

          /* ===============================
             Detailed Ingredient Analysis
          =============================== */

          const ingredientAnalysis = {
            ingredient: item.toUpperCase(),
            matchedWith: key,
            status: data.status,
            riskScore: risk,
            severity,
            reason: data.reason,
            concerns: data.concerns || [],
          };

          analysis.push(ingredientAnalysis);

          /* ===============================
             Grouped Categories
          =============================== */

          switch (data.status?.toLowerCase()) {

            case "healthy":
              groupedAnalysis.healthy.push(
                item.toUpperCase()
              );
              break;

            case "moderate":
              groupedAnalysis.moderate.push(
                item.toUpperCase()
              );
              break;

            case "harmful":
              groupedAnalysis.harmful.push(
                item.toUpperCase()
              );
              break;

            case "additive":
              groupedAnalysis.additives.push(
                item.toUpperCase()
              );
              break;
          }

          /* ===============================
             Allergens
          =============================== */

          if (
            data.concerns?.some(c =>
              c.toLowerCase().includes("allergen")
            )
          ) {
            groupedAnalysis.allergens.push(
              item.toUpperCase()
            );
          }

          /* ===============================
             Explainable AI
          =============================== */

          explanations.push(
            `${severity} Risk: ${item.toUpperCase()} — ${data.reason}`
          );

          matched = true;
          break;
        }
      }

      /* ===============================
         Unknown Ingredient
      =============================== */

      if (!matched) {

        analysis.push({
          ingredient: item.toUpperCase(),
          status: "Unknown",
          riskScore: 0,
          severity: "Unknown",
          reason: "Not found in database",
          concerns: [],
        });

        explanations.push(
          `Unknown Ingredient: ${item.toUpperCase()}`
        );
      }
    });

    /* ===============================
       Dynamic Health Score
    =============================== */

    const maxRiskPerIngredient = 3;

    const maxPossibleRisk =
      ingredients.length * maxRiskPerIngredient;

    let healthScore = 100;

    if (maxPossibleRisk > 0) {

      const normalizedScore =
        100 - (totalRisk / maxPossibleRisk) * 100;

      healthScore = Math.round(normalizedScore);
    }

    healthScore = Math.max(
      1,
      Math.min(100, healthScore)
    );

    /* ===============================
       Category
    =============================== */

    let category = "Healthy";

    if (healthScore < 40) {
      category = "Unhealthy";
    } else if (healthScore < 70) {
      category = "Moderate";
    }

    explanations.unshift(
      `Final Health Score: ${healthScore}/100`
    );

    return {
      userType,
      healthScore,
      category,
      totalIngredients: ingredients.length,

      analysis,

      groupedAnalysis,

      explanations
    };
  }
}

export default new AnalysisService();
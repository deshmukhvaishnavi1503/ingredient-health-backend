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

    /* ===============================
       OCR CLEANING
    =============================== */

    const ingredients = ingredientsText
      .toLowerCase()
      .replace(/\n/g, ",")
      .replace(/contains:/gi, "")
      .replace(/may contain:/gi, "")
      .replace(/less than \d+%/gi, "")
      .replace(/\band\b/gi, "")
      .replace(/\./g, ",")
      .split(",")
      .map(i => i.trim())
      .filter(Boolean);

    const analysis = [];

    const groupedAnalysis = {
      healthy: [],
      moderate: [],
      harmful: [],
      additives: [],
      allergens: [],
    };

    const explanations = [];

    /* ===============================
       NORMALIZER
    =============================== */

    const normalize = (str) =>
      str
        .toLowerCase()
        .replace(/[^a-z]/g, "");

    /* ===============================
       🔥 PRIORITY SORTING (IMPORTANT FIX)
       Harmful ingredients checked FIRST
    =============================== */

    const sortedKeys = Object.keys(ingredientDatabase).sort((a, b) => {
      const aPriority = ingredientDatabase[a].status === "harmful" ? 0 : 1;
      const bPriority = ingredientDatabase[b].status === "harmful" ? 0 : 1;
      return aPriority - bPriority;
    });

    ingredients.forEach(item => {

      let matched = false;

      const normalizedItem = normalize(item);

      for (const key of sortedKeys) {

        const data = ingredientDatabase[key];

        const normalizedKey = normalize(key);

        /* ===============================
           IMPROVED MATCHING LOGIC
        =============================== */

        if (
          normalizedItem.includes(normalizedKey) ||
          normalizedKey.includes(normalizedItem)
        ) {

          let risk = data.baseRisk || 0;

          if (
            userType !== "general" &&
            data.conditions?.[userType]
          ) {
            risk = data.conditions[userType];
          }

          let severity = "Low";

          if (risk >= 3) severity = "High";
          else if (risk >= 2) severity = "Medium";

          analysis.push({
            ingredient: item.toUpperCase(),
            matchedWith: key,
            status: data.status,
            riskScore: risk,
            severity,
            reason: data.reason,
            concerns: data.concerns || []
          });

          switch (data.status?.toLowerCase()) {

            case "healthy":
              groupedAnalysis.healthy.push(item.toUpperCase());
              break;

            case "moderate":
              groupedAnalysis.moderate.push(item.toUpperCase());
              break;

            case "harmful":
              groupedAnalysis.harmful.push(item.toUpperCase());
              break;

            case "additive":
              groupedAnalysis.additives.push(item.toUpperCase());
              break;

            case "allergen":
              groupedAnalysis.allergens.push(item.toUpperCase());
              break;
          }

          /* Extra allergen detection */
          if (
            data.concerns?.some(c =>
              c.toLowerCase().includes("allergen")
            )
          ) {
            if (
              !groupedAnalysis.allergens.includes(item.toUpperCase())
            ) {
              groupedAnalysis.allergens.push(item.toUpperCase());
            }
          }

          explanations.push(
            `${severity} Risk: ${item.toUpperCase()} — ${data.reason}`
          );

          matched = true;
          break;
        }
      }

      /* ===============================
         UNKNOWN INGREDIENT
      =============================== */

      if (!matched) {

        analysis.push({
          ingredient: item.toUpperCase(),
          status: "Unknown",
          riskScore: 0.5,
          severity: "Unknown",
          reason: "Ingredient not found in database",
          concerns: []
        });

        explanations.push(
          `Unknown Ingredient: ${item.toUpperCase()}`
        );
      }
    });

    /* ===============================
       REMOVE DUPLICATES
    =============================== */

    groupedAnalysis.healthy = [...new Set(groupedAnalysis.healthy)];
    groupedAnalysis.moderate = [...new Set(groupedAnalysis.moderate)];
    groupedAnalysis.harmful = [...new Set(groupedAnalysis.harmful)];
    groupedAnalysis.additives = [...new Set(groupedAnalysis.additives)];
    groupedAnalysis.allergens = [...new Set(groupedAnalysis.allergens)];

    /* ===============================
       HEALTH SCORE
    =============================== */

    const healthyCount = groupedAnalysis.healthy.length;
    const moderateCount = groupedAnalysis.moderate.length;
    const additiveCount = groupedAnalysis.additives.length;
    const harmfulCount = groupedAnalysis.harmful.length;
    const allergenCount = groupedAnalysis.allergens.length;

    let healthScore = 80;

    healthScore += healthyCount * 2;
    healthScore -= moderateCount * 0.5;
    healthScore -= additiveCount * 0.3;
    healthScore -= harmfulCount * 5;
    healthScore -= allergenCount * 0.5;

    healthScore = Math.round(
      Math.max(1, Math.min(100, healthScore))
    );

    /* ===============================
       CATEGORY
    =============================== */

    let category = "Healthy";

    if (healthScore >= 80) category = "Healthy";
    else if (healthScore >= 60) category = "Moderate";
    else category = "Unhealthy";

    /* ===============================
       SORT
    =============================== */

    analysis.sort((a, b) => b.riskScore - a.riskScore);

    /* ===============================
       OUTPUT
    =============================== */

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
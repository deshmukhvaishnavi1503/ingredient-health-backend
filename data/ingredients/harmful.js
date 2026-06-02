const harmful = {

  sugar: {
    status: "harmful",
    baseRisk: 2,
    reason: "Excess consumption may contribute to obesity and diabetes",
    concerns: ["Diabetes", "Obesity"]
  },

  refined_sugar: {
    status: "harmful",
    baseRisk: 2,
    reason: "Highly processed sugar with limited nutritional value",
    concerns: ["Diabetes", "Obesity"]
  },

  brown_sugar: {
    status: "harmful",
    baseRisk: 1,
    reason: "Contains added sugars",
    concerns: ["Diabetes"]
  },

  glucose: {
    status: "harmful",
    baseRisk: 2,
    reason: "Can rapidly increase blood sugar levels",
    concerns: ["Diabetes"]
  },

  glucose_syrup: {
    status: "harmful",
    baseRisk: 2,
    reason: "Highly processed sweetener",
    concerns: ["Obesity", "Diabetes"]
  },

  fructose: {
    status: "harmful",
    baseRisk: 1,
    reason: "Excess intake may contribute to metabolic issues",
    concerns: ["Fatty liver", "Obesity"]
  },

  high_fructose_corn_syrup: {
    status: "harmful",
    baseRisk: 3,
    reason: "Highly processed sweetener linked to obesity",
    concerns: ["Obesity", "Diabetes"]
  },

  invert_syrup: {
    status: "harmful",
    baseRisk: 2,
    reason: "Concentrated sugar syrup",
    concerns: ["Diabetes"]
  },

  corn_syrup: {
    status: "harmful",
    baseRisk: 2,
    reason: "Processed sweetener with high sugar content",
    concerns: ["Obesity", "Diabetes"]
  },

  artificial_sweetener: {
    status: "harmful",
    baseRisk: 1,
    reason: "Artificial sweetener requiring moderation",
    concerns: []
  },

  aspartame: {
    status: "harmful",
    baseRisk: 1,
    reason: "Artificial sweetener",
    concerns: []
  },

  acesulfame_k: {
    status: "harmful",
    baseRisk: 1,
    reason: "Artificial sweetener",
    concerns: []
  },

  sucralose: {
    status: "harmful",
    baseRisk: 1,
    reason: "Artificial sweetener",
    concerns: []
  },

  saccharin: {
    status: "harmful",
    baseRisk: 1,
    reason: "Synthetic sweetener",
    concerns: []
  },

  trans_fat: {
    status: "harmful",
    baseRisk: 4,
    reason: "Strongly linked to heart disease",
    concerns: ["Heart Disease"]
  },

  hydrogenated_oil: {
    status: "harmful",
    baseRisk: 4,
    reason: "Contains unhealthy trans fats",
    concerns: ["Heart Disease"]
  },

  partially_hydrogenated_oil: {
    status: "harmful",
    baseRisk: 4,
    reason: "Major source of industrial trans fats",
    concerns: ["Heart Disease"]
  },

  shortening: {
    status: "harmful",
    baseRisk: 3,
    reason: "Often contains unhealthy fats",
    concerns: ["Heart Disease"]
  },

  artificial_flavor: {
    status: "harmful",
    baseRisk: 1,
    reason: "Synthetic flavoring agent",
    concerns: []
  },

  artificial_flavour: {
    status: "harmful",
    baseRisk: 1,
    reason: "Synthetic flavoring agent",
    concerns: []
  },

  artificial_fruit_flavor: {
    status: "harmful",
    baseRisk: 1,
    reason: "Artificial fruit flavoring",
    concerns: []
  },

  artificial_vanilla: {
    status: "harmful",
    baseRisk: 1,
    reason: "Synthetic vanilla flavor",
    concerns: []
  },

  synthetic_color: {
    status: "harmful",
    baseRisk: 1,
    reason: "Artificial coloring agent",
    concerns: []
  },

  red_40: {
    status: "harmful",
    baseRisk: 2,
    reason: "Synthetic food color additive",
    concerns: []
  },

  yellow_5: {
    status: "harmful",
    baseRisk: 2,
    reason: "Artificial food dye",
    concerns: []
  },

  yellow_6: {
    status: "harmful",
    baseRisk: 2,
    reason: "Synthetic coloring agent",
    concerns: []
  },

  blue_1: {
    status: "harmful",
    baseRisk: 2,
    reason: "Artificial blue food dye",
    concerns: []
  },

  blue_2: {
    status: "harmful",
    baseRisk: 2,
    reason: "Synthetic coloring agent",
    concerns: []
  },

  ajinomoto: {
  status: "harmful",
  baseRisk: 3,
  reason: "Monosodium glutamate (MSG) may cause sensitivity reactions in some individuals",
  concerns: ["Headache", "Sensitivity", "MSG"]
  },

  preservative_mix: {
    status: "harmful",
    baseRisk: 1,
    reason: "Contains multiple food preservatives",
    concerns: []
  },
  
  monosodium_glutamate: {
  status: "harmful",
  baseRisk: 3,
  reason: "Flavor enhancer (MSG)",
  concerns: ["Headache", "Sensitivity"]
  }
};

export default harmful;
const ingredientDatabase = {
  sugar: {
    status: "Bad",
    baseRisk: 3,
    conditions: {
      diabetic: 5,
      heart: 2
    },
    reason: "High glycemic index",
    concerns: ["Diabetes", "Obesity"]
  },
  salt: {
    status: "Moderate",
    baseRisk: 2,
    conditions: {
      diabetic: 1,
      heart: 4
    },
    reason: "High sodium content",
    concerns: ["High blood pressure"]
  },
  palm_oil: {
    status: "Moderate",
    baseRisk: 2,
    conditions: {
      diabetic: 2,
      heart: 4
    },
    reason: "High saturated fat",
    concerns: ["Heart disease"]
  },
  oats: {
    status: "Good",
    baseRisk: 0,
    conditions: {},
    reason: "High fiber",
    concerns: []
  }
};

export default ingredientDatabase;
const additives = {

  citric_acid: {
    status: "additive",
    baseRisk: 1,
    reason: "Acidity regulator and preservative",
    concerns: []
  },

  acetic_acid: {
    status: "additive",
    baseRisk: 1,
    reason: "Used as preservative and flavor enhancer",
    concerns: []
  },

  lactic_acid: {
    status: "additive",
    baseRisk: 1,
    reason: "Acidity regulator",
    concerns: []
  },

  malic_acid: {
    status: "additive",
    baseRisk: 1,
    reason: "Flavor enhancer and acidity regulator",
    concerns: []
  },

  phosphoric_acid: {
    status: "additive",
    baseRisk: 1,
    reason: "Common acidulant in soft drinks",
    concerns: ["Bone health concerns"]
  },

  ascorbic_acid: {
    status: "additive",
    baseRisk: 0,
    reason: "Vitamin C used as antioxidant",
    concerns: []
  },

  sodium_benzoate: {
    status: "additive",
    baseRisk: 1,
    reason: "Chemical preservative",
    concerns: []
  },

  potassium_sorbate: {
    status: "additive",
    baseRisk: 1,
    reason: "Food preservative",
    concerns: []
  },

  calcium_propionate: {
    status: "additive",
    baseRisk: 1,
    reason: "Bread preservative",
    concerns: []
  },

  sodium_nitrite: {
    status: "additive",
    baseRisk: 3,
    reason: "Preservative used in processed meats",
    concerns: ["Potential health risks"]
  },

  sodium_nitrate: {
    status: "additive",
    baseRisk: 3,
    reason: "Preservative used in cured foods",
    concerns: ["Potential health risks"]
  },

  msg: {
    status: "additive",
    baseRisk: 1,
    reason: "Flavor enhancer",
    concerns: []
  },

  monosodium_glutamate: {
    status: "additive",
    baseRisk: 1,
    reason: "Flavor enhancer",
    concerns: []
  },

  disodium_inosinate: {
    status: "additive",
    baseRisk: 1,
    reason: "Flavor enhancer",
    concerns: []
  },

  disodium_guanylate: {
    status: "additive",
    baseRisk: 1,
    reason: "Flavor enhancer",
    concerns: []
  },

  guar_gum: {
    status: "additive",
    baseRisk: 1,
    reason: "Thickening and stabilizing agent",
    concerns: []
  },

  xanthan_gum: {
    status: "additive",
    baseRisk: 1,
    reason: "Food stabilizer",
    concerns: []
  },

  locust_bean_gum: {
    status: "additive",
    baseRisk: 1,
    reason: "Natural thickener",
    concerns: []
  },

  gum_arabic: {
    status: "additive",
    baseRisk: 1,
    reason: "Natural stabilizer",
    concerns: []
  },

  carrageenan: {
    status: "additive",
    baseRisk: 1,
    reason: "Thickener used in dairy products",
    concerns: []
  },

  pectin: {
    status: "additive",
    baseRisk: 0,
    reason: "Natural gelling agent",
    concerns: []
  },

  gelatin: {
    status: "additive",
    baseRisk: 1,
    reason: "Protein-based gelling agent",
    concerns: []
  },

  cellulose_gum: {
    status: "additive",
    baseRisk: 1,
    reason: "Texture stabilizer",
    concerns: []
  },

  modified_starch: {
    status: "additive",
    baseRisk: 1,
    reason: "Processed thickening agent",
    concerns: []
  },

  modified_corn_starch: {
    status: "additive",
    baseRisk: 1,
    reason: "Modified starch used for texture",
    concerns: []
  },

  caramel_color: {
    status: "additive",
    baseRisk: 1,
    reason: "Coloring agent",
    concerns: []
  },

  annatto: {
    status: "additive",
    baseRisk: 1,
    reason: "Natural food coloring",
    concerns: []
  },

  tartrazine: {
    status: "additive",
    baseRisk: 2,
    reason: "Synthetic yellow food dye",
    concerns: []
  },

  sunset_yellow: {
    status: "additive",
    baseRisk: 2,
    reason: "Artificial food color",
    concerns: []
  },

  brilliant_blue: {
    status: "additive",
    baseRisk: 2,
    reason: "Synthetic blue coloring agent",
    concerns: []
  },

  titanium_dioxide: {
    status: "additive",
    baseRisk: 2,
    reason: "Whitening food additive",
    concerns: []
  },

  silicon_dioxide: {
    status: "additive",
    baseRisk: 1,
    reason: "Anti-caking agent",
    concerns: []
  },

  baking_soda: {
    status: "additive",
    baseRisk: 1,
    reason: "Leavening agent",
    concerns: []
  },

  sodium_bicarbonate: {
    status: "additive",
    baseRisk: 1,
    reason: "Leavening agent",
    concerns: []
  },

  potassium_bicarbonate: {
    status: "additive",
    baseRisk: 1,
    reason: "Leavening and pH control agent",
    concerns: []
  },

  sodium_carbonate: {
    status: "additive",
    baseRisk: 1,
    reason: "Acidity regulator",
    concerns: []
  },

  potassium_carbonate: {
    status: "additive",
    baseRisk: 1,
    reason: "Acidity regulator",
    concerns: []
  },

  ammonium_bicarbonate: {
    status: "additive",
    baseRisk: 1,
    reason: "Raising agent in baked foods",
    concerns: []
  },

  potassium_chloride: {
    status: "additive",
    baseRisk: 1,
    reason: "Salt substitute",
    concerns: []
  },

  calcium_chloride: {
    status: "additive",
    baseRisk: 1,
    reason: "Firming agent",
    concerns: []
  },

  potassium_iodate: {
    status: "additive",
    baseRisk: 1,
    reason: "Flour treatment agent",
    concerns: []
  },

  sodium_tripolyphosphate: {
    status: "additive",
    baseRisk: 1,
    reason: "Preservative and texture enhancer",
    concerns: []
  },

  triphosphates: {
    status: "additive",
    baseRisk: 1,
    reason: "Food stabilizer",
    concerns: []
  },

  diphosphates: {
    status: "additive",
    baseRisk: 1,
    reason: "Leavening and stabilizing agent",
    concerns: []
  },

  lecithin: {
    status: "additive",
    baseRisk: 1,
    reason: "Natural emulsifier",
    concerns: []
  },

  soy_lecithin: {
    status: "additive",
    baseRisk: 1,
    reason: "Soy-derived emulsifier",
    concerns: ["Allergen"]
  },

  mono_glycerides: {
    status: "additive",
    baseRisk: 1,
    reason: "Emulsifier used in processed foods",
    concerns: []
  },

  diglycerides: {
    status: "additive",
    baseRisk: 1,
    reason: "Emulsifier used in processed foods",
    concerns: []
  },

  polysorbate_80: {
    status: "additive",
    baseRisk: 1,
    reason: "Synthetic emulsifier",
    concerns: []
  },

  emulsifier_471: {
    status: "additive",
    baseRisk: 1,
    reason: "Common food emulsifier",
    concerns: []
  },

  emulsifier_472: {
    status: "additive",
    baseRisk: 1,
    reason: "Food stabilizer and emulsifier",
    concerns: []
  },

  stabilizer_415: {
    status: "additive",
    baseRisk: 1,
    reason: "Xanthan gum stabilizer",
    concerns: []
  },

  stabilizer_412: {
    status: "additive",
    baseRisk: 1,
    reason: "Guar gum stabilizer",
    concerns: []
  }
};

export default additives;
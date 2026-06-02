import healthy from "./ingredients/healthy.js";
import moderate from "./ingredients/moderate.js";
import harmful from "./ingredients/harmful.js";
import additives from "./ingredients/additives.js";
import allergens from "./ingredients/allergens.js";

const ingredientDatabase = {
  ...healthy,
  ...moderate,
  ...harmful,
  ...additives,
  ...allergens
};

export default ingredientDatabase;
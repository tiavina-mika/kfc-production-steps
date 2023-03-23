import { getPVC } from "./recipeUtils";

export const productType = [
  {
    value: "ALL",
    type: "ALL",
    label: "Tous",
    adj: ""
  },
  {
    value: "STARTER",
    type: "STARTER",
    label: "Entrée",
    adj: "Cette"
  },
  {
    value: "MAIN_COURSE",
    type: "MAIN_COURSE",
    label: "Plat",
    adj: "Ce"
  },
  {
    value: "MEAL_PREP",
    type: "MEAL_PREP",
    label: "Meal Prep",
    adj: "Ce"
  },
  {
    value: "YAOURT",
    type: "YAOURT",
    label: "Yaourt",
    adj: "Ce"
  },
  {
    value: "DESSERT",
    type: "DESSERT",
    label: "Dessert",
    adj: "Ce"
  },
  {
    value: "BREAD",
    type: "BREAD",
    label: "Pain",
    adj: "Ce"
  },
  {
    value: "CHEESE",
    type: "CHEESE",
    label: "Fromage",
    adj: "Ce"
  },
  {
    value: "BREAKFAST",
    type: "BREAKFAST",
    label: "Petit déjeuner",
    adj: "Ce"
  },
  {
    value: "DRINK",
    type: "DRINK",
    label: "Boisson",
    adj: "Cette"
  },
  {
    value: "SNACK",
    type: "SNACK",
    label: "Snack",
    adj: "Ce"
  },
  {
    value: "CUTLERY",
    type: "CUTLERY",
    label: "Couverts",
    adj: "Ce"
  },
  {
    value: "GOODIES",
    type: "GOODIES",
    label: "Goodies",
    adj: "Ce"
  }
];

export const getCellAlignment = (
  align: "left" | "center" | "right"
): string => {
  switch (align) {
    case "center":
      return "center";
    case "right":
      return "flex-end";
    default:
      return "flex-start";
  }
};

// export const getProductionStepsColumnWidth = (columns) =>
//   (PRODUCTION_STEPS.TABLE_WIDTH - PRODUCTION_STEPS.FIRST_COL_WIDTH) /
//   (columns.length - 1);

export function roundNumber(number, decimal = 4) {
  if (isNaN(number)) {
    return "";
  }

  const x = Math.pow(10, decimal);
  return Math.round(number * x) / x;
}

/**
 * Compute recipe advised sell price (old )
 */
export function computeRecipeASP(recipe) {
  let result = 0;

  if (recipe) {
    const currentRecipeType = productType.find(
      (item) => item.value === recipe.type
    );
    result = getPVC(
      "RECIPE",
      currentRecipeType ? currentRecipeType.value : "",
      recipe.cost
    ).pvc;
  }

  return result;
}

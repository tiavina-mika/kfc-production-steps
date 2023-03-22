import { PRODUCTION_STEPS } from "./constant";

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

export const getProductionStepsColumnWidth = (columns) =>
  (PRODUCTION_STEPS.TABLE_WIDTH - PRODUCTION_STEPS.FIRST_COL_WIDTH) /
  (columns.length - 1);

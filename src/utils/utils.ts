import {
  PRODUCTION_STEPS_FIRST_COL_WIDTH,
  PRODUCTION_STEPS_TABLE_WIDTH
} from "./constant";

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
  (PRODUCTION_STEPS_TABLE_WIDTH - PRODUCTION_STEPS_FIRST_COL_WIDTH) /
  (columns.length - 1);

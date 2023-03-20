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

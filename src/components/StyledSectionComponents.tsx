import React from "react";

import styled from "@emotion/styled";
import { red } from "@mui/material/colors";
import { Box, BoxProps } from "@mui/material";
import {
  COLORS,
  PRODUCTION_STEPS_COL_WIDTHS,
  PRODUCTION_STEPS_SPACINGS
} from "../utils/constant";
import { getCellAlignment } from "../utils/utils";

const widths = PRODUCTION_STEPS_COL_WIDTHS;

export const stickyStyle = {
  position: "sticky",
  left: 0,
  borderRight: "1px solid #cccccc"
};

export const StyledErrorMessage = styled("div")({
  marginLeft: 15,
  color: red[500]
});

export const StyledSectionFirstBodyColumn = styled((props: BoxProps) => (
  <Box {...props} sx={{ ...stickyStyle }} />
))({
  paddingLeft: PRODUCTION_STEPS_SPACINGS.SECTION_FIRST_COL_PL,
  paddingRight: 8,
  backgroundColor: COLORS.PRODUCTION_STEPS_BLUE,
  width: widths[0]
});

// --------------------------------------- //
// ---------------- Steps ---------------- //
// --------------------------------------- //
type StyledStepFirstBodyColumnProps = {
  leftStep?: number;
};
export const StyledStepFirstBodyColumn = styled(
  (props: BoxProps) => <Box {...props} sx={{ ...stickyStyle }} />,
  {
    shouldForwardProp: (prop) => prop !== "leftStep"
  }
)<StyledStepFirstBodyColumnProps>(({ leftStep = 0 }) => ({
  paddingLeft: PRODUCTION_STEPS_SPACINGS.STEP_FIRST_COL_PL + leftStep,
  paddingRight: 8,
  backgroundColor: COLORS.PRODUCTION_STEPS_GREY,
  width: widths[0],
  paddingTop: 16,
  paddingBottom: 17
}));

type StyledTextProps = {
  disabled?: boolean;
};
export const StyledStepText = styled(Box, {
  shouldForwardProp: (prop) => prop !== "disabled"
})<StyledTextProps>(({ disabled = false }) => {
  let defaultStyles: Record<string, any> = {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 1.5
  };

  if (disabled) {
    defaultStyles.color = COLORS.PRODUCTION_STEPS_DISABLE_TEXT;
  } else {
    defaultStyles.color = COLORS.PRODUCTION_STEPS_TEXT_GREY;
  }

  return defaultStyles;
});

const stepBodyCellsStyle = {
  paddingRight: 16,
  paddingLeft: 16
};

type StyledStepBodyCellProps = {
  align: "left" | "center" | "right";
  width: number;
};
export const StyledStepBodyCell = styled(Box, {
  shouldForwardProp: (prop) => prop !== "align" && prop !== "width"
})<StyledStepBodyCellProps>((props) => {
  let defaultStyles: Record<string, any> = {
    display: "flex",
    alignItems: "center",
    width: props.width,
    alignSelf: "stretch",
    margin: 0,
    ...stepBodyCellsStyle
  };

  if (props.align) {
    defaultStyles.justifyContent = getCellAlignment(props.align);
  }

  return defaultStyles;
});
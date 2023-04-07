import React from "react";

import styled from "@emotion/styled";
import { red } from "@mui/material/colors";
import { Box, BoxProps } from "@mui/material";
import {
  COLORS,
  PRODUCTION_STEPS_COL_WIDTHS,
  PRODUCTION_STEPS_SPACINGS
} from "../utils/constant";

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

export const StyledStepFirstBodyColumn = styled((props: BoxProps) => (
  <Box {...props} sx={{ ...stickyStyle }} />
))({
  paddingLeft: PRODUCTION_STEPS_SPACINGS.STEP_FIRST_COL_PL,
  paddingRight: 8,
  backgroundColor: COLORS.PRODUCTION_STEPS_GREY,
  width: widths[0],
  paddingTop: 8,
  paddingBottom: 17
});

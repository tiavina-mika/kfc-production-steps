import React, { FC } from "react";

import styled from "@emotion/styled";
import { Box, BoxProps, Stack, Typography } from "@mui/material";

import { getCellAlignment, roundNumber } from "../../utils/utils";
import {
  COLORS,
  PRODUCTION_STEPS_COL_WIDTHS,
  PRODUCTION_STEPS_FIST_COL_PL
} from "../../utils/constant";

const widths = PRODUCTION_STEPS_COL_WIDTHS;
export const COMPONENT_NAME = "SECTIONS";

// ----------------------------------------------- //
// -------------------- styles ------------------- //
// ----------------------------------------------- //
const stickyStyle = {
  position: "sticky",
  left: 0,
  borderRight: "1px solid #cccccc"
};

const cellsStyle = {
  paddingRight: 16,
  paddingLeft: 16
};

// ----------------------------------------------- //
// -------------- styled components -------------- //
// ----------------------------------------------- //
// -------------- Table -------------- //
const StyledFirstBodyColumn = styled((props: BoxProps) => (
  <Box {...props} sx={{ ...stickyStyle }} />
))({
  paddingLeft: PRODUCTION_STEPS_FIST_COL_PL,
  paddingRight: 8,
  backgroundColor: COLORS.PRODUCTION_STEPS_GREY,
  width: widths[0],
  paddingTop: 8,
  paddingBottom: 17
});

// body cell
type StyledBodyCellProps = {
  align: "left" | "center" | "right";
  width: number;
};
const StyledBodyCell = styled(Box, {
  shouldForwardProp: (prop) => prop !== "align" && prop !== "width"
})<StyledBodyCellProps>((props) => {
  let defaultStyles: Record<string, any> = {
    display: "flex",
    alignItems: "center",
    width: props.width,
    alignSelf: "stretch",
    margin: 0,
    ...cellsStyle
  };

  if (props.align) {
    defaultStyles.justifyContent = getCellAlignment(props.align);
  }

  return defaultStyles;
});

const StyledText = styled(Typography)({
  fontWeight: 600,
  fontSize: 14,
  color: COLORS.PRODUCTION_STEPS_TEXT_GREY
});

type Props = {
  step: Record<string, any>;
};

const StepPreview: FC<Props> = ({ step }) => {
  return (
    <>
      <StyledFirstBodyColumn className="flexRow center">
        <Stack spacing={1}>
          <StyledText>{step.name}</StyledText>
          <Typography>{step.description}</Typography>
        </Stack>
      </StyledFirstBodyColumn>
      <StyledBodyCell align="left" width={widths[1]}>
        <StyledText>{step.inputWeight || "-"}</StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[2]}>
        <StyledText>-</StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[3]}>
        <StyledText>
          {step.cost ? `${roundNumber(step.cost, 3)} €` : "_"}
        </StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[4]}>
        <StyledText>-</StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[5]}>
        <StyledText>-</StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[6]}>
        <StyledText>{step.outputWeight || "-"}</StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[7]}>
        <StyledText>-</StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[8]}>
        <StyledText>-</StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[9]}>
        <StyledText>-</StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[10]}>
        <StyledText>-</StyledText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[11]}>
        <StyledText>-</StyledText>
      </StyledBodyCell>
    </>
  );
};

export default StepPreview;

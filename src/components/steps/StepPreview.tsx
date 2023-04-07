import React, { FC } from "react";

import styled from "@emotion/styled";
import { Box, Stack, Typography } from "@mui/material";

import { getCellAlignment, roundNumber } from "../../utils/utils";
import { PRODUCTION_STEPS_COL_WIDTHS } from "../../utils/constant";
import {
  StyledStepFirstBodyColumn,
  StyledStepText
} from "../StyledSectionComponents";
import StepNameDescription from "./StepNameDescription";

const widths = PRODUCTION_STEPS_COL_WIDTHS;
export const COMPONENT_NAME = "SECTIONS";

// ----------------------------------------------- //
// -------------------- styles ------------------- //
// ----------------------------------------------- //
const cellsStyle = {
  paddingRight: 16,
  paddingLeft: 16
};

// ----------------------------------------------- //
// -------------- styled components -------------- //
// ----------------------------------------------- //
// -------------- Table -------------- //
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

type Props = {
  step: Record<string, any>;
  index: number;
};

const StepPreview: FC<Props> = ({ step, index }) => {
  return (
    <>
      <StyledStepFirstBodyColumn className="flexRow center">
        <StepNameDescription
          name={step.name}
          description={step.description}
          index={index}
        />
      </StyledStepFirstBodyColumn>
      <StyledBodyCell align="left" width={widths[1]}>
        <StyledStepText>{step.inputWeight || "-"}</StyledStepText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[2]}>
        <StyledStepText>-</StyledStepText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[3]}>
        <StyledStepText>
          {step.cost ? `${roundNumber(step.cost, 3)} €` : "_"}
        </StyledStepText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[4]}>
        <StyledStepText>-</StyledStepText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[5]}>
        <StyledStepText>-</StyledStepText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[6]}>
        <StyledStepText>{step.outputWeight || "-"}</StyledStepText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[7]}>
        <StyledStepText>-</StyledStepText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[8]}>
        <StyledStepText>-</StyledStepText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[9]}>
        <StyledStepText>-</StyledStepText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[10]}>
        <StyledStepText>-</StyledStepText>
      </StyledBodyCell>
      <StyledBodyCell align="left" width={widths[11]}>
        <StyledStepText>-</StyledStepText>
      </StyledBodyCell>
    </>
  );
};

export default StepPreview;

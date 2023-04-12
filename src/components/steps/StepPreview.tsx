import React, { FC } from "react";

import { roundNumber } from "../../utils/utils";
import { PRODUCTION_STEPS_COL_WIDTHS } from "../../utils/constant";
import {
  StyledStepBodyCell,
  StyledStepFirstBodyColumn,
  StyledStepText
} from "../StyledSectionComponents";
import StepNameDescription from "./StepNameDescription";

const widths = PRODUCTION_STEPS_COL_WIDTHS;

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
      <StyledStepBodyCell align="left" width={widths[1]}>
        <StyledStepText>{step.inputWeight || "-"}</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[2]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[3]}>
        <StyledStepText>
          {step.cost ? `${roundNumber(step.cost, 3)} €` : "_"}
        </StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[4]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[5]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[6]}>
        <StyledStepText>{step.outputWeight || "-"}</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[7]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[8]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[9]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[10]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[11]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
    </>
  );
};

export default StepPreview;

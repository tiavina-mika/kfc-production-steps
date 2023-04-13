import React, { FC } from "react";

import { Stack, styled } from "@mui/material";

import { StyledStepText } from "../StyledSectionComponents";

export const StyledDescription = styled(StyledStepText)({
  fontWeight: 500
});

type Props = {
  name: string;
  description: string;
  index: number;
};

const StepNameDescription: FC<Props> = ({ name, description, index }) => {
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1}>
        <StyledStepText>{index + 1}.</StyledStepText>
        <StyledStepText>{name || "-"}</StyledStepText>
      </Stack>
      <StyledDescription>{description}</StyledDescription>
    </Stack>
  );
};

export default StepNameDescription;

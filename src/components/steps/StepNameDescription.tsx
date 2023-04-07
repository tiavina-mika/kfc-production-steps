import React, { FC } from "react";

import { Stack, Typography } from "@mui/material";

import { StyledStepText } from "../StyledSectionComponents";

type Props = {
  name: string;
  description: string;
  index: number;
};

const StepNameDescription: FC<Props> = ({ name, description, index }) => {
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1}>
        <Typography>{index + 1}.</Typography>
        <StyledStepText>{name}</StyledStepText>
      </Stack>
      <Typography>{description}</Typography>
    </Stack>
  );
};

export default StepNameDescription;

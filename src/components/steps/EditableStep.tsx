import React, { FC } from "react";

import { Box } from "@mui/material";

import StepPreview from "./StepPreview";

type Props = {
  step: Record<string, any>;
  index: number;
  // steps: Record<string, any>[];
  // index: number;
  // isHover: boolean;
  // isDeleteHover: boolean;
  // genericSections?: Record<string, any>[];
  // onClearFocus: () => void;
  // onFieldFocus: () => void;
  // onFieldBlur: () => void;
  // onKeyUp: (event: any, setFieldTouched: any) => void;
  // setFieldValue: (
  //   field: string,
  //   value: any,
  //   shouldValidate?: boolean | undefined
  // ) => Promise<FormikErrors<any>> | Promise<void>;
  // hasError: (index: number) => boolean;
  // onDeleteBlur: () => void;
};

const EditableStep: FC<Props> = ({
  step,
  index
  // steps,
  // index,
  // for style
  // isHover,
  // isDeleteHover,
  // genericSections,
  // setFieldValue,
  // onClearFocus,
  // onFieldFocus,
  // onFieldBlur,
  // onKeyUp,
  // hasError,
  // onDeleteBlur
}) => {
  const _stopPropagation = (event) => event && event.stopPropagation();

  return (
    <Box
      sx={{
        display: "flex"
      }}
      onClick={_stopPropagation}
    >
      <StepPreview step={step} index={index} />
    </Box>
  );
};

export default EditableStep;

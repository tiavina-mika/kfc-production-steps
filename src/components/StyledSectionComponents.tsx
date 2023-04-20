import React from "react";

import styled from "@emotion/styled";
import { red } from "@mui/material/colors";
import {
  Box,
  BoxProps,
  InputBase,
  Select,
  SelectProps,
  TextField
} from "@mui/material";
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

export const StyledProductionStepTextField = styled(TextField)({
  height: 30,
  background: "#fff",
  borderRadius: 4,
  "& .MuiInputBase-root, .MuiAutocomplete-inputRoot.MuiInputBase-root": {
    height: "100%",
    "&:before, :after": {
      borderBottom: "none",
      "&:hover": {
        borderBottom: "none"
      }
    },
    "& .MuiInputBase-input": {
      paddingLeft: 7
    }
  },
  "& .MuiInput-input, .MuiAutocomplete-input": {
    fontWeight: 600,
    fontSize: 14,
    color: "#414141"
  }
});

export const StyledProductionStepInputBase = styled(InputBase)({
  "& .MuiInputBase-input": {
    background: "#fff",
    borderRadius: 4,
    paddingLeft: 7,
    fontWeight: 600,
    fontSize: 14,
    color: "#414141",
    lineHeight: "1em",
    display: "flex",
    alignItems: "center",
    "&:before, :after": {
      borderBottom: "none",
      "&:hover": {
        borderBottom: "none"
      }
    }
  }
});

// --------------------------------------- //
// -------------- Sections --------------- //
// --------------------------------------- //
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

type StyledStepBodyCellProps = {
  align: "left" | "center" | "right";
  width: number;
  px?: number;
};
export const StyledStepBodyCell = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "align" && prop !== "width" && prop !== "px"
})<StyledStepBodyCellProps>(({ width, align, px = 16 }) => {
  let defaultStyles: Record<string, any> = {
    display: "flex",
    alignItems: "center",
    width,
    alignSelf: "stretch",
    margin: 0,
    paddingLeft: px,
    paddingRight: px
  };

  if (align) {
    defaultStyles.justifyContent = getCellAlignment(align);
  }

  return defaultStyles;
});

// type StyledTextFieldProps = {
//   width?: number;
// };
// const StyledTextField = styled(TextField, {
//   shouldForwardProp: (prop) => prop !== "width"
// })<StyledTextFieldProps>(({ width }) => ({
//   width,
//   height: 30,
//   background: "#fff",
//   borderRadius: 4,
//   "& .MuiInputBase-root": {
//     "&:before, :after": {
//       borderBottom: "none",
//       "&:hover": {
//         borderBottom: "none"
//       }
//     },
//     "& .MuiInputBase-input": {
//       paddingLeft: 7
//     }
//   },
//   "& .MuiInput-input": {
//     fontWeight: 600,
//     fontSize: 14,
//     color: "#414141"
//   }
// }));

export const StyledStepDescriptionText = styled(StyledStepText)({
  fontWeight: 400
});

type StyledProductionStepsSelectProps = {
  width: number;
};
export const StyledProductionStepsSelect = styled(
  (props: SelectProps) => <Select {...props} />,
  {
    shouldForwardProp: (prop) => prop !== "width"
  }
)<StyledProductionStepsSelectProps & SelectProps>((props) => ({
  width: props.width
}));

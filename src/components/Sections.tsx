import React, { FC } from "react";

import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import {
  Accordion,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  Box,
  BoxProps,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { getCellAlignment } from "../utils/utils";
import { COLORS, PRODUCTION_STEPS } from "../utils/constant";

// ----------------------------------------------- //
// -------------------- styles ------------------- //
// ----------------------------------------------- //
const stickyStyle = {
  position: "sticky",
  left: 0,
  borderRight: "1px solid " + grey[300]
};

const firstColumnStyle = {
  width: PRODUCTION_STEPS.FIRST_COL_WIDTH
};

const sx = {
  sticky: stickyStyle,
  firstColumn: firstColumnStyle,
  cell: {
    paddingRight: 8,
    paddingLeft: 8
  }
};

// ----------------------------------------------- //
// -------------- styled components -------------- //
// ----------------------------------------------- //
// -------------- Table -------------- //
const StyledFirstBodyColumn = styled((props: BoxProps) => (
  <Box {...props} sx={{ ...stickyStyle }} />
))({
  paddingLeft: PRODUCTION_STEPS.FIRST_COL_PADDING_LEFT,
  paddingRight: 8,
  backgroundColor: COLORS.PRODUCTION_STEPS_BLUE,
  width: PRODUCTION_STEPS.FIRST_COL_WIDTH
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
    ...sx.cell
  };

  if (props.align) {
    defaultStyles.justifyContent = getCellAlignment(props.align);
  }

  return defaultStyles;
});

// -------------- Accordion -------------- //
const StyledAccordion = styled((props: AccordionProps) => (
  <Accordion {...props} />
))({
  "&:not(:last-child)": {
    borderBottom: 0
  },
  "&:before": {
    display: "none"
  }
});

const StyledAccordionSummary = styled((props: AccordionSummaryProps) => (
  <AccordionSummary {...props} />
))({
  flexDirection: "row-reverse",
  position: "relative",
  // opened and closed expanded icon
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded,& .MuiAccordionSummary-expandIconWrapper": {
    position: "sticky",
    left: 50
  },
  // row
  "& .MuiAccordionSummary-content": {
    padding: 0,
    margin: 0,
    minHeight: 60,
    borderBottom: "1px solid " + grey[300],
    marginLeft: -48,
    backgroundColor: COLORS.PRODUCTION_STEPS_BLUE
  }
});

const StyledText = styled(Typography)({
  fontWeight: 600,
  fontSize: 16
});

type Props = {
  sections: any[];
  width: number;
};

const Sections: FC<Props> = ({ sections, width }) => {
  return (
    <Box className="flexColumn">
      {sections.map((section, index) => (
        <StyledAccordion
          elevation={0}
          defaultExpanded
          square
          disableGutters
          key={section.name + index}
        >
          <StyledAccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: "1.8rem" }} />}
          >
            <StyledFirstBodyColumn className="flexRow center">
              <StyledText>{section.name}</StyledText>
            </StyledFirstBodyColumn>
            <StyledBodyCell align="center" width={width}>
              <StyledText>{section.inputWeight}</StyledText>
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              <StyledText>-</StyledText>
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              <StyledText>{section.foodcost}</StyledText>
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              <StyledText>-</StyledText>
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              <StyledText>-</StyledText>
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              <StyledText>{section.outputWeight}</StyledText>
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              <StyledText>-</StyledText>
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              <StyledText>-</StyledText>
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              <StyledText>-</StyledText>
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              <StyledText>-</StyledText>
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              <StyledText>-</StyledText>
            </StyledBodyCell>
          </StyledAccordionSummary>
        </StyledAccordion>
      ))}
    </Box>
  );
};

export default Sections;

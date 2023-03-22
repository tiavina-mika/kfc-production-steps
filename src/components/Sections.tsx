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
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

import { getCellAlignment } from "../utils/utils";
import { PRODUCTION_STEPS_FIRST_COL_WIDTH } from "../utils/constant";

// ----------------------------------------------- //
// -------------------- styles ------------------- //
// ----------------------------------------------- //
const stickyStyle = {
  position: "sticky",
  left: 0,
  borderRight: "1px solid " + grey[300]
};

const firstColumnStyle = {
  width: PRODUCTION_STEPS_FIRST_COL_WIDTH
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
  paddingLeft: 80,
  paddingRight: 8,
  backgroundColor: "#fff",
  width: PRODUCTION_STEPS_FIRST_COL_WIDTH
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
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
    position: "sticky",
    left: 50
  },
  "& .MuiAccordionSummary-content": {
    padding: 0,
    margin: 0,
    minHeight: 60,
    borderBottom: "1px solid " + grey[300],
    marginLeft: -40
  },
  "&.MuiAccordionSummary-root": {
    paddingLeft: 0
  }
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
            expandIcon={
              <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />
            }
          >
            {/* <StyledRow className="flexRow"> */}
            <StyledFirstBodyColumn>
              <p>{section.name}</p>
            </StyledFirstBodyColumn>
            <StyledBodyCell align="center" width={width}>
              {section.inputWeight}
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              {section.pricePerKg}
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              {section.foodcost}
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              {section.transformation}
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              {section.transformationRate}
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              {section.outputWeight}
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              {section.kitchenArea}
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              {section.machineType}
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              {section.machineSetting}
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              {section.stepDurationValue}
            </StyledBodyCell>
            <StyledBodyCell align="center" width={width}>
              {section.stepDurationUnit}
            </StyledBodyCell>
            {/* </StyledRow>  */}
          </StyledAccordionSummary>
        </StyledAccordion>
      ))}
    </Box>
  );
};

export default Sections;

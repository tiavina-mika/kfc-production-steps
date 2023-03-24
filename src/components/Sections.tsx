import React, { FC } from "react";

import styled from "@emotion/styled";
import {
  Accordion,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  Box,
  BoxProps,
  Typography
} from "@mui/material";

import { getCellAlignment, roundNumber } from "../utils/utils";
import {
  COLORS,
  PRODUCTION_STEPS_COL_WIDTHS,
  PRODUCTION_STEPS_FIST_COL_PL
} from "../utils/constant";

const widths = PRODUCTION_STEPS_COL_WIDTHS;

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
  backgroundColor: COLORS.PRODUCTION_STEPS_BLUE,
  width: widths[0]
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
    left: 46
  },
  // row
  "& .MuiAccordionSummary-content": {
    padding: 0,
    margin: 0,
    height: 56,
    borderBottom: "1px solid #cccccc",
    marginLeft: -28, // important! for the summary to not take account of the expand icon space
    backgroundColor: COLORS.PRODUCTION_STEPS_BLUE
  }
});

const StyledText = styled(Typography)({
  fontWeight: 600,
  fontSize: 14,
  color: COLORS.PRODUCTION_STEPS_TEXT_GREY
});

type Props = {
  sections: any[];
  isEdition: boolean;
};

const Sections: FC<Props> = ({ sections, isEdition }) => {
  // do not display sections row in preview if it's empty
  // dsiplay an empty row if sections is empty in edition mode
  // alway has a default section, see: getDefaultSection()
  if (!isEdition && !(sections.length && sections[0].id)) return;

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
            expandIcon={<img alt="chevron" src="/icons/chevron-down.svg" />}
          >
            <StyledFirstBodyColumn className="flexRow center">
              <StyledText>{section.name || "-"}</StyledText>
            </StyledFirstBodyColumn>
            <StyledBodyCell align="left" width={widths[1]}>
              <StyledText>{section.inputWeight || "-"}</StyledText>
            </StyledBodyCell>
            <StyledBodyCell align="left" width={widths[2]}>
              <StyledText>-</StyledText>
            </StyledBodyCell>
            <StyledBodyCell align="left" width={widths[3]}>
              <StyledText>
                {section.cost ? `${roundNumber(section.cost, 3)} €` : "_"}
              </StyledText>
            </StyledBodyCell>
            <StyledBodyCell align="left" width={widths[4]}>
              <StyledText>-</StyledText>
            </StyledBodyCell>
            <StyledBodyCell align="left" width={widths[5]}>
              <StyledText>-</StyledText>
            </StyledBodyCell>
            <StyledBodyCell align="left" width={widths[6]}>
              <StyledText>{section.outputWeight || "-"}</StyledText>
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
          </StyledAccordionSummary>
          {/* <AccordionDetails>
            <Typography>
              Production steps for section "{section.name}"
            </Typography>
          </AccordionDetails> */}
        </StyledAccordion>
      ))}
    </Box>
  );
};

export default Sections;

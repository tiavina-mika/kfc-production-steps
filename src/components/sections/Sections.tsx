import React, { FC } from "react";

import styled from "@emotion/styled";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  Box
} from "@mui/material";

import { COLORS, PRODUCTION_STEPS_SPACINGS } from "../../utils/constant";
import SectionPreview from "./SectionPreview";
import EditableSection from "./EditableSection";
import Steps from "../steps/Steps";

export const COMPONENT_NAME = "SECTIONS";

// ----------------------------------------------- //
// -------------- styled components -------------- //
// ----------------------------------------------- //
// -------------- Table -------------- //

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
    left: PRODUCTION_STEPS_SPACINGS.ACCORDION_EXPANDED_ICON_LEFT
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

export type IHoveredRow = {
  component: string;
  index: number;
  parentIndex?: number;
};
type Props = {
  sections: any[];
  isEdition: boolean;
  onRowHover: (
    component: string,
    index: number,
    parendIndex?: number | null
  ) => void;
  onRowBlur: () => void;
  hoveredRow: IHoveredRow;
  genericSections?: Record<string, any>[];
  onClearFocus: () => void;
  onFieldFocus: () => void;
  onFieldBlur: any;
  onKeyUp: (event: any, setFieldTouched: any) => void;
  onDeleteHover: (
    component: string,
    index: number,
    parendIndex?: number | null
  ) => void;
  deleteHover: Record<string, any>;
  errors: Record<string, any>;
  setFieldValue: any;
  onDeleteBlur: () => void;
  formValues: Record<string, any>;
  setValues: any;
};

const Sections: FC<Props> = ({
  sections,
  isEdition,
  onRowHover,
  onRowBlur,
  hoveredRow,
  genericSections,
  onClearFocus,
  onFieldFocus,
  onFieldBlur,
  onKeyUp,
  onDeleteHover,
  deleteHover,
  setFieldValue,
  errors,
  onDeleteBlur,
  formValues,
  setValues
}) => {
  // do not display sections row in preview if it's empty
  // dsiplay an empty row if sections is empty in edition mode
  // alway has a default section, see: getDefaultSection()
  if (!isEdition && !(sections.length && sections[0].id)) return;

  const _isHover = (index: number): boolean => {
    return (
      hoveredRow &&
      COMPONENT_NAME === hoveredRow.component &&
      hoveredRow.index === index
    );
  };

  const _isDeleteHover = (index: number): boolean => {
    return (
      deleteHover &&
      COMPONENT_NAME === deleteHover.component &&
      deleteHover.index === index
    );
  };

  const _hasError = (index: number): boolean =>
    errors.sections &&
    errors.sections[index] &&
    (errors.sections[index].name || errors.sections[index].parentPercent);

  const _onKeyDown = (e, section, isGrossWeight = false) => {
    // if (section.parentId) {
    //     setCurrentGenericSection(parseSectionToObject([genericSections.find(elm => elm.id === section.parentId)])[0])
    //     setCurrentSection(section)
    //     setOpenChangedModal(true)
    // } else if (isGrossWeight && section.preventGrossWeightChange) {
    //     setCurrentPart(section)
    //     setOpenGrossWeightChangeModal(true)
    // }
  };

  return (
    <Box className="flexColumn">
      {sections.map((section, index) => (
        <StyledAccordion
          elevation={0}
          defaultExpanded
          square
          disableGutters
          key={index}
        >
          <StyledAccordionSummary
            expandIcon={<img alt="chevron" src="/icons/chevron-down.svg" />}
            onMouseEnter={() => onRowHover(COMPONENT_NAME, index)}
            onMouseLeave={onRowBlur}
          >
            {isEdition ? (
              <EditableSection
                sections={sections}
                section={section}
                index={index}
                isHover={_isHover(index)}
                isDeleteHover={_isDeleteHover(index)}
                genericSections={genericSections}
                setFieldValue={setFieldValue}
                onClearFocus={onClearFocus}
                onFieldFocus={onFieldFocus}
                onFieldBlur={onFieldBlur}
                onKeyUp={onKeyUp}
                onDeleteBlur={onDeleteBlur}
                hasError={_hasError}
                formValues={formValues}
                setValues={setValues}
              />
            ) : (
              <SectionPreview section={section} />
            )}
          </StyledAccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <Steps
              steps={section.productionSteps}
              isEdition={isEdition}
              hoveredRow={hoveredRow}
              sectionIndex={index}
              onFieldFocus={onFieldFocus}
              onFieldBlur={onFieldBlur}
              onKeyUp={onKeyUp}
              onRowHover={onRowHover}
              onRowBlur={onRowBlur}
              onKeyDown={(e) => _onKeyDown(e, section)}
            />
          </AccordionDetails>
        </StyledAccordion>
      ))}
    </Box>
  );
};

export default Sections;

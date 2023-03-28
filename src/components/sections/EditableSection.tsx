import React, { FC, useState } from "react";

import styled from "@emotion/styled";
import {
  Autocomplete,
  Box,
  BoxProps,
  Stack,
  TextField,
  Typography
} from "@mui/material";

import { getCellAlignment, roundNumber } from "../../utils/utils";
import {
  COLORS,
  PRODUCTION_STEPS_COL_WIDTHS,
  PRODUCTION_STEPS_FIST_COL_PL
} from "../../utils/constant";
import {
  computeSectionData,
  parseSectionToObject
} from "../../utils/recipeUtils";
import { getDefaultSection } from "../../utils/recipeUtils";
import { ErrorMessage, FormikErrors } from "formik";
import { StyledErrorMessage } from "../StyledSectionComponents";

const widths = PRODUCTION_STEPS_COL_WIDTHS;
export const COMPONENT_NAME = "SECTIONS";

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

const StyledText = styled(Typography)({
  fontWeight: 500,
  fontSize: 14,
  color: "#9B9B9B"
});

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiAutocomplete-inputRoot": {
    width: 512,
    height: 30,
    background: "#fff",
    borderRadius: 4
  }
});

const StyledAutocompleteTextField = styled(TextField)({
  "& .MuiAutocomplete-inputRoot.MuiInputBase-root": {
    "&:before": {
      borderBottom: "none",
      "&:hover": {
        borderBottom: "none"
      }
    },
    "& .MuiAutocomplete-input": {
      padding: 4
    }
  },
  "& .MuiInput-input": {
    fontWeight: 600,
    fontSize: 14,
    color: "#414141"
  }
});

type Props = {
  sections: Record<string, any>[];
  section: Record<string, any>;
  index: number;
  isHover: boolean;
  isDeleteHover: boolean;
  genericSections?: Record<string, any>[];
  onClearFocus: () => void;
  onFieldFocus: () => void;
  onFieldBlur: () => void;
  onKeyUp: (event: any, setFieldTouched: any) => void;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<any>> | Promise<void>;
};

const EditableSection: FC<Props> = ({
  sections,
  section,
  index,
  // for style
  isHover,
  isDeleteHover,
  genericSections,
  setFieldValue,
  onClearFocus,
  onFieldFocus,
  onFieldBlur,
  onKeyUp
}) => {
  const [changed, setChanged] = useState<number>(0);

  const _stopPropagation = (event) => event && event.stopPropagation();

  const _onGenericSectionChange = (event, formValue, sectionIndex, reason) => {
    if (!event) return;
    let value = formValue;
    if (reason === "selectOption") {
      if (value.get) {
        value = value.get("name");
      } else {
        value = value.name;
      }
    }

    const section = genericSections.find(
      (section) => (section.get ? section.get("name") : section.name) === value
    );

    if (section) {
      computeSectionData(section, "productionSteps");
    }

    const newSections = [].concat(sections);
    newSections[sectionIndex].name = value;

    if (reason === "selectOption" && section) {
      newSections[sectionIndex] = section;
      newSections[sectionIndex].error = false;
      newSections[sectionIndex].id = null;
      newSections[sectionIndex].parentId = section.id;
      newSections[sectionIndex].parentPercent = 100;
    }

    if (section && !newSections[sectionIndex].parentId) {
      newSections[sectionIndex].parentId = null;
      newSections[sectionIndex].parentPercent = 0;
    }

    setFieldValue("sections", newSections);

    if (reason === "selectOption" && section) {
      setChanged(changed + 1);
      onClearFocus();
    }

    if (event.target) {
      _stopPropagation(event);
    }
  };

  const getOptionLabel = (option: string | Record<string, any>) => {
    if (typeof option === "string") {
      return option;
    }

    if (option.get) {
      return option.get("name");
    }

    return option.name;
  };

  return (
    <Box
      sx={{
        display: "flex"
      }}
      onClick={_stopPropagation}
      // className={`${isHover ? classes.editHover : ""} ${error || isDeleteHover ? classes.sectionLineError : ""} ${(section.parentId)?classes.sectionInherited:""}`}
    >
      <StyledFirstBodyColumn className="flexRow center">
        <Stack direction="column" spacing={1} sx={{ flex: 1 }}>
          <StyledAutocomplete
            freeSolo
            disableClearable
            // className={classes.autocompleteContainer}
            inputValue={
              typeof section.name === "string"
                ? section.name
                : section.name.get("name")
            }
            getOptionLabel={getOptionLabel}
            options={genericSections}
            onChange={(event, newInputValue, reason) => {
              _onGenericSectionChange(event, newInputValue, index, reason);
            }}
            onInputChange={(event, newInputValue) => {
              _onGenericSectionChange(
                event,
                newInputValue,
                index,
                "input-change"
              );
            }}
            renderInput={(params) => (
              <StyledAutocompleteTextField
                {...params}
                name={`sections[${index}].name`}
                onClick={_stopPropagation}
                onFocus={onFieldFocus}
                onBlur={onFieldBlur}
                onKeyUp={onKeyUp as any}
                variant="standard"
                fullWidth
              />
            )}
          />
          <ErrorMessage
            name={`sections[${index}].name`}
            render={(message) => (
              <StyledErrorMessage>{message}</StyledErrorMessage>
            )}
          />
        </Stack>
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
    </Box>
  );
};

export default EditableSection;
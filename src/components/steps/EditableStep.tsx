import React, { FC } from "react";

import { Box, Stack, styled } from "@mui/material";

import {
  StyledErrorMessage,
  StyledProductionStepTextField,
  StyledStepBodyCell,
  StyledStepDescriptionText,
  StyledStepFirstBodyColumn,
  StyledStepText
} from "../StyledSectionComponents";
import StepNameDescription from "./StepNameDescription";
import { roundNumber } from "../../utils/utils";
import { PRODUCTION_STEPS_COL_WIDTHS } from "../../utils/constant";
import { ErrorMessage, Field } from "formik";

const widths = PRODUCTION_STEPS_COL_WIDTHS;

const StyledTextFieldName = styled(StyledProductionStepTextField)({
  width: 460,
  "& .MuiInputBase-root": {
    height: "100%"
  }
});
const StyledTextFieldDescription = styled(StyledProductionStepTextField)({
  width: 391,
  "& .MuiInputBase-root": {
    height: "100%"
  }
});

const FormikTextField = ({ field, ...props }) => (
  <StyledTextFieldName {...field} {...props} />
);

const FormikTextFieldDescription = ({ field, ...props }) => (
  <StyledTextFieldDescription {...field} {...props} />
);

type Props = {
  step: Record<string, any>;
  index: number;
  isEdition?: boolean;
  // steps: Record<string, any>[];
  // index: number;
  isHover: boolean;
  // isDeleteHover: boolean;
  // genericSections?: Record<string, any>[];
  // onClearFocus: () => void;
  onFieldFocus: () => void;
  onFieldBlur: () => void;
  onKeyUp: (event: any, setFieldTouched: any) => void;
  // onKeyDown: (event: any) => void;
  sectionIndex: number;
  // setFieldValue: (
  //   field: string,
  //   value: any,
  //   shouldValidate?: boolean | undefined
  // ) => Promise<FormikErrors<any>> | Promise<void>;
  hasError: (index: number) => boolean;
  // onDeleteBlur: () => void;
};

const EditableStep: FC<Props> = ({
  step,
  index,
  isEdition,
  sectionIndex,
  // steps,
  // index,
  // for style
  isHover,
  // isDeleteHover,
  // genericSections,
  // setFieldValue,
  // onClearFocus,
  onFieldFocus,
  onFieldBlur,
  onKeyUp,
  // onKeyDown
  hasError
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
      {/* <StepPreview step={step} index={index} isEdition={isEdition} /> */}
      <StyledStepFirstBodyColumn className="flexRow center">
        {isHover ? (
          <Stack direction="column" spacing={1} sx={{ flex: 1 }}>
            <Stack direction="column" spacing={1} sx={{ flex: 1 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <StyledStepText>{index + 1}.</StyledStepText>
                <Field
                  component={FormikTextField}
                  name={`sections[${sectionIndex}].productionSteps[${index}].name`}
                  onClick={_stopPropagation}
                  onFocus={onFieldFocus}
                  onBlur={onFieldBlur}
                  onKeyUp={onKeyUp}
                  // onKeyDown={onKeyDown}
                />
              </Stack>
              <ErrorMessage
                name={`sections[${sectionIndex}].productionSteps[${index}].name`}
                render={(message) => (
                  <StyledErrorMessage>{message}</StyledErrorMessage>
                )}
              />
            </Stack>
            <Stack direction="column" spacing={1} sx={{ flex: 1 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <StyledStepDescriptionText>
                  Instructions :
                </StyledStepDescriptionText>
                <Field
                  component={FormikTextFieldDescription}
                  name={`sections[${sectionIndex}].productionSteps[${index}].description`}
                  onClick={_stopPropagation}
                  onFocus={onFieldFocus}
                  onBlur={onFieldBlur}
                  onKeyUp={onKeyUp}
                  // onKeyDown={onKeyDown}
                />
              </Stack>
              <ErrorMessage
                name={`sections[${sectionIndex}].productionSteps[${index}].description`}
                render={(message) => (
                  <StyledErrorMessage>{message}</StyledErrorMessage>
                )}
              />
            </Stack>
          </Stack>
        ) : hasError(index) ? (
          <Stack spacing={1}>
            <ErrorMessage
              name={`sections[${index}].name`}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
            <ErrorMessage
              name={`sections[${index}].description`}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        ) : (
          <StepNameDescription
            name={step.name}
            description={
              isEdition && step.error ? "Instructions :" : step.description
            }
            index={index}
          />
        )}
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
        <StyledStepText>{step.transformation || "-"}</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[5]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[6]}>
        <StyledStepText>{step.outputWeight || "-"}</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[7]}>
        <StyledStepText>{step.kitchenArea?.name || "-"}</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[8]}>
        <StyledStepText>{step.machineType?.name || "-"}</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[9]}>
        <StyledStepText>{step.machineSetting || "-"}</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[10]}>
        <StyledStepText>{step.stepDuration || "-"}</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[11]}>
        <StyledStepText>{step.stepDurationUnit || "-"}</StyledStepText>
      </StyledStepBodyCell>
    </Box>
  );
};

export default EditableStep;

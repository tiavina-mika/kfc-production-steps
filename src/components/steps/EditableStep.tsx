import React, { FC } from "react";

import { Autocomplete, Box, Stack, styled } from "@mui/material";

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

const FormikTextFieldName = ({ field, ...props }) => (
  <StyledTextFieldName {...field} {...props} />
);

const FormikTextField = ({ field, ...props }) => (
  <StyledProductionStepTextField {...field} {...props} />
);

const FormikTextFieldDescription = ({ field, ...props }) => (
  <StyledTextFieldDescription {...field} {...props} />
);

const autocompleteSx = {
  textField: {
    "& .MuiInput-input": {
      cursor: "pointer"
    }
  }
};
const FormikAutocomplete = ({ form, field, readOnly = false, ...props }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <Autocomplete
      {...props}
      sx={{ flex: 1, pointer: "cursor" }}
      options={props.options}
      value={value}
      onChange={(_, newValue: Record<string, any>) => {
        setFieldValue(name, newValue);
      }}
      renderInput={(params) => (
        <StyledProductionStepTextField
          {...params}
          variant="standard"
          fullWidth
          inputProps={{ ...params.inputProps, readOnly }}
          sx={readOnly ? autocompleteSx.textField : null}
        />
      )}
    />
  );
};

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
  hasError: (index: number, field: string) => boolean;
  // onDeleteBlur: () => void;
  machineTypes: Record<string, any>[];
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
  hasError,
  machineTypes
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
                  component={FormikTextFieldName}
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
        ) : hasError(index, "description") ? (
          <ErrorMessage
            name={`sections[${sectionIndex}].productionSteps[${index}].description`}
            render={(message) => (
              <StyledErrorMessage>{message}</StyledErrorMessage>
            )}
          />
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
      <StyledStepBodyCell px={0} align="left" width={widths[8]}>
        {isHover ? (
          <Stack>
            <Field
              name={`sections[${sectionIndex}].productionSteps[${index}].machineType`}
              component={FormikAutocomplete}
              options={machineTypes}
              isOptionEqualToValue={(option, value) =>
                option.objectId === value.objectId
              }
              getOptionLabel={(option) => option.name}
              disableClearable
              readOnly
            />
            <ErrorMessage
              name={`sections[${sectionIndex}].productionSteps[${index}].machineType`}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        ) : (
          <StyledStepText>{step.machineType?.name || "-"}</StyledStepText>
        )}
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[9]}>
        {isHover ? (
          <Stack>
            <Field
              component={FormikTextField}
              name={`sections[${sectionIndex}].productionSteps[${index}].machineSetting`}
              onClick={_stopPropagation}
              onFocus={onFieldFocus}
              onBlur={onFieldBlur}
              onKeyUp={onKeyUp}
            />
            <ErrorMessage
              name={`sections[${sectionIndex}].productionSteps[${index}].machineSetting`}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        ) : hasError(index, "machineSetting") ? (
          <ErrorMessage
            name={`sections[${sectionIndex}].productionSteps[${index}].machineSetting`}
            render={(message) => (
              <StyledErrorMessage>{message}</StyledErrorMessage>
            )}
          />
        ) : (
          <StyledStepText>{step.machineSetting || "-"}</StyledStepText>
        )}
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

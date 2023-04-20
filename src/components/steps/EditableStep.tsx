import React, { FC } from "react";

import {
  Autocomplete,
  Box,
  MenuItem,
  Select,
  Stack,
  styled
} from "@mui/material";
import { ErrorMessage, Field } from "formik";

import {
  StyledErrorMessage,
  StyledProductionStepInputBase,
  StyledProductionStepTextField,
  StyledStepBodyCell,
  StyledStepDescriptionText,
  StyledStepFirstBodyColumn,
  StyledStepText
} from "../StyledSectionComponents";
import StepNameDescription from "./StepNameDescription";
import {
  getTransformationTypeLabel,
  roundNumber,
  TRANSFORMATION_TYPES
} from "../../utils/utils";
import { PRODUCTION_STEPS_COL_WIDTHS } from "../../utils/constant";
import { STEP_DURATION_UNITS } from "../../utils/recipeUtils";

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

const FormikSelect = ({ form, field, children, ...props }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <Select
      {...props}
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
      variant="standard"
      input={<StyledProductionStepInputBase />}
    >
      {children}
    </Select>
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
  kitchenAreas: Record<string, any>[];
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
  machineTypes,
  kitchenAreas
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
      {/* ------------ name and description ------------ */}
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
      {/* ------------ transformation ------------ */}
      <StyledStepBodyCell px={0} align="left" width={widths[4]}>
        {isHover ? (
          <Stack className="flex1">
            <Field
              name={`sections[${sectionIndex}].productionSteps[${index}].transformation`}
              component={FormikSelect}
            >
              {TRANSFORMATION_TYPES.map((transformation) => (
                <MenuItem
                  key={transformation.value}
                  value={transformation.value}
                >
                  {transformation.label}
                </MenuItem>
              ))}
            </Field>
            <ErrorMessage
              name={`sections[${sectionIndex}].productionSteps[${index}].transformation`}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        ) : hasError(index, "transformation") ? (
          <ErrorMessage
            name={`sections[${sectionIndex}].productionSteps[${index}].transformation`}
            render={(message) => (
              <StyledErrorMessage>{message}</StyledErrorMessage>
            )}
          />
        ) : (
          <StyledStepText>
            {getTransformationTypeLabel(step.transformation) || "-"}
          </StyledStepText>
        )}
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[5]}>
        <StyledStepText>-</StyledStepText>
      </StyledStepBodyCell>
      <StyledStepBodyCell align="left" width={widths[6]}>
        <StyledStepText>{step.outputWeight || "-"}</StyledStepText>
      </StyledStepBodyCell>
      {/* <StyledStepBodyCell align="left" width={widths[7]}>
        <StyledStepText>{step.kitchenArea?.name || "-"}</StyledStepText>
      </StyledStepBodyCell> */}
      {/* ------------ kitchenArea ------------ */}
      <StyledStepBodyCell px={0} align="left" width={widths[7]}>
        {isHover ? (
          <Stack className="flex1">
            <Field
              name={`sections[${sectionIndex}].productionSteps[${index}].kitchenArea`}
              component={FormikAutocomplete}
              options={kitchenAreas}
              isOptionEqualToValue={(option, value) =>
                option.objectId === value.objectId
              }
              getOptionLabel={(option) => option.name}
              disableClearable
              readOnly
            />
            <ErrorMessage
              name={`sections[${sectionIndex}].productionSteps[${index}].kitchenArea`}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        ) : (
          <StyledStepText>{step.kitchenArea?.name || "-"}</StyledStepText>
        )}
      </StyledStepBodyCell>
      {/* ------------ machineType ------------ */}
      <StyledStepBodyCell px={0} align="left" width={widths[8]}>
        {isHover ? (
          <Stack className="flex1">
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
      {/* ------------ machineSetting ------------ */}
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
      {/* ------------ stepDuration ------------ */}
      <StyledStepBodyCell px={0} align="left" width={widths[10]}>
        {isHover ? (
          <Stack className="flex1">
            <Field
              type="number"
              component={FormikTextField}
              name={`sections[${sectionIndex}].productionSteps[${index}].stepDuration`}
              onClick={_stopPropagation}
              onFocus={onFieldFocus}
              onBlur={onFieldBlur}
              onKeyUp={onKeyUp}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <ErrorMessage
              name={`sections[${sectionIndex}].productionSteps[${index}].stepDuration`}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        ) : hasError(index, "stepDuration") ? (
          <ErrorMessage
            name={`sections[${sectionIndex}].productionSteps[${index}].stepDuration`}
            render={(message) => (
              <StyledErrorMessage>{message}</StyledErrorMessage>
            )}
          />
        ) : (
          <StyledStepText>{step.stepDurationUnit || "-"}</StyledStepText>
        )}
      </StyledStepBodyCell>
      {/* ------------ stepDurationUnit ------------ */}
      <StyledStepBodyCell px={0} align="left" width={widths[11]}>
        {isHover ? (
          <Stack className="flex1">
            <Field
              name={`sections[${sectionIndex}].productionSteps[${index}].stepDurationUnit`}
              component={FormikSelect}
            >
              {STEP_DURATION_UNITS.map((unit, index) => (
                <MenuItem key={unit + index} value={unit}>
                  {unit}
                </MenuItem>
              ))}
            </Field>
            <ErrorMessage
              name={`sections[${sectionIndex}].productionSteps[${index}].stepDurationUnit`}
              render={(message) => (
                <StyledErrorMessage>{message}</StyledErrorMessage>
              )}
            />
          </Stack>
        ) : hasError(index, "stepDurationUnit") ? (
          <ErrorMessage
            name={`sections[${sectionIndex}].productionSteps[${index}].stepDurationUnit`}
            render={(message) => (
              <StyledErrorMessage>{message}</StyledErrorMessage>
            )}
          />
        ) : (
          <StyledStepText>{step.stepDurationUnit || "-"}</StyledStepText>
        )}
      </StyledStepBodyCell>
    </Box>
  );
};

export default EditableStep;

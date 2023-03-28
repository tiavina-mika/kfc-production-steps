import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react";

import { Box, Button, Stack } from "@mui/material";
import { Formik, Form } from "formik";

import ProductionStepsTableHead from "./ProductionStepsTableHead";
import Sections from "./sections/Sections";
import ProductionStepsTable from "./ProductionStepsTable";
import {
  computeProductionStepsRecipeOnFieldChange,
  recipeSectionsFormInitialValues
} from "../utils/recipeUtils";
import { RecipeProductionStepsSchema } from "../utils/validators";

const headers = [
  { label: "Section / Étape / Article" },
  { label: "Poids en entrée (g)" },
  { label: "Prix au kg (€)" },
  { label: "Foodcost (€)" },
  { label: "Transformation" },
  { label: "Rendement (%)" },
  { label: "Poids en sortie (g)" },
  { label: "Atelier" },
  { label: "Machine" },
  { label: "Paramétrage machine" },
  { label: "Durée de l'étape (valeur)" },
  { label: "Durée de l'étape (unité)" }
];

type Props = {
  toggleEditForm?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
  isEdition?: boolean;
  recipe?: Record<string, any>;
  genericSections?: Record<string, any>[];
};
const ProductionSteps: FC<Props> = ({
  toggleEditForm,
  onCancel,
  onSave,
  recipe,
  genericSections,
  isEdition = false
}) => {
  const formRef = useRef();
  const [initialValues, setInitialValues] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [fieldFocused, setFieldFocused] = useState<boolean>(false);
  const [deleteHover, setDeleteHover] = useState<Record<string, any> | null>(
    null
  );

  useEffect(() => {
    const formValues = recipeSectionsFormInitialValues(recipe, true);
    setInitialValues(formValues);
  }, [recipe]);

  const _onRowBlur = () => {
    if (fieldFocused) return;
    setHoveredRow(null);
  };

  const _onRowHover = (component, index, parentIndex = null) => {
    if (fieldFocused) return;
    setHoveredRow({ component, index, parentIndex });
  };

  const _onClearFocus = () => setFieldFocused(false);

  const _onFieldFocus = () => setFieldFocused(true);

  const _onFieldBlur = (event, setFieldTouched) => {
    setFieldFocused(false);
    setFieldTouched(event.target.name);
  };

  const _onKeyUp = (event, setFieldTouched) => {
    if (!setFieldTouched) return;
    setFieldTouched(event.target.name);
  };

  const _onDeleteHover = (
    component: string,
    index: number,
    parentIndex = null
  ) => {
    setDeleteHover({ component, index, parentIndex });
  };

  const handleSubmit = () => {
    if (!formRef.current) return;
    (formRef.current as any).handleSubmit();
  };

  const _onSubmit = (values) => {
    console.log("values", values);
    // onSave(cloneDeep(values), recipe, "6" === recipe.status).then(onStopEdit)
  };

  return (
    <div>
      {/* buttons */}
      <Box
        className="flexRow justifyEnd"
        sx={{ py: 3, pr: 4, position: "fixed", top: 0, right: 0 }}
      >
        {isEdition ? (
          <Stack direction="row" spacing={5}>
            <Button onClick={onCancel}>Annuler</Button>
            <Button onClick={handleSubmit} variant="contained">
              Enregistrer
            </Button>
          </Stack>
        ) : (
          <Button variant="contained" color="primary" onClick={toggleEditForm}>
            Éditer
          </Button>
        )}
      </Box>
      <ProductionStepsTable>
        {/* table head */}
        <ProductionStepsTableHead headers={headers} />
        <Box className="flexColumn">
          <Formik
            innerRef={formRef}
            initialValues={initialValues}
            validationSchema={RecipeProductionStepsSchema}
            onSubmit={_onSubmit}
            validateOnChange={false}
            enableReinitialize
          >
            {({
              values,
              errors,
              setFieldValue,
              setFieldError,
              setFieldTouched,
              submitForm,
              validateForm
            }) => {
              // console.log('formik values', values)
              // const previousProps = usePrevious({ values })

              // _checkChanges(values, setFieldValue)
              return (
                <Sections
                  sections={values?.sections || []}
                  isEdition={isEdition}
                  onRowBlur={_onRowBlur}
                  onRowHover={_onRowHover}
                  hoveredRow={hoveredRow}
                  genericSections={genericSections}
                  onClearFocus={_onClearFocus}
                  onFieldFocus={_onFieldFocus}
                  onFieldBlur={(e) => _onFieldBlur(e, setFieldTouched)}
                  onKeyUp={(e) => _onKeyUp(e, setFieldTouched)}
                  onDeleteHover={_onDeleteHover}
                  deleteHover={deleteHover}
                  setFieldValue={setFieldValue}
                />
              );
            }}
          </Formik>
        </Box>
      </ProductionStepsTable>
    </div>
  );
};

export default ProductionSteps;

import React, { FC, useEffect, useState } from "react";

import { Box, Button, Stack } from "@mui/material";
import { Formik, Form } from "formik";

import ProductionStepsTableHead from "./ProductionStepsTableHead";
import Sections from "./sections/Sections";
import ProductionStepsTable from "./ProductionStepsTable";
import { recipeSectionsFormInitialValues } from "../utils/recipeUtils";
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
};
const ProductionSteps: FC<Props> = ({
  toggleEditForm,
  onCancel,
  onSave,
  recipe,
  isEdition = false
}) => {
  const [initialValues, setInitialValues] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [fieldFocused, setFieldFocused] = useState<boolean>(false);

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

  const _onSubmit = (values) => {
    console.log("values", values);
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
            <Button onClick={onSave} variant="contained">
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
              return (
                <Sections
                  sections={values?.sections || []}
                  isEdition={isEdition}
                  onRowBlur={_onRowBlur}
                  onRowHover={_onRowHover}
                  hoveredRow={hoveredRow}
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

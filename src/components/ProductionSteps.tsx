import { grey } from "@mui/material/colors";
import { Box, Button, Stack } from "@mui/material";
import ProductionStepsTableHead from "./ProductionStepsTableHead";
import SectionsPreview from "./SectionsPreview";
import { useState } from "react";

const TABLE_WIDTH = 2600;

// ----------------------------------------------- //
// --------------------- utils ------------------- //
// ----------------------------------------------- //
const random = (number = 1): number => Math.floor(Math.random() * 10 * number);

const createData = (
  name: string,
  inputWeight: number,
  pricePerKg: number,
  foodcost: number,
  transformation: string,
  transformationRate: number,
  outputWeight: number,
  kitchenArea: string,
  machineType: string,
  machineSetting: string,
  stepDurationValue: number,
  stepDurationUnit: string
) => {
  return {
    name,
    inputWeight,
    pricePerKg,
    foodcost,
    transformation,
    transformationRate,
    outputWeight,
    kitchenArea,
    machineType,
    machineSetting,
    stepDurationValue,
    stepDurationUnit
  };
};

const sections = [...Array(20)].map((_, i) => {
  return createData(
    "name " + i,
    random(),
    random(),
    random(),
    "transformation " + i,
    random(),
    random(),
    "kitchenArea " + i,
    "machineType " + i,
    "machineSetting " + i,
    random(),
    "kg / heure"
  );
});

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

const OTHER_COLUMNS_WIDTH = (TABLE_WIDTH - 300) / (headers.length - 1);

const ProductionSteps = () => {
  const [openProductionStepEditForm, setOpenProductionStepEditForm] = useState<
    boolean
  >(false);

  const toggleProductionStepEditForm = () =>
    setOpenProductionStepEditForm(!openProductionStepEditForm);

  const onCancel = () => {
    console.log("cancel");
    toggleProductionStepEditForm();
  };

  const onSave = () => {
    console.log("save");
    toggleProductionStepEditForm();
  };

  return (
    <div>
      {/* buttons */}
      <Box className="flexRow justifyEnd" sx={{ py: 3, pr: 4 }}>
        {openProductionStepEditForm ? (
          <Stack direction="row" spacing={5}>
            <Button onClick={onCancel}>Annuler</Button>
            <Button onClick={onSave} variant="contained">
              Enregistrer
            </Button>
          </Stack>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={toggleProductionStepEditForm}
          >
            Éditer
          </Button>
        )}
      </Box>
      <div
        style={{
          maxWidth: "100vw",
          maxHeight: "95vh",
          border: "1px solid " + grey[300]
        }}
      >
        <Box
          sx={{ minWidth: TABLE_WIDTH }}
          aria-label="recipe table"
          style={{ tableLayout: "fixed" }}
        >
          {/* table head */}
          <ProductionStepsTableHead
            headers={headers}
            width={OTHER_COLUMNS_WIDTH}
          />

          {/* table body */}
          {openProductionStepEditForm ? (
            <p>Edit form</p>
          ) : (
            <Box className="flexColumn">
              <SectionsPreview
                sections={sections}
                width={OTHER_COLUMNS_WIDTH}
              />
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
};

export default ProductionSteps;

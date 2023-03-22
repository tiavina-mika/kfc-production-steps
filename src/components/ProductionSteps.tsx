import React, { FC } from "react";

import { Box, Button, Stack } from "@mui/material";

import ProductionStepsTableHead from "./ProductionStepsTableHead";
import Sections from "./Sections";
import ProductionStepsTable from "./ProductionStepsTable";
import { getProductionStepsColumnWidth } from "../utils/utils";

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

type Props = {
  toggleEditForm?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
  isEdition?: boolean;
};
const ProductionSteps: FC<Props> = ({
  toggleEditForm,
  onCancel,
  onSave,
  isEdition = false
}) => {
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
          <Sections
            sections={sections}
            width={getProductionStepsColumnWidth(headers)}
          />
        </Box>
      </ProductionStepsTable>
    </div>
  );
};

export default ProductionSteps;

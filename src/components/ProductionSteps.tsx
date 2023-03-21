import { grey } from "@mui/material/colors";
import { Box, Button, Stack } from "@mui/material";
import ProductionStepsTableHead from "./ProductionStepsTableHead";
import SectionsPreview from "./SectionsPreview";
import { FC } from "react";
import { PRODUCTION_STEPS_OTHER_COLUMNS_WIDTH } from "../utils/constant";
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
  toggleEditForm: () => void;
};
const ProductionSteps: FC<Props> = ({ toggleEditForm }) => {
  return (
    <div>
      {/* buttons */}
      <Box
        className="flexRow justifyEnd"
        sx={{ py: 3, pr: 4, position: "fixed", top: 0, right: 0 }}
      >
        <Button variant="contained" color="primary" onClick={toggleEditForm}>
          Éditer
        </Button>
      </Box>
      <ProductionStepsTable>
        {/* table head */}
        <ProductionStepsTableHead headers={headers} />
        <Box className="flexColumn">
          <SectionsPreview
            sections={sections}
            width={getProductionStepsColumnWidth(headers)}
          />
        </Box>
      </ProductionStepsTable>
    </div>
  );
};

export default ProductionSteps;

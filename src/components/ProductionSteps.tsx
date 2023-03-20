import { grey } from "@mui/material/colors";
import { Box } from "@mui/material";
import ProductionStepsTableHead from "./ProductionStepsTableHead";
import SectionsPreview from "./SectionsPreview";

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

// ----------------------------------------------- //
// -------------- styled components -------------- //
// ----------------------------------------------- //
// body row

const ProductionSteps = () => {
  return (
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
        <Box className="flexColumn">
          <SectionsPreview sections={sections} width={OTHER_COLUMNS_WIDTH} />
        </Box>
      </Box>
    </div>
  );
};

export default ProductionSteps;

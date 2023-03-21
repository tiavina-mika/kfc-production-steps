import { grey } from "@mui/material/colors";
import { Box } from "@mui/material";
import ProductionStepsTableHead from "./ProductionStepsTableHead";
import { FC, ReactNode } from "react";

import { PRODUCTION_STEPS_TABLE_WIDTH } from "../utils/constant";

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
  children: ReactNode;
};
const ProductionStepsTable: FC<Props> = ({ children }) => {
  return (
    <Box sx={{ mt: 10 }}>
      <div
        style={{
          maxWidth: "100vw",
          maxHeight: "95vh",
          border: "1px solid " + grey[300]
        }}
      >
        <Box
          sx={{ minWidth: PRODUCTION_STEPS_TABLE_WIDTH }}
          aria-label="recipe table"
          style={{ tableLayout: "fixed" }}
        >
          {children}
        </Box>
      </div>
    </Box>
  );
};

export default ProductionStepsTable;

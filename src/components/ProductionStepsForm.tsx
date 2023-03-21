import { FC } from "react";
import { Box, Button, Stack } from "@mui/material";

import ProductionStepsTableHead from "./ProductionStepsTableHead";
import ProductionStepsTable from "./ProductionStepsTable";

// ----------------------------------------------- //
// --------------------- utils ------------------- //
// ----------------------------------------------- //

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
  onCancel: () => void;
  onSave: () => void;
};
const ProductionStepsForm: FC<Props> = ({ onCancel, onSave }) => {
  return (
    <div>
      {/* buttons */}
      <Box
        className="flexRow justifyEnd"
        sx={{ py: 3, pr: 4, position: "absolute", top: 0, right: 0 }}
      >
        <Stack direction="row" spacing={5}>
          <Button onClick={onCancel}>Annuler</Button>
          <Button onClick={onSave} variant="contained">
            Enregistrer
          </Button>
        </Stack>
      </Box>
      {/* table content */}
      <ProductionStepsTable>
        {/* table head */}
        <ProductionStepsTableHead headers={headers} />

        {/* table body */}
        <p>Edit form</p>
      </ProductionStepsTable>
    </div>
  );
};

export default ProductionStepsForm;

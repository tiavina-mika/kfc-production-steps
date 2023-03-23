import React, { FC } from "react";

import { Box, Button, Stack } from "@mui/material";

import ProductionStepsTableHead from "./ProductionStepsTableHead";
import Sections from "./Sections";
import ProductionStepsTable from "./ProductionStepsTable";

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
  sections?: Record<string, any>[];
};
const ProductionSteps: FC<Props> = ({
  toggleEditForm,
  onCancel,
  onSave,
  sections = [],
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
          <Sections sections={sections} />
        </Box>
      </ProductionStepsTable>
    </div>
  );
};

export default ProductionSteps;

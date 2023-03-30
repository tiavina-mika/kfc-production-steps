import React from "react";
import { Box } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { COLORS } from "../utils/constant";
import PageHeader from "./headers/PageHeader";

const ProductionStepsEditionPage = ({ children, title, onCancel, onSave }) => {
  return (
    <Box
      sx={{ minHeight: "100vh", position: "relative" }}
      className="flexColumn"
    >
      <PageHeader
        title="Produit"
        subtitle={title}
        fixed={false}
        icon={<AssignmentIcon />}
        color="#a00101"
        onConfirm={onSave}
        onCancel={onCancel}
      />
      <Box
        bgcolor={COLORS.GREY_IMAGE_LIST}
        flex={1}
        alignSelf="stretch"
        sx={{ marginTop: "68px" }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ProductionStepsEditionPage;

import React, { FC, ReactNode } from "react";

import { grey } from "@mui/material/colors";
import { Box } from "@mui/material";

import { PRODUCTION_STEPS_TABLE_WIDTH } from "../utils/constant";

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
        >
          {children}
        </Box>
      </div>
    </Box>
  );
};

export default ProductionStepsTable;

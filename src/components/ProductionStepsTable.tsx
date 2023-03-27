import React, { FC, ReactNode } from "react";

import { grey } from "@mui/material/colors";
import { Box } from "@mui/material";
import { sum } from "lodash";

import { PRODUCTION_STEPS_COL_WIDTHS } from "../utils/constant";

const TABLE_WIDTH = sum(PRODUCTION_STEPS_COL_WIDTHS);

type Props = {
  children: ReactNode;
};
const ProductionStepsTable: FC<Props> = ({ children }) => {
  return (
    <Box sx={{ mt: 10, overflowX: "scroll" }}>
      <div
        style={{
          maxWidth: "100vw",
          maxHeight: "95vh",
          border: "1px solid " + grey[300]
        }}
      >
        <Box sx={{ minWidth: TABLE_WIDTH }} aria-label="recipe table">
          {children}
        </Box>
      </div>
    </Box>
  );
};

export default ProductionStepsTable;

import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

import { getCellAlignment } from "../utils/utils";
import {
  PRODUCTION_STEPS_COL_WIDTHS,
  PRODUCTION_STEPS_FIST_COL_PL
} from "../utils/constant";

// ----------------------------------------------- //
// -------------------- styles ------------------- //
// ----------------------------------------------- //
const stickyStyle = {
  position: "sticky",
  left: 0,
  borderRight: "1px solid #cccccc"
};

// ----------------------------------------------- //
// -------------- styled components -------------- //
// ----------------------------------------------- //
type StyledTableHeadCellProps = {
  isFirstColumn: boolean;
  align: "left" | "center" | "right";
};

const StyledHeadCell = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isFirstColumn" && prop !== "align"
})<StyledTableHeadCellProps>((props) => {
  let defaultStyles: Record<string, any> = {
    height: "100%",
    color: "#fff",
    backgroundColor: "#2196f3",
    paddingRight: 16,
    paddingLeft: 16
  };

  if (props.isFirstColumn) {
    defaultStyles = {
      ...defaultStyles,
      ...stickyStyle,
      zIndex: 1000,
      paddingLeft: PRODUCTION_STEPS_FIST_COL_PL
    };
  }

  if (props.align) {
    defaultStyles.justifyContent = getCellAlignment(props.align);
  }

  return defaultStyles;
});

const StyledHeadRow = styled(Box)({
  backgroundColor: "#2196f3",
  height: 60
});

type Props = {
  headers?: any[];
};
const ProductionStepsTableHead: FC<Props> = ({ headers }) => {
  return (
    <StyledHeadRow className="flexRow center">
      {headers.map((header, index) => (
        // first head column
        <StyledHeadCell
          key={header.label + index}
          isFirstColumn={index === 0}
          sx={{
            width: PRODUCTION_STEPS_COL_WIDTHS[index],
            pl: 16
          }}
          align="left"
          className="flexRow center"
        >
          <Typography
            sx={{
              textAlign: "left",
              // textAlign: index === 0 ? "left" : "center",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "22px"
            }}
          >
            {header.label}
          </Typography>
        </StyledHeadCell>
      ))}
    </StyledHeadRow>
  );
};

export default ProductionStepsTableHead;

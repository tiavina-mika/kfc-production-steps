import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/material";
import { getCellAlignment } from "../utils";
import { FC } from "react";

// ----------------------------------------------- //
// -------------------- styles ------------------- //
// ----------------------------------------------- //
const stickyStyle = {
  position: "sticky",
  left: 0,
  borderRight: "1px solid " + grey[300]
};

const firstColumnStyle = {
  width: 300
};

const sx = {
  sticky: stickyStyle,
  firstColumn: firstColumnStyle,
  cell: {
    paddingRight: 8,
    paddingLeft: 8
  }
};

// ----------------------------------------------- //
// -------------- styled components -------------- //
// ----------------------------------------------- //
// body row
const StyledRow = styled(Box)({
  minHeight: 60
});

// body cell
type StyledBodyCellProps = {
  align: "left" | "center" | "right";
  width: number;
};

const StyledBodyCell = styled(Box, {
  shouldForwardProp: (prop) => prop !== "align" && prop !== "width"
})<StyledBodyCellProps>((props) => {
  let defaultStyles: Record<string, any> = {
    display: "flex",
    alignItems: "center",
    width: props.width,
    alignSelf: "stretch",
    ...sx.cell
  };

  if (props.align) {
    defaultStyles.justifyContent = getCellAlignment(props.align);
  }

  return defaultStyles;
});

type Props = {
  sections: any[];
  width: number;
};

const SectionsPreview: FC<Props> = ({ sections, width }) => {
  return (
    <Box className="flexColumn">
      {sections.map((section, index) => (
        <StyledRow className="flexRow" key={section.name + index}>
          {/* section name */}
          <Box
            className="flex flex1 stretchSelf center justifyCenter"
            sx={{
              ...stickyStyle,
              ...firstColumnStyle,
              px: 1.2,
              bgColor: "#fff"
            }}
          >
            <p>{section.name}</p>
          </Box>
          <StyledBodyCell align="center" width={width}>
            {section.inputWeight}
          </StyledBodyCell>
          <StyledBodyCell align="center" width={width}>
            {section.pricePerKg}
          </StyledBodyCell>
          <StyledBodyCell align="center" width={width}>
            {section.foodcost}
          </StyledBodyCell>
          <StyledBodyCell align="center" width={width}>
            {section.transformation}
          </StyledBodyCell>
          <StyledBodyCell align="center" width={width}>
            {section.transformationRate}
          </StyledBodyCell>
          <StyledBodyCell align="center" width={width}>
            {section.outputWeight}
          </StyledBodyCell>
          <StyledBodyCell align="center" width={width}>
            {section.kitchenArea}
          </StyledBodyCell>
          <StyledBodyCell align="center" width={width}>
            {section.machineType}
          </StyledBodyCell>
          <StyledBodyCell align="center" width={width}>
            {section.machineSetting}
          </StyledBodyCell>
          <StyledBodyCell align="center" width={width}>
            {section.stepDurationValue}
          </StyledBodyCell>
          <StyledBodyCell align="center" width={width}>
            {section.stepDurationUnit}
          </StyledBodyCell>
        </StyledRow>
      ))}
    </Box>
  );
};

export default SectionsPreview;

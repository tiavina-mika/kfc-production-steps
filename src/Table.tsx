import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/material";
import { getCellAlignment } from "./utils";

// ----------------------------------------------- //
// --------------------- utils ------------------- //
// ----------------------------------------------- //
const random = (number = 1): number => Math.floor(Math.random() * 10 * number);

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

const OTHER_COLUMNS_WIDTH = (2600 - 300) / (headers.length - 1);

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
    ...sx.cell
  };

  if (props.isFirstColumn) {
    defaultStyles = {
      ...defaultStyles,
      ...stickyStyle
    };
    defaultStyles.zIndex = 1000;
  }

  if (props.align) {
    defaultStyles.justifyContent = getCellAlignment(props.align);
  }

  return defaultStyles;
});

const StyledHeadRow = styled(Box)({
  backgroundColor: "#2196f3",
  height: 72
});

// body row
const StyledRow = styled(Box)({
  // paddingRight: 8,
  // paddingLeft: 8,
  // paddingTop: 20,
  // paddingBottom: 20,
  // backgroundColor: 'red'
  // height: '100%',
  "box-sizing": "border-box"
});

// body cell
type StyledBodyCellProps = {
  align: "left" | "center" | "right";
};

const StyledBodyCell = styled(Box, {
  shouldForwardProp: (prop) => prop !== "align"
})<StyledBodyCellProps>((props) => {
  let defaultStyles: Record<string, any> = {
    display: "flex",
    alignItems: "center",
    width: OTHER_COLUMNS_WIDTH,
    ...sx.cell
  };

  if (props.align) {
    defaultStyles.justifyContent = getCellAlignment(props.align);
  }

  return defaultStyles;
});

const StyledFirstBodyColumn = styled(Box)({
  ...sx.sticky,
  bgcolor: "#fff",
  ...firstColumnStyle
});

const Table = () => {
  return (
    <div
      style={{
        maxWidth: "100vw",
        maxHeight: "95vh",
        border: "1px solid " + grey[300]
      }}
    >
      <Box
        sx={{ minWidth: 2600 }}
        aria-label="recipe table"
        style={{ tableLayout: "fixed" }}
      >
        <StyledHeadRow className="flexRow center">
          {headers.map((header, index) => (
            <StyledHeadCell
              key={header.label + index}
              isFirstColumn={index === 0}
              style={
                index === 0
                  ? { ...firstColumnStyle }
                  : {
                      width: OTHER_COLUMNS_WIDTH
                    }
              }
              align={index === 0 ? "left" : "center"}
              className="flexRow center alignCenter"
            >
              <Typography
                sx={{
                  textAlign: index === 0 ? "left" : "center",
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
        <Box className="flexColumn">
          {sections.map((section, index) => (
            <StyledRow className="flexRow" key={section.name + index}>
              <StyledFirstBodyColumn>{section.name}</StyledFirstBodyColumn>
              <StyledBodyCell align="center">
                {section.inputWeight}
              </StyledBodyCell>
              <StyledBodyCell align="center">
                {section.pricePerKg}
              </StyledBodyCell>
              <StyledBodyCell align="center">{section.foodcost}</StyledBodyCell>
              <StyledBodyCell align="center">
                {section.transformation}
              </StyledBodyCell>
              <StyledBodyCell align="center">
                {section.transformationRate}
              </StyledBodyCell>
              <StyledBodyCell align="center">
                {section.outputWeight}
              </StyledBodyCell>
              <StyledBodyCell align="center">
                {section.kitchenArea}
              </StyledBodyCell>
              <StyledBodyCell align="center">
                {section.machineType}
              </StyledBodyCell>
              <StyledBodyCell align="center">
                {section.machineSetting}
              </StyledBodyCell>
              <StyledBodyCell align="center">
                {section.stepDurationValue}
              </StyledBodyCell>
              <StyledBodyCell align="center">
                {section.stepDurationUnit}
              </StyledBodyCell>
            </StyledRow>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Table;

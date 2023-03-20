import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/material";
import { getCellAlignment } from "./utils";
import TableHead from "./TableHead";

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
// body row
const StyledRow = styled(Box)({
  minHeight: 60
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
    alignSelf: "stretch",
    ...sx.cell
  };

  if (props.align) {
    defaultStyles.justifyContent = getCellAlignment(props.align);
  }

  return defaultStyles;
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
        {/* table head */}
        <TableHead headers={headers} width={OTHER_COLUMNS_WIDTH} />

        {/* table body */}
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

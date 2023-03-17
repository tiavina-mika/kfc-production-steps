import MUITable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";

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
  firstColumn: firstColumnStyle
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

type StyledTableHeadCellProps = {
  isFirstColumn: boolean;
};

// ----------------------------------------------- //
// -------------- styled components -------------- //
// ----------------------------------------------- //
const StyledTableHeadCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "isFirstColumn"
})<StyledTableHeadCellProps>((props) => {
  let defaultStyles: Record<string, any> = {
    height: 40,
    backgroundColor: "#2196f3",
    color: "#fff"
  };

  if (props.isFirstColumn) {
    defaultStyles = {
      ...defaultStyles,
      ...stickyStyle,
      ...firstColumnStyle
    };
    defaultStyles.zIndex = 1000;
  }

  return defaultStyles;
});

const Table = () => {
  return (
    <TableContainer
      style={{
        maxWidth: "100vw",
        maxHeight: "95vh",
        border: "1px solid " + grey[300]
      }}
    >
      <MUITable
        sx={{ minWidth: 2600 }}
        aria-label="recipe table"
        style={{ tableLayout: "fixed" }}
        stickyHeader
      >
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <StyledTableHeadCell
                key={header.label + index}
                align={index === 0 ? "left" : "center"}
                isFirstColumn={index === 0}
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
              </StyledTableHeadCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sections.map((section, index) => (
            <TableRow key={section.name + index}>
              <TableCell
                sx={{ ...sx.sticky, backgroundColor: "#fff" }}
                component="th"
                scope="row"
              >
                {section.name}
              </TableCell>
              <TableCell align="center">{section.inputWeight}</TableCell>
              <TableCell align="center">{section.pricePerKg}</TableCell>
              <TableCell align="center">{section.foodcost}</TableCell>
              <TableCell align="center">{section.transformation}</TableCell>
              <TableCell align="center">{section.transformationRate}</TableCell>
              <TableCell align="center">{section.outputWeight}</TableCell>
              <TableCell align="center">{section.kitchenArea}</TableCell>
              <TableCell align="center">{section.machineType}</TableCell>
              <TableCell align="center">{section.machineSetting}</TableCell>
              <TableCell align="center">{section.stepDurationValue}</TableCell>
              <TableCell align="center">{section.stepDurationUnit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
};

export default Table;

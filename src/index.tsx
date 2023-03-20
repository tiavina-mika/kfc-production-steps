import * as React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import "./styles.css";
import ProductionSteps from "./components/ProductionSteps";

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ProductionSteps />
    </StyledEngineProvider>
  </React.StrictMode>
);

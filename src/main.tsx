import { StrictMode } from "react";
import { render } from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./variables.css";
import "normalize.css";
import "./main.css";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";

const mantineTheme: MantineThemeOverride = {
  fontFamily: "Open Sans, sans-serif",
};

render(
  <StrictMode>
    <MantineProvider theme={mantineTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
  document.getElementById("root")
);

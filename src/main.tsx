import { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./variables.css";
import "normalize.css";
import "./main.css";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import Landing from "./Landing";
import App from "./pages/App/App";

const mantineTheme: MantineThemeOverride = {
  fontFamily: "Open Sans, sans-serif",
};

render(
  <StrictMode>
    <MantineProvider theme={mantineTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="app/*" element={<App />}></Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
  document.getElementById("root")
);

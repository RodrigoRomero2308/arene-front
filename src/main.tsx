import { StrictMode } from "react";
import { render } from "react-dom";
import "./variables.css";
import "normalize.css";
import "./main.css";
import MainComponent from "./mainComponent";

render(
  <StrictMode>
    <MainComponent />
  </StrictMode>,
  document.getElementById("root")
);

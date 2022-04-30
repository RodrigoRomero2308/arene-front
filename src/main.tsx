import { lazy, StrictMode, Suspense } from "react";
import { render } from "react-dom";
import "./variables.css";
import "normalize.css";
import "./main.css";
import { LoadingOverlay } from "@mantine/core";

const MainComponent = lazy(() => import("./mainComponent"));

render(
  <StrictMode>
    <Suspense fallback={<LoadingOverlay visible />}>
      <MainComponent />
    </Suspense>
  </StrictMode>,
  document.getElementById("root")
);

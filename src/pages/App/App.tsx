import { Route, Routes } from "react-router-dom";
import LayoutWithNav from "@/layouts/LayoutWithNav/LayoutWithNav";
import { lazy } from "react";

const App = () => {
  const HomePage = lazy(() => import("./Home/Home"));
  return (
    <LayoutWithNav headerContent={"Contenido"} navBarContent={"Navegacion"}>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </LayoutWithNav>
  );
};

export default App;

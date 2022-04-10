import { Outlet, Route, Routes } from "react-router-dom";
import LayoutWithNav from "../../layouts/LayoutWithNav/LayoutWithNav";

const App = () => {
  return (
    <LayoutWithNav headerContent={"Contenido"} navBarContent={"Navegacion"}>
      <Routes>
        <Route path="/" element={"Placeholder"}></Route>
      </Routes>
    </LayoutWithNav>
  );
};

export default App;

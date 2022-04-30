import { StrictMode } from "react";
import { render } from "react-dom";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import "./variables.css";
import "normalize.css";
import "./main.css";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import Landing from "./pages/LandingPage/Landing";
import App from "./pages/App/App";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const mantineTheme: MantineThemeOverride = {
  fontFamily: "Open Sans, sans-serif",
  colors: {
    arene: ["#eb8221"],
  },
};

const apolloClient = new ApolloClient({
  uri: "http://localhost:3003/graphql",
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache", // TODO: investigar distintas politicas de caching de la libreria
    },
  },
});

const MainWrapper = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <MantineProvider theme={mantineTheme}>
        <Outlet />
      </MantineProvider>
    </ApolloProvider>
  );
};

render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainWrapper />}>
          <Route index element={<Landing />} />
          <Route path="app/*" element={<App />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="register" element={<RegisterPage />}></Route>
          <Route path="*" element={<Navigate to={"/"} replace />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);

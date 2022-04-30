import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {
  LoadingOverlay,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";
import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

const mantineTheme: MantineThemeOverride = {
  fontFamily: "Open Sans, sans-serif",
  colors: {
    arene: ["#eb8221"],
  },
};

const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_BACKEND_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache", // TODO: investigar distintas politicas de caching de la libreria
    },
  },
});

function MainComponent() {
  const MainWrapper = () => {
    return (
      <ApolloProvider client={apolloClient}>
        <MantineProvider theme={mantineTheme}>
          <Outlet />
        </MantineProvider>
      </ApolloProvider>
    );
  };

  const Landing = lazy(() => import("./pages/LandingPage/Landing"));
  const App = lazy(() => import("./pages/App/App"));
  const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
  const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));

  return (
    <Suspense fallback={<LoadingOverlay visible />}>
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
    </Suspense>
  );
}

export default MainComponent;

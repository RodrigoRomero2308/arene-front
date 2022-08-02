import { Route, Routes, Navigate } from "react-router-dom";
import LayoutWithNav from "@/layouts/LayoutWithNav/LayoutWithNav";
import {
  lazy,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import UserContext from "@/context/UserContext/UserContext";
import AppContext from "@/context/AppContext/AppContext";
import { IAuthenticatedUser } from "@/interfaces/IAuthenticatedUser";
import { useQuery } from "@apollo/client";
import { AUTHENTICATE } from "@/graphql/query/user.query";
import { Alert, LoadingOverlay } from "@mantine/core";

const AppInnerComponent = () => {
  const HomePage = lazy(() => import("./Home/Home"));
  const ProfilePage = lazy(() => import("@/pages/ProfilePage/ProfilePage"));
  const MainHeader = lazy(() => import("@/components/MainHeader/MainHeader"));
  const MainNav = lazy(() => import("@/components/MainNav/MainNav"));
  const { appLoading } = useContext(AppContext);

  const mainLayout = useMemo(() => {
    return (
      <LayoutWithNav headerContent={<MainHeader />} navBarContent={<MainNav />}>
        <Suspense fallback={<LoadingOverlay visible />}>
          <Routes>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/" element={<HomePage />}></Route>
          </Routes>
        </Suspense>
      </LayoutWithNav>
    );
  }, []);

  return (
    <>
      <LoadingOverlay visible={appLoading}></LoadingOverlay>
      {mainLayout}
    </>
  );
};

const App = () => {
  const [user, setUser] = useState<IAuthenticatedUser>();
  const { loading, error, data } = useQuery(AUTHENTICATE);
  const [appLoading, setAppLoading] = useState(false);

  useEffect(() => {
    if (data?.authenticate) {
      setUser(data.authenticate);
    }
  }, [data]);

  if (loading) {
    return <LoadingOverlay visible></LoadingOverlay>;
  }

  if (error) {
    return <Navigate to="/login" />;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <AppContext.Provider
        value={{
          appLoading,
          setAppLoading,
        }}
      >
        <AppInnerComponent />
      </AppContext.Provider>
    </UserContext.Provider>
  );
};

export default App;

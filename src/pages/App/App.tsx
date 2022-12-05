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
import { LoadingOverlay } from "@mantine/core";
import { WithPermission } from "@/components/WithPermission/WithPermission";
import { PermissionCodes } from "@/enums/permissions";
import PatientStatusPage from "../PatientStatusPage/PatientStatusPage";
import DefaultRedirect from "@/components/DefaultRedirect/DefaultRedirect";

const AppInnerComponent = () => {
  const HomePage = lazy(() => import("./Home/Home"));
  const ProfilePage = lazy(() => import("@/pages/ProfilePage/ProfilePage"));
  const MainHeader = lazy(() => import("@/components/MainHeader/MainHeader"));
  const MainNav = lazy(() => import("@/components/MainNav/MainNav"));
  const AreasPage = lazy(() => import("@/pages/Admin/AreasPage/AreasPage"));
  const RolesPage = lazy(() => import("@/pages/Admin/RolePage/RolesPage"));
  const PatientsPage = lazy(
    () => import("@/pages/Admin/PatientsPage/PatientsPage")
  );
  const AdminPatientPage = lazy(
    () => import("@/pages/Admin/PatientsPage/AdministratePatientPage")
  );
  const PatientDocumentation = lazy(
    () => import("@/pages/Admin/PatientsPage/PatientDocumentation")
  );
  const PatientPage = lazy(
    () => import("@/pages/Admin/PatientsPage/PatientPage")
  );
  const InstitucionalStaffPage = lazy(
    () => import("@/pages/Admin/InstitucionalStaffPage/InstitucionalStaffPage")
  );
  const ProfessionalsPage = lazy(
    () =>
      import(
        "@/pages/Admin/InstitucionalStaffPage/Professionals/ProfessionalsPage"
      )
  );
  const AdminProfessionalPage = lazy(
    () =>
      import(
        "@/pages/Admin/InstitucionalStaffPage/Professionals/AdministrateProfessionalPage"
      )
  );
  const AdministratorsPage = lazy(
    () =>
      import(
        "@/pages/Admin/InstitucionalStaffPage/Administrators/AdministratorsPage"
      )
  );
  const AdminAdministratorPage = lazy(
    () =>
      import(
        "@/pages/Admin/InstitucionalStaffPage/Administrators/AdministrateAdministratorPage"
      )
  );
  const PhysiatristsPage = lazy(
    () =>
      import(
        "@/pages/Admin/InstitucionalStaffPage/Physiatrists/PhysiatristsPage"
      )
  );
  const AdminPhysiatristPage = lazy(
    () =>
      import(
        "@/pages/Admin/InstitucionalStaffPage/Physiatrists/AdministratePhysiatritPage"
      )
  );

  const CoordinatorsPage = lazy(
    () =>
      import(
        "@/pages/Admin/InstitucionalStaffPage/Coordinators/CoordinatorsPage"
      )
  );

  const AdminCoordinatorPage = lazy(
    () =>
      import(
        "@/pages/Admin/InstitucionalStaffPage/Coordinators/AdministrateCoordinatorPage"
      )
  );

  const DirectorsPage = lazy(
    () => import("@/pages/Admin/InstitucionalStaffPage/Directors/DirectorsPage")
  );

  const AdminDirectorPage = lazy(
    () =>
      import(
        "@/pages/Admin/InstitucionalStaffPage/Directors/AdministrateDirectorPage"
      )
  );

  const { appLoading } = useContext(AppContext);

  const mainLayout = useMemo(() => {
    return (
      <LayoutWithNav headerContent={<MainHeader />} navBarContent={<MainNav />}>
        <Suspense fallback={<LoadingOverlay visible />}>
          <Routes>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/admin">
              <Route
                path="/admin/area"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.AdminArea}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <AreasPage />
                  </WithPermission>
                }
              ></Route>
            </Route>
            <Route path="/admin">
              <Route
                path="/admin/role"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.AdminRole}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <RolesPage />
                  </WithPermission>
                }
              ></Route>
            </Route>
            <Route path="/patients">
              <Route
                index
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.PatientRead}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <PatientsPage />
                  </WithPermission>
                }
              ></Route>
              <Route
                path="/patients/new"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.PatientCreate}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <AdminPatientPage />
                  </WithPermission>
                }
              ></Route>
              <Route
                path="/patients/edit/:user_id"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.PatientUpdate}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <AdminPatientPage />
                  </WithPermission>
                }
              ></Route>
              <Route
                path="/patients/patientstatus/:user_id"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.PatientUpdate}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <PatientStatusPage />
                    </WithPermission>
                }
              ></Route>
                <Route
                path="/patients/view/:user_id"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.PatientRead}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <PatientPage />
                  </WithPermission>
                }
              ></Route>
              <Route
                path="/patients/documentation/:user_id"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.DocumentationRead}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <PatientDocumentation />
                  </WithPermission>
                }
              ></Route>
            </Route>
            <Route path="/institucionalStaff">
              <Route
                index
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.ProfessionalRead}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <InstitucionalStaffPage />
                  </WithPermission>
                }
              ></Route>

              <Route
                path="/institucionalStaff/professionals/new"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.ProfessionalCreate}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <AdminProfessionalPage />
                  </WithPermission>
                }
              ></Route>

              <Route
                path="/institucionalStaff/professionals/edit/:user_id"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.ProfessionalUpdate}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <AdminProfessionalPage />
                  </WithPermission>
                }
              ></Route>
              <Route
                path="/institucionalStaff/professionals/roles/:user_id"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.RoleUserCreate}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <AdminProfessionalPage />
                  </WithPermission>
                }
              ></Route>

              <Route
                path="/institucionalStaff/administrators/new"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.ProfessionalCreate}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <AdminAdministratorPage />
                  </WithPermission>
                }
              ></Route>
              <Route
                path="/institucionalStaff/administrators/edit/:user_id"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.ProfessionalUpdate}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <AdminAdministratorPage />
                  </WithPermission>
                }
              ></Route>
              <Route
                path="/institucionalStaff/administrators/roles/:user_id"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.RoleUserCreate}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <AdminAdministratorPage />
                  </WithPermission>
                }
              ></Route>

              <Route
                path="/institucionalStaff/physiatrists/new"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.ProfessionalCreate}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <AdminPhysiatristPage />
                  </WithPermission>
                }
              ></Route>
              <Route
                path="/institucionalStaff/physiatrists/edit/:user_id"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.ProfessionalUpdate}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <AdminPhysiatristPage />
                  </WithPermission>
                }
              ></Route>
              <Route
                path="/institucionalStaff/physiatrists/roles/:user_id"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.RoleUserCreate}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <AdminPhysiatristPage />
                  </WithPermission>
                }
              ></Route>

              <Route
                path="/institucionalStaff/coordinators/new"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.ProfessionalCreate}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <AdminCoordinatorPage />
                  </WithPermission>
                }
              ></Route>
              <Route
                path="/institucionalStaff/coordinators/edit/:user_id"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.ProfessionalUpdate}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <AdminCoordinatorPage />
                  </WithPermission>
                }
              ></Route>
              <Route
                path="/institucionalStaff/coordinators/roles/:user_id"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.RoleUserCreate}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <AdminCoordinatorPage />
                  </WithPermission>
                }
              ></Route>

              <Route
                path="/institucionalStaff/directors"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.ProfessionalCreate}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <DirectorsPage />
                  </WithPermission>
                }
              ></Route>

              <Route
                path="/institucionalStaff/directors/new"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.ProfessionalCreate}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <AdminDirectorPage />
                  </WithPermission>
                }
              ></Route>
              <Route
                path="/institucionalStaff/directors/edit/:user_id"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.ProfessionalUpdate}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <AdminDirectorPage />
                  </WithPermission>
                }
              ></Route>
              <Route
                path="/institucionalStaff/directors/roles/:user_id"
                element={
                  <WithPermission
                    permissionRequired={PermissionCodes.RoleUserCreate}
                    renderWithoutPermission={<DefaultRedirect />}
                  >
                    <AdminDirectorPage />
                  </WithPermission>
                }
              ></Route>
            </Route>
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
        {user ? <AppInnerComponent /> : null}
      </AppContext.Provider>
    </UserContext.Provider>
  );
};

export default App;

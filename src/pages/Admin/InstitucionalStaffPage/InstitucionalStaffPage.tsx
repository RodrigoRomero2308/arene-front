import { Tabs } from "@mantine/core";
import ProfessionalPage from "./Professionals/ProfessionalsPage";
import AdministratorsPage from "./Administrators/AdministratorsPage";
import PhysiatristsPage from "./Physiatrists/PhysiatristsPage";
import CoordinatorPage from "./Coordinators/CoordinatorsPage";
import DirectorsPage from "./Directors/DirectorsPage";
import { useNavigate, useParams } from "react-router-dom";

const InstitucionalStaffPage = () => {
  const navigate = useNavigate();
  const { tabValue } = useParams();

  return (
    <>
      <Tabs
        variant="outline"
        radius="md"
        defaultValue="professionals"
        // value={tabValue}
        // onTabChange={(value) => navigate(`/institucionalStaff/${value}`)}
      >
        <Tabs.List>
          <Tabs.Tab value="professionals">Profesionales</Tabs.Tab>
          <Tabs.Tab value="administrators">Administradores</Tabs.Tab>
          <Tabs.Tab value="physiatrists">Fisiatras</Tabs.Tab>
          <Tabs.Tab value="coordinators">Coordinadores</Tabs.Tab>
          <Tabs.Tab value="directors">Directores</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="professionals" pt="xs">
          <ProfessionalPage></ProfessionalPage>
        </Tabs.Panel>

        <Tabs.Panel value="administrators" pt="xs">
          <AdministratorsPage></AdministratorsPage>
        </Tabs.Panel>

        <Tabs.Panel value="physiatrists" pt="xs">
          <PhysiatristsPage></PhysiatristsPage>
        </Tabs.Panel>

        <Tabs.Panel value="coordinators" pt="xs">
          <CoordinatorPage></CoordinatorPage>
        </Tabs.Panel>

        <Tabs.Panel value="directors" pt="xs">
          <DirectorsPage></DirectorsPage>
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default InstitucionalStaffPage;

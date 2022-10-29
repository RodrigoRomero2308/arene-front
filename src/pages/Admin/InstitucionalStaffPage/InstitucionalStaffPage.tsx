import { Tabs } from "@mantine/core";
import ProfessionalPage from "./Professionals/ProfessionalsPage";
import AdministratorsPage from "./Administrators/AdministratorsPage";
import PhysiatristsPage from "./Physiatrists/PhysiatristsPage";
import CoordinatorPage from "./Coordinators/CoordinatorsPage";
import DirectorsPage from "./Directors/DirectorsPage";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const InstitucionalStaffPage = () => {
  const navigate = useNavigate();
  const { tabValue } = useParams();

  const tabs = {
    professionals: "professionals",
    administrators: "administrators",
    physiatrists: "physiatrists",
    coordinators: "coordinators",
    directors: "directors",
  };

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  let defaultTab = searchParams.get("tab");

  if (defaultTab && !Object.values(tabs).includes(defaultTab)) {
    defaultTab = null;
  }

  return (
    <>
      <Tabs
        variant="outline"
        radius="md"
        defaultValue={defaultTab || "professionals"}
      >
        <Tabs.List>
          <Tabs.Tab value={tabs.professionals}>Profesionales</Tabs.Tab>
          <Tabs.Tab value={tabs.administrators}>Administradores</Tabs.Tab>
          <Tabs.Tab value={tabs.physiatrists}>Fisiatras</Tabs.Tab>
          <Tabs.Tab value={tabs.coordinators}>Coordinadores</Tabs.Tab>
          <Tabs.Tab value={tabs.directors}>Directores</Tabs.Tab>
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

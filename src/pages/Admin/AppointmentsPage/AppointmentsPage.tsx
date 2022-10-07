import { useState } from "react";
import "dayjs/locale/es";
import { Space, Tabs, Title } from "@mantine/core";
import AppointmentsSchedule from "@/components/Appointments/AppointmentsSchedule";

const AppointmentsPage = () => {
  const [activeTab, setActiveTab] = useState<string | null>("Lunes");
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  return (
    <>
      <Title order={2}>Turnos</Title>
      <Space h="md" />
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          {dias.map((dia) => (
            <Tabs.Tab value={dia} key={dia}>{dia}</Tabs.Tab>
          ))}
        </Tabs.List>

        {dias.map((dia) => (
          <Tabs.Panel value={dia} key={dia}>
            <AppointmentsSchedule dia={dia} key={dia}/>
          </Tabs.Panel>
        ))}
      </Tabs>
    </>
  );
};

export default AppointmentsPage;

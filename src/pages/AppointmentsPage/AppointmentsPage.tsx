import { useState } from "react";
import "dayjs/locale/es";
import { Space, Tabs, Title } from "@mantine/core";
import AppointmentsSchedule from "@/components/Appointments/AppointmentsSchedule";

const AppointmentsPage = () => {
  const [activeTab, setActiveTab] = useState<string | null>("Lunes");
  const daysOfTheWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  return (
    <>
      <Title order={2}>Turnos</Title>
      <Space h="md" />
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          {daysOfTheWeek.map((day) => (
            <Tabs.Tab value={day} key={day}>
              {day}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {daysOfTheWeek.map((day) => (
          <Tabs.Panel value={day} key={day}>
            <AppointmentsSchedule dayOfTheWeek={day} key={day} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </>
  );
};

export default AppointmentsPage;

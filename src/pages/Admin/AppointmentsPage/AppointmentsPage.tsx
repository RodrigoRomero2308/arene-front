import { lazy, useState } from "react";
import "dayjs/locale/es";
import { Space, Tabs, Title } from "@mantine/core";
import AppointmentsSchedule from "@/components/Appointments/AppointmentsSchedule";

const AppointmentsPage = () => {
  const AppointmentsSchedule = lazy(
    () => import("@/components/Appointments/AppointmentsSchedule")
  );
  const [activeTab, setActiveTab] = useState<string | null>("monday");

  const daysOfTheWeek = [
    { id: 1, label: "Lunes", value: "monday" },
    { id: 2, label: "Martes", value: "tuesday" },
    { id: 3, label: "Miércoles", value: "wednesday" },
    { id: 4, label: "Jueves", value: "thursday" },
    { id: 5, label: "Viernes", value: "friday" },
  ];

  return (
    <>
      <Title order={2}>Turnos</Title>
      <Space h="md" />
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          {daysOfTheWeek.map((day) => (
            <Tabs.Tab value={day.value} key={day.id}>
              {day.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <AppointmentsSchedule dayOfTheWeek={activeTab || "monday"} />
      </Tabs>
    </>
  );
};

export default AppointmentsPage;

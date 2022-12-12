import { lazy, useEffect, useState } from "react";
import "dayjs/locale/es";
import { Space, Tabs, Title } from "@mantine/core";
import { useLazyQuery } from "@apollo/client";
import { GET_AREAS } from "@/graphql/query/area.query";
import { IArea } from "@/interfaces/IArea";

const AppointmentsPage = () => {
  const AppointmentsSchedule = lazy(
    () => import("@/components/Appointments/AppointmentsSchedule")
  );
  const [activeTab, setActiveTab] = useState<string | null>("monday");
  const [getAreas] = useLazyQuery(GET_AREAS);
  const [areas, setAreas] = useState<IArea[]>([]);

  const daysOfTheWeek = [
    { id: 1, label: "Lunes", value: "monday" },
    { id: 2, label: "Martes", value: "tuesday" },
    { id: 3, label: "Miércoles", value: "wednesday" },
    { id: 4, label: "Jueves", value: "thursday" },
    { id: 5, label: "Viernes", value: "friday" },
  ];

  const getAreasFromServer = async () => {
    await getAreas().then((result) => {
      setAreas(result.data.getAreas);
    });
  };

  useEffect(() => {
    getAreasFromServer();
  }, []);

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
        <AppointmentsSchedule dayOfTheWeek={activeTab||"monday"} areas={areas} />
      </Tabs>
    </>
  );
};

export default AppointmentsPage;

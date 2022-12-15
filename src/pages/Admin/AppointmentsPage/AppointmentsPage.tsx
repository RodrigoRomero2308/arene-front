import { lazy, Suspense, useEffect, useState } from "react";
import "dayjs/locale/es";
import { LoadingOverlay, Space, Tabs, Title } from "@mantine/core";
import { useLazyQuery } from "@apollo/client";
import { GET_AREAS } from "@/graphql/query/area.query";
import { IArea } from "@/interfaces/IArea";
import { GET_TREATMENTS_WITH_FILTER } from "@/graphql/query/treatment.query";
import { ITreatment } from "@/interfaces/ITreatment";
import { toast } from "react-toastify";
import { parseGraphqlErrorMessage } from "@/utils/parseGraphqlError";
import { toastOptions } from "@/shared/toastOptions";

const AppointmentsPage = () => {
  const AppointmentsSchedule = lazy(
    () => import("@/components/Appointments/AppointmentsSchedule")
  );
  const [activeTab, setActiveTab] = useState<string | null>("monday");
  const [getAreas] = useLazyQuery(GET_AREAS);
  const [areas, setAreas] = useState<IArea[]>([]);
  const [areasLoading, setAreasLoading] = useState(false);
  const [getTreatments] = useLazyQuery(GET_TREATMENTS_WITH_FILTER);
  const [treatments, setTreatments] = useState<ITreatment[]>([]);
  const [treatmentsLoading, setTreatmentsLoading] = useState(false);

  const daysOfTheWeek = [
    { id: 1, label: "Lunes", value: "monday" },
    { id: 2, label: "Martes", value: "tuesday" },
    { id: 3, label: "Miércoles", value: "wednesday" },
    { id: 4, label: "Jueves", value: "thursday" },
    { id: 5, label: "Viernes", value: "friday" },
  ];

  useEffect(() => {
    let ignoreResult = false;

    /* Obtengo areas */
    setAreasLoading(true);
    getAreas()
      .then((result) => {
        if (!ignoreResult) {
          setAreas(result.data.getAreas);
          setAreasLoading(false);
        }
      })
      .catch((error) => {
        toast.error(
          `Ocurrio un error: ${
            parseGraphqlErrorMessage(error) || error.message
          }`,
          toastOptions
        );
      });

    /* Obtengo tratamientos */
    setTreatmentsLoading(true);
    getTreatments()
      .then((result) => {
        if (!ignoreResult) setTreatments(result.data.getTreatments);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      ignoreResult = true;
    };
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
      </Tabs>
      <div style={{ position: "relative" }}>
        <LoadingOverlay visible={areasLoading && treatmentsLoading} />
        <Suspense fallback={null}>
          <AppointmentsSchedule
            dayOfTheWeek={activeTab || "monday"}
            areas={areas}
            treatments={treatments}
          />
        </Suspense>
      </div>
    </>
  );
};

export default AppointmentsPage;

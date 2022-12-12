import { GET_AREAS } from "@/graphql/query/area.query";
import { GET_TREATMENTS_WITH_FILTER } from "@/graphql/query/treatment.query";
import { IArea } from "@/interfaces/IArea";
import { ITreatment, ITreatmentFilter } from "@/interfaces/ITreatment";
import { useLazyQuery } from "@apollo/client";
import { LoadingOverlay, Table } from "@mantine/core";
import { lazy, useEffect, useState } from "react";

const AppointmentsSchedule = ({
  dayOfTheWeek,
  areas,
}: {
  dayOfTheWeek: string;
  areas: IArea[];
}) => {
  const CellSchedule = lazy(
    () => import("@/components/Appointments/CellSchedule")
  );
  const [getTreatments] = useLazyQuery(GET_TREATMENTS_WITH_FILTER);
  const [treatments, setTreatments] = useState<ITreatment[]>([]);
  const [treatmentsLoading, setTreatmentsLoading] = useState(false);
  const schedule = [
    { id: 1, startHour: "8:00", endHour: "9:00" },
    { id: 2, startHour: "9:00", endHour: "10:00" },
    { id: 3, startHour: "10:00", endHour: "11:00" },
    { id: 4, startHour: "11:00", endHour: "12:00" },
  ];

  const getTreatmentsFromServer = async (variables?: {
    filter: ITreatmentFilter;
  }) => {
    setTreatmentsLoading(true);
    await getTreatments({ variables })
      .then((result) => {
        setTreatments(result.data.getTreatments);
        setTreatmentsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTreatmentsFromServer();
  }, []);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Horario</th>
            {areas.map((area) => (
              <th key={area.id}>
                <div>{area.name}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schedule.map((time, index) => (
            <tr key={index}>
              <td key={time.id}>
                {time.startHour}-{time.endHour}
              </td>
              {areas.map((area) => (
                <td key={area.id}>
                  <CellSchedule
                    dayOfTheWeek={dayOfTheWeek}
                    area={area}
                    startHour={time.startHour}
                    endHour={time.endHour}
                    key={dayOfTheWeek + time.id + area.id}
                    treatments={treatments.filter(
                      (treatment) => treatment.area_id === area.id
                    )}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AppointmentsSchedule;

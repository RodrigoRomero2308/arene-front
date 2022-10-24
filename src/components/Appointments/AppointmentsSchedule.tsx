import { GET_AREAS } from "@/graphql/query/area.query";
import { IArea } from "@/interfaces/IArea";
import { useLazyQuery } from "@apollo/client";
import { LoadingOverlay, Table } from "@mantine/core";
import { lazy, useEffect, useState } from "react";

const AppointmentsSchedule = (dayOfTheWeek: { dayOfTheWeek: string }) => {
  const CellSchedule = lazy(
    () => import("@/components/Appointments/CellSchedule")
  );
  const schedule = [
    { id: 1, startHour: "8:00", endHour: "9:00" },
    { id: 2, startHour: "9:00", endHour: "10:00" },
    { id: 3, startHour: "10:00", endHour: "11:00" },
    { id: 4, startHour: "11:00", endHour: "12:00" },
  ];
  const [getAreas] = useLazyQuery(GET_AREAS);
  const [areas, setAreas] = useState<IArea[]>([]);
  const [loading, setLoading] = useState(false);

  const getAreasFromServer = async () => {
    setLoading(true);
    await getAreas().then((result) => {
      setAreas(result.data.getAreas);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAreasFromServer();
  }, []);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Horario</th>
            {areas.map((area) => (
              <th key={area.id}>
                <div style={{ position: 'relative' }}>
                  <LoadingOverlay visible={loading} overlayBlur={2}/>
                  {area.name}
                </div>
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
                    dayOfTheWeek={dayOfTheWeek.dayOfTheWeek}
                    area={area}
                    startHour={time.startHour}
                    endHour={time.endHour}
                    key={dayOfTheWeek.dayOfTheWeek + time.id + area.id}
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

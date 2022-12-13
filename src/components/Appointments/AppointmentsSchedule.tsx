import { GET_APPOINTMENTS_WITH_FILTER } from "@/graphql/query/appointment.query";
import { IAppointment, IAppointmentFilter } from "@/interfaces/IAppointment";
import { IArea } from "@/interfaces/IArea";
import { ITreatment } from "@/interfaces/ITreatment";
import { useLazyQuery } from "@apollo/client";
import { LoadingOverlay, Table } from "@mantine/core";
import { lazy, useEffect, useState } from "react";

const AppointmentsSchedule = ({
  dayOfTheWeek,
  areas,
  treatments,
}: {
  dayOfTheWeek: string;
  areas: IArea[];
  treatments: ITreatment[];
}) => {
  const CellSchedule = lazy(
    () => import("@/components/Appointments/CellSchedule")
  );
  const [getAppointments] = useLazyQuery(GET_APPOINTMENTS_WITH_FILTER);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const schedule = [
    { id: 1, startHour: "8:00", endHour: "9:00" },
    { id: 2, startHour: "9:00", endHour: "10:00" },
    { id: 3, startHour: "10:00", endHour: "11:00" },
    { id: 4, startHour: "11:00", endHour: "12:00" },
  ];

  const getAppointmentsFromServer = async (variables?: {
    filter: IAppointmentFilter;
  }) => {
    setAppointmentsLoading(true);
    await getAppointments({
      variables,
    })
      .then((result) => {
        setAppointments(result.data.getAppointments);
        setAppointmentsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAppointmentsFromServer();
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
              {areas.map((area) => {
                const selectedTreatments = treatments.filter(
                  (treatment) => treatment.area_id === area.id
                );
                const selectedAppointments = appointments.filter(
                  (appointment) => {
                    return (
                      appointment.start_hour === time.startHour &&
                      appointment.end_hour === time.endHour &&
                      appointment.day_of_the_week === dayOfTheWeek &&
                      selectedTreatments.some(
                        (treatment) => treatment.id === appointment.treatment_id
                      )
                    );
                  }
                );
                return (
                  <td key={area.id}>
                    <div style={{ position: "relative" }}>
                      <LoadingOverlay visible={appointmentsLoading} />
                      <CellSchedule
                        dayOfTheWeek={dayOfTheWeek}
                        area={area}
                        startHour={time.startHour}
                        endHour={time.endHour}
                        key={dayOfTheWeek + time.id + area.id}
                        treatments={selectedTreatments}
                        appointments={selectedAppointments}
                      />
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AppointmentsSchedule;

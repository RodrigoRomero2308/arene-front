import { IPatient } from "@/interfaces/IPatient";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ActionIcon, Avatar, Badge, LoadingOverlay } from "@mantine/core";
import { lazy, useEffect, useState } from "react";
import { Plus, X } from "tabler-icons-react";
import { GET_APPOINTMENTS_WITH_FILTER } from "@/graphql/query/appointment.query";
import { IArea } from "@/interfaces/IArea";
import { IAppointment, IAppointmentFilter } from "@/interfaces/IAppointment";
import { ITreatment } from "@/interfaces/ITreatment";
import {
  CREATE_APPOINTMENT,
  DELETE_APPOINTMENT,
} from "@/graphql/mutation/appointment.mutation";
import { toast } from "react-toastify";
import { toastOptions } from "@/shared/toastOptions";
import { parseGraphqlErrorMessage } from "@/utils/parseGraphqlError";
import { GET_PATIENT_BY_ID } from "@/graphql/query/patient.query";

const CellSchedule = ({
  dayOfTheWeek,
  area,
  startHour,
  endHour,
  treatments,
}: {
  dayOfTheWeek: string | "monday";
  area: IArea;
  startHour: string;
  endHour: string;
  treatments: ITreatment[];
}) => {
  const [selectedPatients, setSelectedPatients] = useState<IPatient[]>([]);
  const [patientsBadges, setPatientsBadges] = useState<JSX.Element[]>([]);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [getPatientById] = useLazyQuery(GET_PATIENT_BY_ID);
  const [getAppointments] = useLazyQuery(GET_APPOINTMENTS_WITH_FILTER);
  const [createAppointment] = useMutation(CREATE_APPOINTMENT);
  const [deleteAppointment] = useMutation(DELETE_APPOINTMENT);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);

  const PatientsTable = lazy(
    () => import("@/components/Appointments/PatientsTable")
  );

  const getAppointmentsFromServer = async (variables?: {
    filter: IAppointmentFilter;
  }) => {
    if (treatments.length === 0) return;
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

  const BadgeAvatar = () => {
    return (
      <Avatar alt="Avatar for badge" size={24} mr={5} src={null} /> //luego se le pasa la imagen desde el backend, aún no estan los servicios
    );
  };

  const addPatient = (selectedPatient: IPatient) => {
    var repeat = selectedPatients.some(
      (patient) => patient.user_id === selectedPatient.user_id
    );
    if (!repeat) {
      setSelectedPatients([...selectedPatients, selectedPatient]);
      const treatment = treatments.find(
        (treatment) =>
          treatment.patient_id === selectedPatient.user_id &&
          treatment.area_id === area.id
      );
      if (treatment) {
        const input = {
          treatment_id: treatment.id,
          day_of_the_week: dayOfTheWeek,
          start_hour: startHour,
          end_hour: endHour,
        };
        createAppointment({
          variables: {
            input,
          },
        })
          .catch((error) => {
            toast.error(
              `Ocurrio un error: ${
                parseGraphqlErrorMessage(error) || error.message
              }`,
              toastOptions
            );
          })
          .finally(() => {
            handleCloseModal();
            toast.success("Se ha creado el turno correctamente", toastOptions);
          });
      }
    }
  };

  const removePatient = (selectedPatient: IPatient) => {
    const newPatients = selectedPatients.filter(
      (patient) => patient.user_id !== selectedPatient.user_id
    );
    setSelectedPatients(newPatients);
    const treatment = treatments.find(
      (treatment) =>
        treatment.patient_id === selectedPatient.user_id &&
        treatment.area_id === area.id
    );
    if (treatment) {
      console.log("El tratamiento es" + treatment.id);
      const appointment = appointments.find(
        (appointment) =>
          appointment.treatment_id === treatment.id &&
          appointment.day_of_the_week === dayOfTheWeek &&
          appointment.start_hour === startHour &&
          appointment.end_hour === endHour
      );
      console.log(appointment);
      if (appointment) {
        deleteAppointment({
          variables: {
            id: appointment.id,
          },
        })
          .then(() => {
            const patientToDelete = selectedPatients.find(
              (patient) => patient.user_id === selectedPatient.user_id
            );
            setSelectedPatients(
              selectedPatients.filter((patient) => patient !== patientToDelete)
            );
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            handleCloseModal();
            toast.info("Se ha eliminado el turno correctamente", toastOptions);
          });
      }
    }
  };

  const RemoveButton = ({ selectedPatient }: { selectedPatient: IPatient }) => {
    return (
      <ActionIcon
        size="lg"
        color="teal"
        radius="xl"
        variant="transparent"
        onClick={() => removePatient(selectedPatient)}
      >
        <X size={10} />
      </ActionIcon>
    );
  };

  const addButton = (
    <ActionIcon
      size="xl"
      color="teal"
      radius="xl"
      variant="transparent"
      onClick={() => setModalVisible(true)}
    >
      <Plus size={25} />
    </ActionIcon>
  );

  const badge = (patient: IPatient) => (
    <Badge
      sx={{ paddingLeft: 0 }}
      size="lg"
      radius="xl"
      color="teal"
      leftSection={<BadgeAvatar />}
      rightSection={<RemoveButton selectedPatient={patient} />}
      key={patient.user?.firstname + " " + patient.user?.lastname}
    >
      {patient.user?.firstname} {patient.user?.lastname}
    </Badge>
  );

  useEffect(() => {
    if (treatments.length > 0) {
      treatments.forEach((treatment) => {
        getAppointmentsFromServer({
          filter: {
            treatment_id: treatment.id,
            day_of_the_week: dayOfTheWeek,
            start_hour: startHour,
            end_hour: endHour,
          },
        });
      });
    }
  }, []);

  useEffect(() => {
    if (appointments.length > 0) {
      appointments.forEach((appointment) => {
        getPatientById({
          variables: {
            id: appointment.treatment?.patient_id,
          },
        }).then((data) => {
          setSelectedPatients([...selectedPatients, data.data.getPatientById]);
        });
      });
    }
  }, [appointments]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    selectedPatients.map((selectedPatient) => {
      setPatientsBadges([...patientsBadges, badge(selectedPatient)]);
    });
  }, [selectedPatients]);

  return (
    <>
      <div>
        <div style={{ position: "relative", backgroundColor: "transparent" }}>
          <>
            {patientsBadges}
            <LoadingOverlay
              visible={appointmentsLoading}
              overlayColor="transparent"
              overlayBlur={2}
            />
            {addButton}
          </>
        </div>
        <PatientsTable
          visible={modalVisible}
          areaFilter={area.id}
          onSelect={addPatient}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </>
  );
};

export default CellSchedule;

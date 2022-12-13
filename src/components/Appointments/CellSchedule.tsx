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

const CellSchedule = ({
  dayOfTheWeek,
  area,
  startHour,
  endHour,
  treatments,
  appointments,
}: {
  dayOfTheWeek: string | "monday";
  area: IArea;
  startHour: string;
  endHour: string;
  treatments: ITreatment[];
  appointments: IAppointment[];
}) => {
  const [selectedPatients, setSelectedPatients] = useState<IPatient[]>([]);
  const [patientsBadges, setPatientsBadges] = useState<JSX.Element[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [createAppointment] = useMutation(CREATE_APPOINTMENT);
  const [deleteAppointment] = useMutation(DELETE_APPOINTMENT);

  const PatientsTable = lazy(
    () => import("@/components/Appointments/PatientsTable")
  );

  const BadgeAvatar = () => {
    return (
      <Avatar alt="Avatar for badge" size={24} mr={5} src={null} /> //luego se le pasa la imagen desde el backend, aún no estan los servicios
    );
  };

  const addAppointment = (selectedPatient: IPatient) => {
    const treatment = treatments.find(
      (treatment) => treatment.patient_id === selectedPatient.user_id
    );
    if (treatment) {
      setSelectedPatients([...selectedPatients, selectedPatient]);
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
  };

  const removeAppointment = (selectedPatient: IPatient) => {
    const appointmentToDelete = appointments.find(
      (appointment) =>
        appointment.treatment.patient_id === selectedPatient.user_id &&
        appointment.day_of_the_week === dayOfTheWeek &&
        appointment.start_hour === startHour &&
        appointment.end_hour === endHour
    );
    console.log(appointmentToDelete);
    if (appointmentToDelete) {
      deleteAppointment({
        variables: {
          id: appointmentToDelete.id,
        },
      })
        .then(() => {
          const newSelectedPatients = selectedPatients.filter(
            (patient) => patient.user_id !== selectedPatient.user_id
          );
          setSelectedPatients(newSelectedPatients);
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
          toast.info("Se ha eliminado el turno correctamente", toastOptions);
        });
    }
  };

  const RemoveButton = ({ selectedPatient }: { selectedPatient: IPatient }) => {
    return (
      <ActionIcon
        size="lg"
        color="teal"
        radius="xl"
        variant="transparent"
        onClick={() => removeAppointment(selectedPatient)}
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

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    selectedPatients.map((selectedPatient) => {
      setPatientsBadges([...patientsBadges, badge(selectedPatient)]);
    });
  }, [selectedPatients]);

  useEffect(() => {
    selectedPatients.map((selectedPatient) => {
      setPatientsBadges([...patientsBadges, badge(selectedPatient)]);
    });
  }, []);
  
  const renderPatientsTable = () => {
    return (
      <PatientsTable
        visible={modalVisible}
        areaFilter={area.id}
        onSelect={addAppointment}
        handleCloseModal={handleCloseModal}
      />
    );
  };

  return (
    <>
      <div>
        <div style={{ position: "relative", backgroundColor: "transparent" }}>
          <>
            {patientsBadges}
            {addButton}
          </>
        </div>
        {modalVisible ? renderPatientsTable() : null}
      </div>
    </>
  );
};

export default CellSchedule;

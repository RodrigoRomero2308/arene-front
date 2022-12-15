import { ICellPatient, IPatient, IPatientData } from "@/interfaces/IPatient";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ActionIcon, Avatar, Badge, LoadingOverlay } from "@mantine/core";
import { lazy, useEffect, useMemo, useRef, useState } from "react";
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
import AppointmentBadge from "./AppointmentBadge";

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
  const [selectedPatients, setSelectedPatients] = useState<ICellPatient[]>(
    appointments.map((appointment) => {
      return {
        appointmentId: appointment.id,
        user: appointment.treatment.patient.user,
      };
    })
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [createAppointment] = useMutation(CREATE_APPOINTMENT);
  const [deleteAppointment] = useMutation(DELETE_APPOINTMENT);
  const treatmentsRef = useRef(treatments);

  useEffect(() => {
    treatmentsRef.current = treatments;
  }, [treatments]);

  const PatientsTable = lazy(
    () => import("@/components/Appointments/PatientsTable")
  );

  const addAppointment = async (selectedPatient: IPatientData) => {
    const treatment = treatmentsRef.current.find(
      (treatment) => treatment.patient_id === selectedPatient.user.id
    );
    if (treatment) {
      const input = {
        treatment_id: treatment.id,
        day_of_the_week: dayOfTheWeek,
        start_hour: startHour,
        end_hour: endHour,
      };
      await createAppointment({
        variables: {
          input,
        },
      })
        .then((result) => {
          toast.success("Se ha creado el turno correctamente", toastOptions);
          if (result.errors) {
            throw result.errors;
          }
          setSelectedPatients([
            ...selectedPatients,
            {
              ...selectedPatient,
              appointmentId: result.data.createAppointment.id,
            },
          ]);
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
        });
    }
  };

  const removeAppointment = async (selectedPatient: ICellPatient) => {
    await deleteAppointment({
      variables: {
        id: selectedPatient.appointmentId,
      },
    })
      .then(() => {
        setSelectedPatients((oldSelectedPatients) => {
          console.log(oldSelectedPatients);
          const newSelectedPatients = oldSelectedPatients.filter(
            (patient) => patient.user.id !== selectedPatient.user.id
          );

          console.log(newSelectedPatients);

          return newSelectedPatients;
        });
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

  const patientsBadges = selectedPatients.map((selectedPatient) => {
    return (
      <AppointmentBadge
        key={selectedPatient.appointmentId}
        patient={selectedPatient}
        onRemove={removeAppointment}
      />
    );
  });

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const renderPatientsTable = useMemo(() => {
    return (
      <PatientsTable
        visible={modalVisible}
        areaFilter={area.id}
        onSelect={addAppointment}
        handleCloseModal={handleCloseModal}
      />
    );
  }, [modalVisible]);

  return (
    <>
      <div>
        <div style={{ position: "relative", backgroundColor: "transparent" }}>
          <>
            {patientsBadges}
            {addButton}
          </>
        </div>
        {renderPatientsTable}
      </div>
    </>
  );
};

export default CellSchedule;

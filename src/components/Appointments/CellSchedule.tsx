import { IPatient } from "@/interfaces/IPatient";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ActionIcon,
  Avatar,
  Badge,
  LoadingOverlay,
  Modal,
  Table,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Plus, X } from "tabler-icons-react";
import { GET_PATIENTS_FOR_TABLE } from "@/graphql/query/patient.query";
import { GET_APPOINTMENTS_WITH_FILTER } from "@/graphql/query/appointment.query";
import { IArea } from "@/interfaces/IArea";
import { IAppointment, IAppointmentFilter } from "@/interfaces/IAppointment";
import { ITreatment, ITreatmentFilter } from "@/interfaces/ITreatment";
import { GET_TREATMENTS_WITH_FILTER } from "@/graphql/query/treatment.query";
import {
  CREATE_APPOINTMENT,
  DELETE_APPOINTMENT,
} from "@/graphql/mutation/appointment.mutation";

const CellSchedule = ({
  dayOfTheWeek,
  area,
  startHour,
  endHour,
}: {
  dayOfTheWeek: string;
  area: IArea;
  startHour: string;
  endHour: string;
}) => {
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [selectedPatients, setSelectedPatients] = useState<IPatient[]>([]);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [treatments, setTreatments] = useState<ITreatment[]>([]);
  const [getPatients] = useLazyQuery(GET_PATIENTS_FOR_TABLE);
  const [modalVisible, setModalVisible] = useState(false);
  const [getAppointments] = useLazyQuery(GET_APPOINTMENTS_WITH_FILTER);
  const [getTreatments] = useLazyQuery(GET_TREATMENTS_WITH_FILTER);
  const [createAppointment] = useMutation(CREATE_APPOINTMENT);
  const [deleteAppointment] = useMutation(DELETE_APPOINTMENT);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [treatmentsLoading, setTreatmentsLoading] = useState(false);
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);

  const getPatientsFromServer = async () => {
    setPatientsLoading(true);
    await getPatients().then((result) => {
      setPatients(result.data.getPatients);
      setPatientsLoading(false);
    });
  };

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

  const BadgeAvatar = () => {
    return (
      <Avatar alt="Avatar for badge" size={24} mr={5} src={null} /> //luego se le pasa la imagen desde el backend, aún no estan los servicios
    );
  };

  const addPatient = (selectedPatient: IPatient) => {
    setIsCreatingAppointment(true);
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
          professional_id: 8, //luego se le pasa el id del profesional desde el ProfessionalArea
          day_of_the_week: dayOfTheWeek,
          start_hour: startHour,
          end_hour: endHour,
        };
        createAppointment({
          variables: {
            input,
          },
        })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            setModalVisible(false);
            setIsCreatingAppointment(false);
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
      console.log(appointments);
      const appointment = appointments.find(
        (appointment) =>
          appointment.treatment_id === treatment.id &&
          appointment.day_of_the_week === dayOfTheWeek &&
          appointment.start_hour === startHour &&
          appointment.end_hour === endHour
      );
      console.log(appointment);
      if (appointment) {
        console.log("El appointment es" + appointment);
        deleteAppointment({
          variables: {
            id: appointment.id,
          },
        })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            setModalVisible(false);
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
    getPatientsFromServer();
    getTreatmentsFromServer({
      filter: {
        area_id: area.id,
      },
    });
  }, []);

  useEffect(() => {
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
  }, [treatments]);

  useEffect(() => {
    appointments.forEach((appointment) => {
      const patient = patients.find(
        (patient) => patient.user_id === appointment.treatment?.patient_id
      );
      if (patient) {
        setSelectedPatients([...selectedPatients, patient]);
      }
    });
  }, [appointments]);

  return (
    <>
      <div>
        {selectedPatients.map((selectedPatient) => badge(selectedPatient))}
        <div style={{ position: "relative", backgroundColor: "transparent" }}>
          <>
            <LoadingOverlay
              visible={treatmentsLoading || appointmentsLoading}
              overlayColor="transparent"
              overlayBlur={2}
            />
            {addButton}
          </>
        </div>
        <Modal
          title={
            isCreatingAppointment ? "Cargando.." : "Seleccione un paciente"
          }
          opened={modalVisible || false}
          onClose={() => setModalVisible(false)}
        >
          {isCreatingAppointment ? (
            <Title order={4}>El turno está siendo asignado...</Title>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>DNI</th>
                  <th>Nombre</th>
                  <th>Independencia</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.user_id} onClick={() => addPatient(patient)}>
                    <td key={patient.user?.dni}>{patient.user?.dni}</td>
                    <td
                      key={
                        patient.user?.firstname + "" + patient.user?.lastname
                      }
                    >
                      {patient.user?.firstname} {patient.user?.lastname}
                    </td>
                    <td
                      key={
                        patient.companion_firstname +
                        " " +
                        patient.companion_lastname
                      }
                    >
                      {patient.needs_transfer ? "No" : "Si"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal>
      </div>
    </>
  );
};

export default CellSchedule;

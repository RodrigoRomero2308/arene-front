import { GET_PATIENT_INFORMATION } from "@/graphql/query/patient.query";
import {
  IPatientInformation,
  IPatientInformationFilter,
  IPatientInformationOrderByInput,
} from "@/interfaces/IPatientInformation";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Timeline,
  Text,
  Group,
  Title,
  Space,
  LoadingOverlay,
} from "@mantine/core";
import { Archive, DotsVertical, Edit, Plus } from "tabler-icons-react";
import { sizes } from "@mantine/core/lib/ActionIcon/ActionIcon.styles";

const PatientInformationPage = () => {
  const [getPatientInformation] = useLazyQuery(GET_PATIENT_INFORMATION);
  const [patientInformation, setPatientInformation] = useState<
    IPatientInformation[]
  >([]);
  const [informationLoading, setInformationLoading] = useState(false);
  const navigate = useNavigate();

  const getPatientInformationFromServer = (variables?: {
    filter: IPatientInformationFilter;
    orderBy: IPatientInformationOrderByInput;
  }) => {
    setInformationLoading(true);
    getPatientInformation({
      variables,
    })
      .then((result) => {
        setPatientInformation(
          result.data.patientInformation.map((item: any) => {
            delete item.__typename;
            return item;
          })
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setInformationLoading(false);
      });
  };

  useEffect(() => {
    getPatientInformationFromServer();
  }, []);

  const countDaysBefore = (initialDate: Date) => {
    const timeInMilisecondsBefore = initialDate.getTime();

    const timeInMilisecondsNow = new Date().getTime();

    const milisecondInADay = 86400000;

    const timeInDaysBefore = timeInMilisecondsBefore / milisecondInADay;

    const timeInDaysNow = timeInMilisecondsNow / milisecondInADay;

    const daysPassed = Math.floor(Math.abs(timeInDaysNow - timeInDaysBefore));

    if (daysPassed > 0) {
      return `${daysPassed} dias`;
    }
    return "hoy";
  };

  const Information: IPatientInformation[] = [
    {
      id: 1,
      information: "Se registro al paciente",
      created_by: 1,
      its: new Date("2022/07/05"),
      createdBy: {
        id: 1,
        dni: "42342423",
        email: "facundito@gmail.com",
        firstname: "facu",
        lastname: "acevedo",
        password: "1234567",
        birth_date: "1999-11-11",
        active: true,
      },
    },
    {
      id: 2,
      information: "Se cambio el estado de paciente de Ingreso a Aceptado",
      created_by: 1,
      its: new Date("2022/12/03"),
      createdBy: {
        id: 1,
        dni: "42342423",
        email: "facundito@gmail.com",
        firstname: "facu",
        lastname: "acevedo",
        password: "1234567",
        birth_date: "1999-11-11",
        active: true,
      },
    },
    {
      id: 3,
      information: "Se agrego nueva documentacion llamada: CUD",
      created_by: 1,
      its: new Date("2022/07/15"),
      createdBy: {
        id: 1,
        dni: "42342423",
        email: "facundito@gmail.com",
        firstname: "facu",
        lastname: "acevedo",
        password: "1234567",
        birth_date: "1999-11-11",
        active: true,
      },
    },
    {
      id: 4,
      information: "Se dio de alta al paciente por: descripcion...",
      created_by: 1,
      its: new Date("2022/12/04"),
      createdBy: {
        id: 1,
        dni: "42342423",
        email: "facundito@gmail.com",
        firstname: "facu",
        lastname: "acevedo",
        password: "1234567",
        birth_date: "1999-11-11",
        active: true,
      },
    },
  ];

  return (
    <>
      <Title order={2}>Información del Paciente</Title>
      <Space h="md" />
      <Title
        order={4}
        sx={(theme) => ({
          marginLeft: theme.spacing.xs,
        })}
      >
        Historial de eventos:{" "}
      </Title>
      <Space h="md" />
      <Group
        position="left"
        sx={(theme) => ({
          marginLeft: theme.spacing.xs,
        })}
      >
        <Timeline active={-1} bulletSize={24} lineWidth={2}>
          {patientInformation.map((item) => (
            <Timeline.Item title={item.information} key={item.id}>
              <Text color="dimmed" size="sm">
                {`Hecho por: ${item.createdBy?.firstname} ${
                  item.createdBy?.lastname
                } el ${new Date(item.its).toLocaleDateString()}`}
              </Text>
              <Text color="dimmed" size="sm">
                {`Hace: ${countDaysBefore(new Date(item.its))}`}
              </Text>
            </Timeline.Item>
          ))}
          <LoadingOverlay visible={informationLoading} />
        </Timeline>
      </Group>
    </>
  );
};

export default PatientInformationPage;

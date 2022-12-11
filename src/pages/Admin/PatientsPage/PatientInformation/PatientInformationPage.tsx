import { GET_PATIENT_INFORMATION } from "@/graphql/query/patient.query";
import {
  IPatientInformation,
  IPatientInformationFilter,
  IPatientInformationOrderByInput,
} from "@/interfaces/IPatientInformation";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Timeline,
  Text,
  Group,
  Title,
  Space,
  LoadingOverlay,
} from "@mantine/core";
import { OrderByDirection } from "@/enums/patientInformationOrderByDirection";
import { PatientInformationOrderByField } from "@/enums/patientInformationOrderByField";

const PatientInformationPage = () => {
  const [getPatientInformation] = useLazyQuery(GET_PATIENT_INFORMATION);
  const [patientInformation, setPatientInformation] = useState<
    IPatientInformation[]
  >([]);
  const [informationLoading, setInformationLoading] = useState(false);
  const params = useParams();

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

  const patientInformationFilter: IPatientInformationFilter = {
    patient_id: Number(params.user_id),
  };

  const orderBy: IPatientInformationOrderByInput = {
    direction: OrderByDirection.desc,
    field: PatientInformationOrderByField.its,
  };

  useEffect(() => {
    getPatientInformationFromServer({
      filter: patientInformationFilter,
      orderBy: orderBy,
    });
  }, []);

  const dateDone = (initialDate: Date) => {
    const dateNow = new Date();

    let dayInMiliseconds = 24 * 60 * 60 * 1000;

    const dateYestarday = new Date(dateNow.getTime() - dayInMiliseconds);

    console.log(dateYestarday);

    const date = initialDate.toLocaleDateString();

    const rtf1 = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

    if (date == dateNow.toLocaleDateString()) {
      return (
        <Text color="dimmed" size="sm">
          {`${capitalize(
            rtf1.format(0, "day")
          )} a las ${initialDate.getHours()}:${initialDate.getMinutes()}:${initialDate.getSeconds()}`}
        </Text>
      );
    } else if (date == dateYestarday.toLocaleDateString()) {
      return (
        <Text color="dimmed" size="sm">
          {`${capitalize(
            rtf1.format(-1, "day")
          )} a las ${initialDate.getHours()}:${initialDate.getMinutes()}:${initialDate.getSeconds()}`}
        </Text>
      );
    }
    return (
      <Text>
        {`El ${initialDate.toLocaleDateString()} a las ${initialDate.getHours()}:${initialDate.getMinutes()}:${initialDate.getSeconds()}`}
      </Text>
    );
  };

  function capitalize(word: string) {
    return word[0].toUpperCase() + word.slice(1);
  }

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
          {patientInformation.map((item) => {
            const date = new Date(item.its);

            return (
              <Timeline.Item
                title={item.patientInformationType.name}
                key={item.id}
              >
                <Text color="dimmed" size="sm">
                  {item.information}
                </Text>
                <Text color="dimmed" size="sm">
                  {`Hecho por ${item.createdBy?.firstname} ${item.createdBy?.lastname} `}
                  {dateDone(date)}
                </Text>
              </Timeline.Item>
            );
          })}
          <LoadingOverlay visible={informationLoading} />
        </Timeline>
      </Group>
    </>
  );
};

export default PatientInformationPage;

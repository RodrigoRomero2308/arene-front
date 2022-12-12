import {
  CREATE_TREATMENT,
  DELETE_TREATMENT,
} from "@/graphql/mutation/treatment.mutation";
import { GET_AREAS } from "@/graphql/query/area.query";
import { GET_PATIENT_BY_ID } from "@/graphql/query/patient.query";
import { GET_TREATMENTS_WITH_FILTER } from "@/graphql/query/treatment.query";
import { IArea } from "@/interfaces/IArea";
import { ICreateTreatmentDTO } from "@/interfaces/ICreateTreatmentDTO";
import { IPatient } from "@/interfaces/IPatient";
import { ITreatment, ITreatmentFilter } from "@/interfaces/ITreatment";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  Loader,
  LoadingOverlay,
  Modal,
  MultiSelect,
  Space,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBigLeft, CircleCheck } from "tabler-icons-react";
import { toast } from "react-toastify";
import { toastOptions } from "@/shared/toastOptions";
import { parseGraphqlErrorMessage } from "@/utils/parseGraphqlError";

const TreatmentsPage = () => {
  const [createTreatment] = useMutation(CREATE_TREATMENT);
  const [deleteTreatment] = useMutation(DELETE_TREATMENT);
  const [getPatientData] = useLazyQuery(GET_PATIENT_BY_ID);
  const [getAreas] = useLazyQuery(GET_AREAS);
  const [getTreatments] = useLazyQuery(GET_TREATMENTS_WITH_FILTER);
  const [dataLoading, setDataLoading] = useState(false);
  const [areas, setAreas] = useState<IArea[]>([]);
  const [treatments, setTreatments] = useState<ITreatment[]>([]);
  const [patientData, setPatientData] = useState<IPatient>();
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const navigate = useNavigate();
  const params = useParams();

  const getPatientFromServer = async (userId: number) => {
    try {
      const data = await getPatientData({
        variables: {
          id: userId,
        },
      });
      setPatientData(data.data.getPatientById);
    } catch (error) {
      console.error(error);
    }
  };

  const getAreasFromServer = () => {
    getAreas()
      .then((result) => {
        setAreas(result.data.getAreas);
      })
      .catch((error) => {
        toast.error(
          `Ocurrio un error: ${
            parseGraphqlErrorMessage(error) || error.message
          }`,
          toastOptions
        );
      });
  };

  const getTreatmentsFromServer = (variables?: {
    filter: ITreatmentFilter;
  }) => {
    getTreatments({
      variables,
    })
      .then((result) => {
        const data = result.data.getTreatments;
        setTreatments(data);
        const selectedAreas = data.map((item: any) => item.area_id.toString());
        setSelectedAreas(selectedAreas);
      })
      .catch((error) => {
        toast.error(
          `Ocurrio un error: ${
            parseGraphqlErrorMessage(error) || error.message
          }`,
          toastOptions
        );
      });
  };

  useEffect(() => {
    setDataLoading(true);
    if (params.user_id && Number.isInteger(+params.user_id)) {
      Promise.all([
        getPatientFromServer(Number(params.user_id)),
        getAreasFromServer(),
        getTreatmentsFromServer({
          filter: {
            patient_id: Number(params.user_id),
          },
        }),
      ]).then(() => {setDataLoading(false)});
    } else {
      navigate("app/patients");
    }
  }, []);

  const handleChangeInput = async (values: string[]) => {
    selectedAreas.forEach(async (areaId) => {
      if (!values.includes(areaId)) {
        setSelectedAreas(values);
        const treatmentToDelete = treatments.find(
          (treatment) =>
            treatment.area_id === Number(areaId) &&
            treatment.patient_id === Number(params.user_id)
        );
        deleteTreatment({
          variables: {
            id: Number(treatmentToDelete?.id),
          },
        })
          .catch((error) => {
            console.error(error);
            toast.error(
              `Ocurrio un error: ${
                parseGraphqlErrorMessage(error) || error.message
              }`,
              toastOptions
            );
          })
          .then(() => {
            const areaName = areas.find(
              (area) => area.id === Number(areaId)
            )?.name;
            toast.info(`${areaName} eliminada correctamente`, toastOptions);
          });
      }
    });
    values.forEach((areaId) => {
      if (!selectedAreas.includes(areaId)) {
        setSelectedAreas(values);
        const input: ICreateTreatmentDTO = {
          area_id: Number(areaId),
          patient_id: Number(params.user_id),
          quantity: 0,
        };
        createTreatment({
          variables: {
            input,
          },
        })
          .catch((error) => {
            console.error(error);
            toast.error(
              `Ocurrio un error: ${
                parseGraphqlErrorMessage(error) || error.message
              }`,
              toastOptions
            );
          })
          .then(() => {
            const areaName = areas.find(
              (area) => area.id === Number(areaId)
            )?.name;
            toast.success(`${areaName} asignada correctamente`, toastOptions);
          });
      }
    });
  };

  const BackButton = () => {
    return (
      <Button
        size="xs"
        variant="subtle"
        color="dark"
        compact
        onClick={() => navigate(-1)}
      >
        <ArrowBigLeft />
      </Button>
    );
  };

  return (
    <>
      <BackButton />
      <Space h="md" />
      <Title order={2}>
        Paciente: {patientData?.user?.firstname} {patientData?.user?.lastname}{" "}
      </Title>
      <Title order={4}>DNI: {patientData?.user?.dni}</Title>
      <Space h="md" />
      <MultiSelect
        label="Terapias"
        description="Seleccione las terapias que desea agregar"
        placeholder="Seleccione las terapias"
        data={areas.map((area) => ({
          label: area.name,
          value: area.id.toString(),
        }))}
        defaultValue={selectedAreas}
        value={selectedAreas}
        onChange={(values) => handleChangeInput(values)}
        withAsterisk
        clearable
      />
      <Space h="md" />
      <LoadingOverlay visible={dataLoading} />
    </>
  );
};

export default TreatmentsPage;

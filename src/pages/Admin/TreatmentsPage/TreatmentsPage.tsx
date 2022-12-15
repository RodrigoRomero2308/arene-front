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
  /* PatientData */
  const [getPatientData] = useLazyQuery(GET_PATIENT_BY_ID);
  const [patientData, setPatientData] = useState<IPatient>();
  const [patientDataLoading, setPatientDataLoading] = useState(false);

  /* Areas */
  const [getAreas] = useLazyQuery(GET_AREAS);
  const [areas, setAreas] = useState<IArea[]>([]);
  const [areasLoading, setAreasLoading] = useState(false);

  /* Treatments */
  const [getTreatments] = useLazyQuery(GET_TREATMENTS_WITH_FILTER);
  const [treatments, setTreatments] = useState<ITreatment[]>([]);
  const [treatmentsLoading, setTreatmentsLoading] = useState(false);
  const [createTreatment] = useMutation(CREATE_TREATMENT);
  const [deleteTreatment] = useMutation(DELETE_TREATMENT);

  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    let ignoreResult = false;
    if (params.user_id && Number.isInteger(+params.user_id)) {
      /* PatientData */
      setPatientDataLoading(true);
      getPatientData({
        variables: {
          id: Number(params.user_id),
        },
      })
        .then((result) => {
          if (!ignoreResult) {
            setPatientData(result.data.getPatientById);
            setPatientDataLoading(false);
          }
        })
        .catch((error) => {
          toast.error(
            `Ocurrio un error: ${
              parseGraphqlErrorMessage(error) || error.message
            }`,
            toastOptions
          );
        });

      /* Areas */
      setAreasLoading(true);
      getAreas()
        .then((result) => {
          if (!ignoreResult) {
            setAreas(result.data.getAreas);
            setAreasLoading(false);
          }
        })
        .catch((error) => {
          toast.error(
            `Ocurrio un error: ${
              parseGraphqlErrorMessage(error) || error.message
            }`,
            toastOptions
          );
        });

      /* Treatments */
      setTreatmentsLoading(true);
      getTreatments({
        variables: {
          filter: {
            patient_id: Number(params.user_id),
          },
        },
      })
        .then((result) => {
          if (!ignoreResult) {
            setTreatments(result.data.getTreatments);
            setTreatmentsLoading(false);
            setSelectedAreas(
              result.data.getTreatments.map((treatment: ITreatment) => {
                return treatment.area_id.toString();
              })
            );
          }
        })
        .catch((error) => {
          toast.error(
            `Ocurrio un error: ${
              parseGraphqlErrorMessage(error) || error.message
            }`,
            toastOptions
          );
        });
    } else {
      navigate("app/patients");
    }

    return () => {
      ignoreResult = true;
    };
  }, []);

  const handleChangeInput = async (values: string[]) => {
    if (values.length > selectedAreas.length) {
      const areasId = values.filter((value) => !selectedAreas.includes(value));
      areasId.forEach(async (areaId) => {
        setSelectedAreas([...selectedAreas, areaId]);
        await createNewTreatment(areaId);
      });
    } else {
      const areasId = selectedAreas.filter((value) => !values.includes(value));
      areasId.forEach(async (areaId) => {
        setSelectedAreas((oldSelectedAreas) => {
          const newSelectedAreas = oldSelectedAreas.filter(
            (area) => area !== areaId
          );
          return newSelectedAreas;
        });
        await deleteATreatment(areaId);
      });
    }
  };

  const createNewTreatment = async (areaId: string) => {
    const input: ICreateTreatmentDTO = {
      area_id: Number(areaId),
      patient_id: Number(params.user_id),
      quantity: 0,
    };
    await createTreatment({
      variables: {
        input,
      },
    })
      .then((result) => {
        setSelectedAreas([...selectedAreas, result.data.createTreatment]);
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          `Ocurrio un error: ${
            parseGraphqlErrorMessage(error) || error.message
          }`,
          {
            ...toastOptions,
            autoClose: 1000,
          }
        );
      })
      .finally(() => {
        const areaName = areas.find((area) => area.id === Number(areaId))?.name;
        toast.success(`${areaName} asignada correctamente`, {
          ...toastOptions,
          autoClose: 1000,
        });
      });
  };

  const deleteATreatment = async (areaId: string) => {
    const treatmentToDelete = treatments.find(
      (treatment) =>
        treatment.area_id === Number(areaId) &&
        treatment.patient_id === Number(params.user_id)
    );
    await deleteTreatment({
      variables: {
        id: Number(treatmentToDelete?.id),
      },
    })
      .then(() => {
        setTreatments((oldTreatments) => {
          const newTreatments = oldTreatments.filter(
            (treatment) =>
              treatment.area_id !== Number(areaId) &&
              treatment.patient_id !== Number(params.user_id)
          );
          return newTreatments;
        });
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
      .finally(() => {
        const areaName = areas.find((area) => area.id === Number(areaId))?.name;
        toast.info(`${areaName} eliminada correctamente`, toastOptions);
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
      <div style={{ position: "relative" }}>
        <LoadingOverlay
          visible={patientDataLoading}
          overlayColor="transparent"
        />
        <Title order={2}>
          Paciente: {patientData?.user?.firstname} {patientData?.user?.lastname}{" "}
        </Title>
        <Title order={4}>DNI: {patientData?.user?.dni}</Title>
      </div>
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
        onChange={async (values) => {
          setSaving(true);
          await handleChangeInput(values);
          setSaving(false);
        }}
        icon={
          treatmentsLoading ? (
            <Loader size="sm" />
          ) : saving ? (
            <Loader size="sm" />
          ) : (
            <CircleCheck color="#4DABF7" />
          )
        }
        disabled={treatmentsLoading}
        withAsterisk
        clearable
      />
    </>
  );
};

export default TreatmentsPage;

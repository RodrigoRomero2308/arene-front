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

  const [disabledItems, setDisabledItems] = useState<string[]>([]);
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
    if (values.length > treatments.length) {
      const areasId = values.filter(
        (value) =>
          !treatments.map((item) => item.area_id.toString()).includes(value)
      );
      areasId.forEach(async (areaId) => {
        setDisabledItems((oldDisabledItems) => {
          const newDisabledItems = new Set(oldDisabledItems);
          newDisabledItems.add(areaId);
          return Array.from(newDisabledItems);
        });
        await createNewTreatment(areaId);
      });
    } else {
      const areasId = treatments
        .map((item) => item.area_id.toString())
        .filter((value) => !values.includes(value));
      areasId.forEach(async (areaId) => {
        setDisabledItems((oldDisabledItems) => {
          const newDisabledItems = new Set(oldDisabledItems);
          newDisabledItems.add(areaId);
          return Array.from(newDisabledItems);
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
        if (result.errors) {
          throw result.errors;
        }
        setTreatments((oldTreatments) => {
          return [...oldTreatments, result.data.createTreatment];
        });
        setDisabledItems((oldDisabledItems) => {
          const newDisabledItems = new Set(oldDisabledItems);
          newDisabledItems.delete(areaId);
          return Array.from(newDisabledItems);
        });
        toast.success(
          `${result.data.createTreatment.area.name} asignada correctamente`,
          {
            ...toastOptions,
            autoClose: 1000,
          }
        );
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
      });
  };

  const deleteATreatment = async (areaId: string) => {
    console.log(treatments);
    const treatmentToDelete = treatments.find(
      (treatment) =>
        treatment.area_id === Number(areaId) &&
        treatment.patient_id === Number(params.user_id)
    );
    if (!treatmentToDelete) {
      throw new Error("tratamiento no encontrado");
    }
    await deleteTreatment({
      variables: {
        id: treatmentToDelete.id,
      },
    })
      .then(() => {
        setTreatments((oldTreatments) => {
          const newTreatments = oldTreatments.filter(
            (treatment) => treatment.id !== treatmentToDelete.id
          );
          return newTreatments;
        });
        setDisabledItems((oldDisabledItems) => {
          const newDisabledItems = new Set(oldDisabledItems);
          newDisabledItems.delete(areaId);
          return Array.from(newDisabledItems);
        });
        toast.success(
          `${treatmentToDelete.area.name} eliminada correctamente`,
          toastOptions
        );
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          `Ocurrio un error: ${
            parseGraphqlErrorMessage(error) || error.message
          }`,
          toastOptions
        );
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
          disabled: disabledItems.includes(area.id.toString()),
        }))}
        value={treatments.map((item) => item.area_id.toString())}
        onChange={async (values) => {
          await handleChangeInput(values);
        }}
        icon={
          treatmentsLoading ? (
            <Loader size="sm" />
          ) : disabledItems.length ? (
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

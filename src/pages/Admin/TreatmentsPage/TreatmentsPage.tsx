import {
  CREATE_TREATMENT,
  DELETE_TREATMENT,
  UPDATE_TREATMENT,
} from "@/graphql/mutation/treatment.mutation";
import { GET_AREAS } from "@/graphql/query/area.query";
import { GET_PATIENT_BY_ID_TO_UPDATE } from "@/graphql/query/patient.query";
import { GET_TREATMENTS_BY_USERID } from "@/graphql/query/treatment.query";
import { IArea } from "@/interfaces/IArea";
import { ICreateTreatmentDTO } from "@/interfaces/ICreateTreatmentDTO";
import { IPatient } from "@/interfaces/IPatient";
import { ITreatment } from "@/interfaces/ITreatment";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  LoadingOverlay,
  Modal,
  MultiSelect,
  Space,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TreatmentsPage = () => {
  const [createTreatment] = useMutation(CREATE_TREATMENT);
  /*   const [updateTreatment] = useMutation(UPDATE_TREATMENT); */
  const [deleteTreatment] = useMutation(DELETE_TREATMENT);
  const [getPatientData] = useLazyQuery(GET_PATIENT_BY_ID_TO_UPDATE);
  const [getAreas] = useLazyQuery(GET_AREAS);
  const [getTreatmentByUserId] = useLazyQuery(GET_TREATMENTS_BY_USERID);
  const [areasLoading, setAreasLoading] = useState(false);
  const [patientLoading, setPatientLoading] = useState(false);
  const [areas, setAreas] = useState<IArea[]>([]);
  const [actualTreatments, setActualTreatments] = useState<ITreatment[]>([]);
  const [patientData, setPatientData] = useState<IPatient>();
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const getPatientFromServer = async (userId: number) => {
    try {
      setPatientLoading(true);
      const data = await getPatientData({
        variables: {
          id: userId,
        },
      });
      setPatientData(data.data.getPatientById);
    } catch (error) {
      console.error(error);
    } finally {
      setPatientLoading(false);
    }
  };

  const getAreasFromServer = () => {
    getAreas()
      .then((result) => {
        setAreas(result.data.getAreas);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setAreasLoading(true);
      });
  };

  const getTreatmentsFromServer = () => {
    getTreatmentByUserId({
      variables: {
        id: Number(params.user_id),
      },
    })
      .then((result) => {
        const data = result.data.getTreatmentsByUserId;
        setActualTreatments(data);
        const selectedAreas = data.map((item: any) => item.area_id.toString());
        setSelectedAreas(selectedAreas);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setAreasLoading(true);
      });
  };

  useEffect(() => {
    if (params.user_id && Number.isInteger(+params.user_id)) {
      getPatientFromServer(Number(params.user_id));
      getAreasFromServer();
      getTreatmentsFromServer();
    }
  }, []);

  const handleSubmit = () => {
    selectedAreas.forEach((areaId) => {
      const existingTreatment = actualTreatments.find(
        (treatment) => treatment.area_id === Number(areaId)
      );
      if (!existingTreatment) {
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
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            setModalOpened(true);
          });
      }
    });
    actualTreatments.forEach((treatment) => {
      if (!selectedAreas.includes(treatment.area_id.toString())) {
        deleteTreatment({
          variables: {
            id: treatment.id,
          },
        })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            setModalOpened(true);
          });
      }
    });
  };

  const handleCloseModal = () => {
    setModalOpened(false);
    navigate("/app/patients");
  };

  return (
    <>
      <Modal
        opened={modalOpened}
        /* title={"Tratamiento guardado"} */ onClose={() =>
          setModalOpened(false)
        }
      >
        <Title order={4}>Tratamiento guardado exitosamente</Title>
        <Space h={"xl"} />
        <Button onClick={handleCloseModal}>Cerrar</Button>
      </Modal>
      <Title order={2}>
        Paciente: {patientData?.user?.firstname} {patientData?.user?.lastname}{" "}
        <LoadingOverlay visible={patientLoading} />
      </Title>
      <Title order={4}>
        DNI: {patientData?.user?.dni}
        <LoadingOverlay visible={patientLoading} />
      </Title>
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
        onChange={(value) => setSelectedAreas(value)}
        withAsterisk
        clearable
      />
      <Space h="md" />
      <Button type="submit" onClick={handleSubmit}>
        Asignar
      </Button>
    </>
  );
};

export default TreatmentsPage;

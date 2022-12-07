import { CHANGE_STATUS } from "@/graphql/mutation/patient.mutation";
import { GET_PATIENT_BY_ID } from "@/graphql/query/patient.query";
import {
  GET_ALL_PATIENT_STATUS,
  GET_PATIENT_STATUS_BY_ID,
} from "@/graphql/query/patientStatus.query";
import { IPatient } from "@/interfaces/IPatient";
import { IPatientStatus } from "@/interfaces/IPatientStatus";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  LoadingOverlay,
  Modal,
  Radio,
  Space,
  Textarea,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Id } from "tabler-icons-react";

const PatientStatusPage = () => {
  const [patientData, setPatientData] = useState<IPatient>();
  const [statusData, setStatusData] = useState<IPatientStatus[]>([]);
  const [patientStatusData, setPatientStatusData] = useState<IPatientStatus>();
  const [dataLoading, setDataLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [getPatientData] = useLazyQuery(GET_PATIENT_BY_ID);
  const [getAllPatientStatus] = useLazyQuery(GET_ALL_PATIENT_STATUS);
  const [getPatientStatus] = useLazyQuery(GET_PATIENT_STATUS_BY_ID);
  const [changeStatus] = useMutation(CHANGE_STATUS);
  const [value, setValue] = useState<string | undefined>("2");
  const [modalOpened, setModalOpened] = useState(false);

  const getPatientFromServer = async (userId: number) => {
    setDataLoading(true);
    try {
      getPatientData({
        variables: {
          id: userId,
        },
      }).then((result) => {
        setPatientData(result.data.getPatientById);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPatientStatusFromServer = async () => {
    setStatusLoading(true);
    getAllPatientStatus()
      .then((result) => {
        setStatusData(
          result.data.getAllPatientStatus.map((item: any) => {
            delete item.__typename;
            return item;
          })
        );
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setStatusLoading(false);
      });
  };

  const getPatientStatusByIdFromServer = async (id?: number) => {
    getPatientStatus({
      variables: {
        id: id,
      },
    })
      .then((result) => {
        setPatientStatusData(result.data.getStatusById);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (params.user_id && Number.isInteger(+params.user_id)) {
      getPatientFromServer(Number(params.user_id));
      getAllPatientStatusFromServer();
      setDataLoading(false);
    }
  }, []);

  const handleSubmit = () => {
    if (patientData && value) {
      changeStatus({
        variables: {
          id: patientData.user_id,
          statusId: parseInt(value),
        },
      }).then(() => {
        setModalOpened(true);
      });
    }
  };

  const handleCloseModal = () => {
    setModalOpened(false);
    navigate("/app/patients");
  };
  return (
    <>
      <Modal opened={modalOpened} onClose={() => setModalOpened(false)}>
        <Title order={4}>Estado asignado exitosamente</Title>
        <Space h={"xl"} />
        <Button onClick={handleCloseModal}>Cerrar</Button>
      </Modal>
      <Title order={2}>
        Paciente: {patientData?.user?.firstname} {patientData?.user?.lastname}
      </Title>
      <Title order={4}>DNI: {patientData?.user?.dni}</Title>
      <Space h="md"></Space>
      <Radio.Group
        value={patientData?.patient_status_id.toString()}
        onChange={setValue}
        label="Situación"
        description="Situación actual del paciente"
        withAsterisk
      >
        {statusData.map((item: IPatientStatus) => (
          <Radio value={item.id} label={item.name} key={item.id} />
        ))}
        <LoadingOverlay visible={statusLoading} />
      </Radio.Group>

      <Space h="md"></Space>

      <Button type="submit" onClick={handleSubmit} loading={dataLoading}>
        Asignar
      </Button>
      <LoadingOverlay visible={dataLoading} />
    </>
  );
};
export default PatientStatusPage;

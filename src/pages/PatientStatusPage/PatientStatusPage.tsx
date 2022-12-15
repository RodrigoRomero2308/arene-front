import { CHANGE_STATUS } from "@/graphql/mutation/patient.mutation";
import { GET_PATIENT_BY_ID } from "@/graphql/query/patient.query";
import {
  GET_ALL_PATIENT_STATUS,
  GET_PATIENT_STATUS_BY_ID,
} from "@/graphql/query/patientStatus.query";
import { IPatient } from "@/interfaces/IPatient";
import { IPatientStatus } from "@/interfaces/IPatientStatus";
import { toastOptions } from "@/shared/toastOptions";
import { parseGraphqlErrorMessage } from "@/utils/parseGraphqlError";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  LoadingOverlay,
  Modal,
  Radio,
  Space,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PatientStatusPage = () => {
  const [patientData, setPatientData] = useState<IPatient>();
  const [statusData, setStatusData] = useState<IPatientStatus[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [getPatientData] = useLazyQuery(GET_PATIENT_BY_ID);
  const [getAllPatientStatus] = useLazyQuery(GET_ALL_PATIENT_STATUS);
  const [changeStatus] = useMutation(CHANGE_STATUS);
  const [value, setValue] = useState<string | undefined>();

  const getPatientFromServer = async (userId: number) => {
    setDataLoading(true);
    try {
      getPatientData({
        variables: {
          id: userId,
        },
      }).then((result) => {
        if (result.error) {
          throw result.error;
        }
        setPatientData(result.data.getPatientById);
        setValue(result.data.getPatientById?.patient_status_id.toString());
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const getAllPatientStatusFromServer = async () => {
    setStatusLoading(true);
    getAllPatientStatus()
      .then((result) => {
        if (result.error) {
          throw result.error;
        }
        setStatusData(
          result.data.getAllPatientStatus.map((item: any) => {
            delete item.__typename;
            return item;
          })
        );
      })
      .catch((error: any) => {
        toast.error(
          parseGraphqlErrorMessage(error) || error.message,
          toastOptions
        );
      })
      .finally(() => {
        setStatusLoading(false);
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
      setDataLoading(true);
      changeStatus({
        variables: {
          id: patientData.user_id,
          statusId: parseInt(value),
        },
      })
        .then(() => {
          navigate("/app/patients");
          toast.success("Estado actualizado exitosamente", toastOptions);
        })
        .catch((error: any) => {
          toast.error(
            parseGraphqlErrorMessage(error) || error.message,
            toastOptions
          );
        })
        .finally(() => {
          setDataLoading(false);
        });
    }
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <Title order={2}>
          Paciente: {patientData?.user?.firstname} {patientData?.user?.lastname}
        </Title>
        <Title order={4}>DNI: {patientData?.user?.dni}</Title>
        <Space h="md"></Space>
        <Radio.Group
          value={value}
          onChange={setValue}
          label="Situación"
          description="Situación actual del paciente"
          withAsterisk
        >
          {statusData.map((item: IPatientStatus) => (
            <Radio value={item.id.toString()} label={item.name} key={item.id} />
          ))}
          <LoadingOverlay visible={statusLoading} />
        </Radio.Group>

        <Space h="md"></Space>

        <Button type="submit" onClick={handleSubmit} loading={dataLoading}>
          Asignar
        </Button>
        <LoadingOverlay visible={dataLoading} />
      </div>
    </>
  );
};
export default PatientStatusPage;

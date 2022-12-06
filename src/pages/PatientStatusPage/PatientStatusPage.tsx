import { CHANGE_STATUS } from "@/graphql/mutation/patient.mutation";
import { GET_PATIENT_BY_ID } from "@/graphql/query/patient.query";
import { IPatient } from "@/interfaces/IPatient";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, LoadingOverlay, Modal, Radio, Space, Textarea, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PatientStatusPage = () => {
    const [patientData, setPatientData] = useState<IPatient>();
    const [dataLoading, setDataLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const [getPatientData] = useLazyQuery(GET_PATIENT_BY_ID);
    const [changeStatus] = useMutation(CHANGE_STATUS);
    const [value, setValue] = useState('');
    const [modalOpened, setModalOpened] = useState(false);

    const getPatientFromServer = async (userId: number) => {
        setDataLoading(true)
        try {
            getPatientData({
                variables: {
                    id: userId,
                },
            })
                .then((result) => {
                    setPatientData(result.data.getPatientById);
                 })

        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (params.user_id && Number.isInteger(+params.user_id)) {
            getPatientFromServer(Number(params.user_id));
            setDataLoading(false);
        }
    }, []);

       const handleSubmit = () => {
        if (patientData && value) {
            changeStatus({
                variables: {
                    id: patientData.user_id,
                    statusId: parseInt(value)
                }
            }).then(() => {
                setModalOpened(true);
            });
        }
    }

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
            <Title order={2}>Paciente: {patientData?.user?.firstname} {patientData?.user?.lastname}</Title>
            <Title order={4}>DNI: {patientData?.user?.dni}</Title>
            <Space h="md"></Space>
            <Radio.Group
                value={value}
                onChange={setValue}
                label="Situación"
                description="Situación actual del paciente"
                withAsterisk
            >
                <Radio value='1' label="No Aceptado" />
                <Radio value='2' label="Aceptado" />
                <Radio value='3' label="En Evaluación O.S." />
                <Radio value='4' label="Dado de Alta" />
            </Radio.Group>
            <Space h="md"></Space>

            <Button type="submit" onClick={handleSubmit} loading={dataLoading}>
                Asignar
            </Button>
            <LoadingOverlay visible={dataLoading} />
        </>
    )
}
export default PatientStatusPage;
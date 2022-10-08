import { GET_PATIENT_BY_ID_TO_UPDATE } from "@/graphql/query/patient.query";
import { IPatient } from "@/interfaces/IPatient";
import { useLazyQuery } from "@apollo/client";
import { Button, LoadingOverlay, Radio, Space, Textarea, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PatientStatusPage = () => {
    const [patientData, setPatientData] = useState<IPatient>();
    const [dataLoading, setDataLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const [getPatientData] = useLazyQuery(GET_PATIENT_BY_ID_TO_UPDATE);


    const getPatientFromServer = async (userId: number) => {
        try {
            setDataLoading(true);
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

    useEffect(() => {
        if (params.user_id && Number.isInteger(+params.user_id)) {
            getPatientFromServer(Number(params.user_id));
            setDataLoading(false);
        }
    }, []);

    return (
        <>
            <Title order={2}>Paciente: {patientData?.user?.firstname} {patientData?.user?.lastname}</Title>
            <Title order={4}>DNI: {patientData?.user?.dni}</Title>
            <Space h="md"></Space>
            <Radio.Group
                label="Situación"
                description="Situación actual del paciente"
                withAsterisk
            >
                <Radio value="aceptado" label="Aceptado" />
                <Radio value="noaceptado" label="No Aceptado" />
                <Radio value="evaluacion" label="En Evaluación O.S." />
                <Radio value="alta" label="Dado de Alta" />
            </Radio.Group>
            <Space h="md"></Space>
            <Textarea
                placeholder="Ingrese el motivo de la situación del paciente"
                label="Motivo"
                withAsterisk
            />
            <Space h="md"></Space>
            <Button>
                Enviar
            </Button>
            <LoadingOverlay visible={dataLoading} />
        </>
    )
}
export default PatientStatusPage;
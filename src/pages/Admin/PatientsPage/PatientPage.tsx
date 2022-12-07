import DefaultRedirect from "@/components/DefaultRedirect/DefaultRedirect";
import DocumentationList from "@/components/DocumentationList/DocumentationList";
import { GET_PATIENT_BY_ID } from "@/graphql/query/patient.query";
import { IDocumentation } from "@/interfaces/IDocumentation";
import { IPatient } from "@/interfaces/IPatient";
import { DocumentationService } from "@/services/documentation.service";
import { parseGraphqlErrorMessage } from "@/utils/parseGraphqlError";
import { useLazyQuery } from "@apollo/client";
import { LoadingOverlay, Space, Tabs, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { File, InfoCircle } from "tabler-icons-react";
import PatientInformationContent from "./PatientPageTabs/PatientInformationContent";

enum PatientPageTab {
  Information = "information",
  Documents = "documents",
}

const PatientPage = () => {
  const [loading, setLoading] = useState(false);
  const [getPatientData, { data: patientResponseData }] = useLazyQuery<{
    getPatientById: IPatient;
  }>(GET_PATIENT_BY_ID);
  const params = useParams();
  const [documentationList, setDocumentationList] = useState<IDocumentation[]>(
    []
  );
  const { getDocumentation, getDocumentationList } = DocumentationService();

  const patientData = patientResponseData?.getPatientById;

  const getPatientFromServer = async (userId: number) => {
    try {
      await getPatientData({
        variables: {
          id: userId,
        },
      });
    } catch (error: any) {
      toast.error(parseGraphqlErrorMessage(error) || error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const getDocumentationFromServer = async (patientId: number) => {
    try {
      const documentationData = await getDocumentationList(patientId);
      setDocumentationList(documentationData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params.user_id && Number.isInteger(+params.user_id)) {
      setLoading(true);
      Promise.all([
        getPatientFromServer(Number(params.user_id)),
        getDocumentationFromServer(Number(params.user_id)),
      ]).then(() => {
        setLoading(false);
      });
    }

    return () => {};
  }, []);

  const patientName = patientData?.user
    ? `${patientData.user.firstname} ${patientData.user.lastname}`
    : null;

  if (!params.user_id || !Number.isInteger(+params.user_id)) {
    return <DefaultRedirect />;
  }

  return (
    <>
      <Title>Paciente: {patientName}</Title>
      <Space h="md" />
      <Tabs defaultValue={PatientPageTab.Information}>
        <Tabs.List>
          <Tabs.Tab value={PatientPageTab.Information} icon={<InfoCircle />}>
            Información
          </Tabs.Tab>
          <Tabs.Tab value={PatientPageTab.Documents} icon={<File />}>
            Documentos
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={PatientPageTab.Information} pt="sm">
          {patientData ? (
            <PatientInformationContent patientData={patientData} />
          ) : null}
        </Tabs.Panel>
        <Tabs.Panel value={PatientPageTab.Documents} pt="sm">
          <DocumentationList
            documentationList={documentationList}
            downloadDocument={getDocumentation}
          />
        </Tabs.Panel>
      </Tabs>
      <LoadingOverlay visible={loading} />
    </>
  );
};

export default PatientPage;

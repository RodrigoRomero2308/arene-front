import { WithPermission } from "@/components/WithPermission/WithPermission";
import { PermissionCodes } from "@/enums/permissions";
import { SAVE_DOCUMENTATION } from "@/graphql/mutation/documentation.mutation";
import {
  GET_DOCUMENTATION,
  GET_DOCUMENTATION_LIST,
} from "@/graphql/query/documentation.query";
import { GET_DOCUMENTATION_TYPES } from "@/graphql/query/documentationTypes.query";
import { GET_PATIENT_BY_ID } from "@/graphql/query/patient.query";
import { ICreateDocumentationDTO } from "@/interfaces/ICreateDocumentationDTO";
import { IDocumentation } from "@/interfaces/IDocumentation";
import { IDocumentationType } from "@/interfaces/IDocumentationType";
import { IPatient } from "@/interfaces/IPatient";
import { downloadFile } from "@/utils/file.utils";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  Button,
  LoadingOverlay,
  Menu,
  Modal,
  Select,
  Space,
  Table,
  Text,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DotsVertical, Download, Plus } from "tabler-icons-react";

const PatientData = ({ patient }: { patient?: IPatient }) => {
  return (
    <div style={{ position: "relative", minHeight: 48 }}>
      {patient && (
        <>
          <Text>
            Paciente: {patient.user?.firstname || ""}{" "}
            {patient.user?.lastname || ""}
          </Text>
          <Text>DNI: {patient.user?.dni}</Text>
        </>
      )}
      <LoadingOverlay visible={!patient} />
    </div>
  );
};

const DocumentationList = ({
  documentationList,
  downloadDocument,
}: {
  documentationList: IDocumentation[];
  downloadDocument: (documentId: number) => void;
}) => {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Nombre del archivo</th>
          <th>Tipo de documentación</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {documentationList.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.filename}</td>
              <td>
                {item.documentationType?.name ||
                  item.other_documentation_type ||
                  ""}
              </td>
              <td>
                <Menu shadow="sm">
                  <Menu.Target>
                    <UnstyledButton>
                      <DotsVertical />
                    </UnstyledButton>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => {
                        downloadDocument(item.id);
                      }}
                      icon={<Download />}
                    >
                      Descargar archivo
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

interface DocumentationFormValues {
  file?: FileWithPath;
  documentation_type_id?: string;
  other_documentation_type?: string;
}

const NewDocumentModal = ({
  opened,
  onClose,
  patientId,
}: {
  opened: boolean;
  onClose: () => void;
  patientId: number;
}) => {
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [saveDocumentation] = useMutation(SAVE_DOCUMENTATION);
  const { data: documentationTypeResponse } = useQuery<{
    getDocumentationTypes: IDocumentationType[];
  }>(GET_DOCUMENTATION_TYPES);

  const documentationTypes = useMemo(() => {
    if (!documentationTypeResponse) {
      return [];
    }
    return documentationTypeResponse.getDocumentationTypes;
  }, [documentationTypeResponse]);

  const saveDocumentationForm = useForm<DocumentationFormValues>({
    validate: {
      file: (value: FileWithPath | undefined) =>
        !value ? "Debe seleccionar un archivo" : null,
    },
  });

  const handleFileDrop = (files: FileWithPath[]) => {
    const file = files.shift();
    if (file) {
      saveDocumentationForm.setFieldValue("file", file);
    }
  };

  const handleSubmit = (values: DocumentationFormValues) => {
    console.log(values);
    if (!values.file) {
      return;
    }
    setSubmitButtonLoading(true);
    const valuesToSend: ICreateDocumentationDTO = {
      patient_id: patientId,
      file: values.file,
    };

    if (
      values.documentation_type_id &&
      values.documentation_type_id !== "others" &&
      !Number.isNaN(Number(values.documentation_type_id))
    ) {
      valuesToSend.documentation_type_id = +values.documentation_type_id;
    } else if (values.other_documentation_type) {
      valuesToSend.other_documentation_type = values.other_documentation_type;
    }

    saveDocumentation({
      variables: {
        input: valuesToSend,
      },
    })
      .then(() => {
        saveDocumentationForm.reset();
        onClose();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setSubmitButtonLoading(false);
      });
  };

  return (
    <Modal
      title="Cargar documentación"
      opened={opened}
      onClose={() => {
        saveDocumentationForm.reset();
        onClose();
      }}
    >
      <form onSubmit={saveDocumentationForm.onSubmit(handleSubmit)}>
        <Dropzone maxFiles={1} multiple={false} onDrop={handleFileDrop}>
          Subi tu archivo
        </Dropzone>
        {saveDocumentationForm.errors.file && (
          <Text color="red">{saveDocumentationForm.errors.file}</Text>
        )}
        {saveDocumentationForm.values.file && (
          <Text>Seleccionado: {saveDocumentationForm.values.file.name}</Text>
        )}
        <Space h="sm" />
        <Select
          label="Tipo de documentación"
          data={documentationTypes
            .sort((a, b) => (a.name < b.name ? -1 : 1) /*  */)
            .map((item) => ({
              value: item.id.toString(),
              label: item.name,
            }))
            .concat({
              value: "others",
              label: "Otros",
            })}
          {...saveDocumentationForm.getInputProps("documentation_type_id")}
          searchable
        />
        <Space h="md" />
        {saveDocumentationForm.values.documentation_type_id === "others" && (
          <>
            <TextInput
              label="Ingrese otro tipo de documentación"
              {...saveDocumentationForm.getInputProps(
                "other_documentation_type"
              )}
            />
            <Space h="md" />
          </>
        )}
        <Button type="submit" loading={submitButtonLoading}>
          Subir
        </Button>
      </form>
    </Modal>
  );
};

function PatientDocumentation() {
  const [getDocumentationList] = useLazyQuery(GET_DOCUMENTATION_LIST);
  const [getPatientData] = useLazyQuery(GET_PATIENT_BY_ID);
  const [getDocument] = useLazyQuery<{
    getDocumentation: IDocumentation & { file: string };
  }>(GET_DOCUMENTATION);
  const [documentationLoading, setDocumentationLoading] = useState(false);
  const [documentationList, setDocumentationList] = useState<IDocumentation[]>(
    []
  );
  const [newDocumentationModalOpened, setNewDocumentationModalOpened] =
    useState(false);
  const [patientData, setPatientData] = useState<IPatient>();
  const params = useParams();
  const navigate = useNavigate();
  let patientId = 0;

  if (params.user_id && Number.isInteger(+params.user_id)) {
    patientId = +params.user_id;
  }

  const getDocumentationForPatient = async (patient_id: number) => {
    setDocumentationLoading(true);
    try {
      const data = await getDocumentationList({
        variables: {
          filter: {
            patient_id: [patient_id],
          },
          orderBy: {
            field: "its",
            direction: "desc",
          },
        },
      });

      setDocumentationList(data.data.getDocumentationList);
    } catch (error) {
      console.error(error);
    } finally {
      setDocumentationLoading(false);
    }
  };

  const getPatientFromServer = async (patient_id: number) => {
    try {
      const data = await getPatientData({
        variables: {
          id: patient_id,
        },
      });

      setPatientData(data.data.getPatientById);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataFromServer = ({
    fetchPatient,
  }: {
    fetchPatient?: boolean;
  }) => {
    if (params.user_id && Number.isInteger(+params.user_id)) {
      Promise.all([
        getDocumentationForPatient(+params.user_id),
        fetchPatient
          ? getPatientFromServer(+params.user_id)
          : Promise.resolve(),
      ]);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchDataFromServer({
        fetchPatient: true,
      });
    } else {
      navigate("/app/patients");
    }

    return () => {};
  }, [patientId]);

  const getDocumentation = useCallback(async (documentId: number) => {
    try {
      const thisDocumentResponse = await getDocument({
        variables: {
          id: documentId,
        },
      });

      if (thisDocumentResponse.data) {
        const thisDocument = thisDocumentResponse.data.getDocumentation;

        downloadFile(
          thisDocument.file,
          thisDocument.filename,
          thisDocument.mimetype
        );
      } else {
        console.log(thisDocumentResponse);
        throw new Error(
          "Ha ocurrido un error al descargar el archivo, por favor intente nuevamente más tarde"
        );
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }, []);

  const newButton = useMemo(
    () => (
      <WithPermission permissionRequired={PermissionCodes.DocumentationCreate}>
        <>
          <Space h="md" />
          <Button
            onClick={() => {
              setNewDocumentationModalOpened(true);
            }}
            rightIcon={<Plus />}
          >
            Nuevo
          </Button>
        </>
      </WithPermission>
    ),
    []
  );

  const onClose = () => {
    setNewDocumentationModalOpened(false);
    fetchDataFromServer({});
  };

  return (
    <div>
      <Title order={4}>Documentación del paciente:</Title>
      <Space h="sm" />
      <PatientData patient={patientData} />
      {newButton}
      <Space h="md" />
      <div style={{ position: "relative" }}>
        <DocumentationList
          downloadDocument={getDocumentation}
          documentationList={documentationList}
        />
        <LoadingOverlay visible={documentationLoading} />
      </div>
      <NewDocumentModal
        onClose={onClose}
        patientId={patientId}
        opened={newDocumentationModalOpened}
      />
    </div>
  );
}

export default PatientDocumentation;

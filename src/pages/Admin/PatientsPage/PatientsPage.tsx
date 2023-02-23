import { WithPermission } from "@/components/WithPermission/WithPermission";
import userContext from "@/context/UserContext/UserContext";
import { PermissionCodes } from "@/enums/permissions";
import { GET_PATIENTS_FOR_TABLE } from "@/graphql/query/patient.query";
import { GET_ALL_PATIENT_STATUS } from "@/graphql/query/patientStatus.query";
import { IPatient, IPatientFilter } from "@/interfaces/IPatient";
import { IPatientStatus } from "@/interfaces/IPatientStatus";
import { toastOptions } from "@/shared/toastOptions";
import { parseGraphqlErrorMessage } from "@/utils/parseGraphqlError";
import { userHasPermission } from "@/utils/permission.utils";
import { useLazyQuery } from "@apollo/client";
import {
  Badge,
  Button,
  Grid,
  Group,
  LoadingOverlay,
  MediaQuery,
  Menu,
  ScrollArea,
  Select,
  Space,
  Table,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Accessible,
  DotsVertical,
  Edit,
  HeartRateMonitor,
  Eye,
  File,
  Plus,
  Archive,
} from "tabler-icons-react";

const PatientsPage = () => {
  const [getPatients] = useLazyQuery(GET_PATIENTS_FOR_TABLE);
  const [getPatientStatus] = useLazyQuery(GET_ALL_PATIENT_STATUS);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [patientStatus, setPatientStatus] = useState<IPatientStatus[]>([]);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const [patientsStatusLoading, setPatientsStatusLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(userContext);

  const getPatientsFromServer = (variables?: { filter: IPatientFilter }) => {
    setPatientsLoading(true);
    getPatients({
      variables,
    })
      .then((result) => {
        if (result.error) {
          throw result.error;
        }
        setPatients(
          result.data.getPatients.map((item: any) => {
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
        setPatientsLoading(false);
      });
  };

  const getPatientStatusFromServer = () => {
    setPatientsStatusLoading(true);
    getPatientStatus({})
      .then((result) => {
        if (result.error) {
          throw result.error;
        }
        setPatientStatus(
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
        setPatientsStatusLoading(false);
      });
  };

  useEffect(() => {
    getPatientsFromServer();
    getPatientStatusFromServer();
  }, []);

  const newButton = useMemo(
    () => (
      <WithPermission permissionRequired={PermissionCodes.PatientCreate}>
        <>
          <Space h="md" />
          <Button
            onClick={() => {
              navigate("/app/patients/new");
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

  const searchForm = useForm<IPatientFilter>({
    initialValues: {
      dni: "",
      name: "",
      email: "",
    },
  });

  const handleSearchFormSubmit = (values: IPatientFilter) => {
    getPatientsFromServer({ filter: values });
  };

  return (
    <>
      <Title order={2}>Pacientes</Title>
      <Space h="md" />
      <Title order={5}>Búsqueda por:</Title>
      <Space h="sm" />
      <form onSubmit={searchForm.onSubmit(handleSearchFormSubmit)}>
        <Grid gutter="xl">
          <Grid.Col md={4}>
            <TextInput
              label="Nombre y Apellido"
              placeholder="Ingrese Nombre y Apellido"
              {...searchForm.getInputProps("name")}
            ></TextInput>
            <Space h="sm" />
            <TextInput
              label="Email"
              placeholder="Ingrese Email"
              {...searchForm.getInputProps("email")}
            ></TextInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <TextInput
              label="DNI"
              placeholder="Ingrese DNI"
              {...searchForm.getInputProps("dni")}
            ></TextInput>
            <Space h="sm" />
            <Select
              searchable
              label="Estado"
              data={patientStatus.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              {...searchForm.getInputProps("patient_status_id")}
            ></Select>
            <Space h="xl" />
            <Group position="apart">
              <div>
                <Button
                  sx={(theme) => ({
                    marginRight: theme.spacing.sm,
                  })}
                  type="submit"
                  loading={patientsLoading}
                >
                  Buscar
                </Button>
                <Button
                  variant="outline"
                  onClick={searchForm.reset}
                  loading={patientsLoading}
                >
                  Limpiar
                </Button>
              </div>
            </Group>
          </Grid.Col>
        </Grid>
        <Space h="md" />
        {newButton}
      </form>
      <Space h="md" />
      <div style={{ position: "relative" }}>
        <ScrollArea
          sx={() => ({
            maxWidth: "100vw",
            overflow: "visible",
          })}
        >
          <Table striped>
            <thead>
              <tr>
                <th>DNI</th>
                <th>Nombre</th>
                <MediaQuery
                  smallerThan="md"
                  styles={{
                    display: "none",
                  }}
                >
                  <th>Email</th>
                </MediaQuery>
                <th>Estado</th>
                <MediaQuery
                  smallerThan="md"
                  styles={{
                    display: "none",
                  }}
                >
                  <th>Teléfono</th>
                </MediaQuery>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {patients.map((item) => {
                const thisPatientStatus = patientStatus.find(
                  (status) => status.id === item.patient_status_id
                );
                return (
                  <tr key={item.user_id}>
                    <td>{item.user?.dni}</td>
                    <td>
                      {item.user
                        ? `${item.user.firstname} ${item.user.lastname}`
                        : ""}
                    </td>
                    <MediaQuery
                      smallerThan="md"
                      styles={{
                        display: "none",
                      }}
                    >
                      <td>{item.user?.email}</td>
                    </MediaQuery>
                    <td>
                      {patientsStatusLoading ? (
                        <Badge
                          sx={() => ({
                            textTransform: "none",
                          })}
                        >
                          Cargando...
                        </Badge>
                      ) : (
                        <Badge
                          color={thisPatientStatus?.color}
                          sx={() => ({
                            textTransform: "none",
                          })}
                        >
                          {thisPatientStatus?.name || "No encontrado"}
                        </Badge>
                      )}
                    </td>
                    <MediaQuery
                      smallerThan="md"
                      styles={{
                        display: "none",
                      }}
                    >
                      <td>{item.user?.phone_number}</td>
                    </MediaQuery>
                    <td>
                      <Menu shadow="sm" position="left-start">
                        <Menu.Target>
                          <UnstyledButton>
                            <DotsVertical />
                          </UnstyledButton>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item
                            onClick={() => {
                              navigate(`/app/patients/view/${item.user_id}`);
                            }}
                            icon={<Eye />}
                            disabled={
                              !userHasPermission(
                                user,
                                PermissionCodes.PatientRead
                              )
                            }
                          >
                            Ver información del paciente
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => {
                              navigate(`/app/patients/edit/${item.user_id}`);
                            }}
                            icon={<Edit />}
                            disabled={
                              !userHasPermission(
                                user,
                                PermissionCodes.PatientUpdate
                              )
                            }
                          >
                            Modificar paciente
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => {
                              navigate(
                                `/app/patients/information/${item.user_id}`
                              );
                            }}
                            icon={<Archive />}
                            disabled={
                              !userHasPermission(
                                user,
                                PermissionCodes.PatientRead
                              )
                            }
                          >
                            Ver historial
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => {
                              navigate(
                                `/app/patients/patientstatus/${item.user_id}`
                              );
                            }}
                            icon={<Accessible />}
                            disabled={
                              !userHasPermission(
                                user,
                                PermissionCodes.PatientUpdate
                              )
                            }
                          >
                            Estado del Paciente
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => {
                              navigate(
                                `/app/patients/treatments/${item.user_id}`
                              );
                            }}
                            icon={<HeartRateMonitor />}
                            disabled={
                              !userHasPermission(
                                user,
                                PermissionCodes.TreatmentCreate
                              )
                            }
                          >
                            Asignar tratamiento
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => {
                              navigate(
                                `/app/patients/documentation/${item.user_id}`
                              );
                            }}
                            disabled={
                              !userHasPermission(
                                user,
                                PermissionCodes.DocumentationRead
                              )
                            }
                            icon={<File />}
                          >
                            Administrar documentación
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </ScrollArea>
        <LoadingOverlay visible={patientsLoading} />
      </div>
    </>
  );
};

export default PatientsPage;

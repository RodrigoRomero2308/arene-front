import { WithPermission } from "@/components/WithPermission/WithPermission";
import userContext from "@/context/UserContext/UserContext";
import { PermissionCodes } from "@/enums/permissions";
import { GET_PATIENTS_FOR_TABLE } from "@/graphql/query/patient.query";
import { IPatient, IPatientFilter } from "@/interfaces/IPatient";
import { userHasPermission } from "@/utils/permission.utils";
import { useLazyQuery } from "@apollo/client";
import {
  Button,
  Grid,
  Group,
  LoadingOverlay,
  Menu,
  ScrollArea,
  Space,
  Table,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DotsVertical, Edit, Plus, Accessible } from "tabler-icons-react";

const PatientsPage = () => {
  const [getPatients] = useLazyQuery(GET_PATIENTS_FOR_TABLE);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(userContext);

  const getPatientsFromServer = (variables?: { filter: IPatientFilter }) => {
    setPatientsLoading(true);
    getPatients({
      variables,
    })
      .then((result) => {
        setPatients(
          result.data.getPatients.map((item: any) => {
            delete item.__typename;
            return item;
          })
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setPatientsLoading(false);
      });
  };

  useEffect(() => {
    getPatientsFromServer();
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
      <form onSubmit={searchForm.onSubmit(handleSearchFormSubmit)}>
        <Grid>
          <Grid.Col md={4}>
            <TextInput
              label="Nombre"
              {...searchForm.getInputProps("name")}
            ></TextInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <TextInput
              label="DNI"
              {...searchForm.getInputProps("dni")}
            ></TextInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <TextInput
              label="Email"
              {...searchForm.getInputProps("email")}
            ></TextInput>
          </Grid.Col>
        </Grid>
        <Space h="md" />
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
          {newButton}
        </Group>
      </form>
      <Space h="md" />
      <div style={{ position: "relative" }}>
        <ScrollArea
          sx={() => ({
            maxWidth: "100vw",
          })}
        >
          <Table striped>
            <thead>
              <tr>
                <th>DNI</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {patients.map((item) => (
                <tr key={item.user_id}>
                  <td>{item.user?.dni}</td>
                  <td>
                    {item.user
                      ? `${item.user.firstname} ${item.user.lastname}`
                      : ""}
                  </td>
                  <td>{item.user?.email}</td>
                  <td>{item.user?.phone_number}</td>
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
                            navigate(`/app/patients/patientstatus/${item.user_id}`);
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
                      </Menu.Dropdown>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
        <LoadingOverlay visible={patientsLoading} />
      </div>
    </>
  );
};

export default PatientsPage;

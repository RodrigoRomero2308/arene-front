import { WithPermission } from "@/components/WithPermission/WithPermission";
import userContext from "@/context/UserContext/UserContext";
import { PermissionCodes } from "@/enums/permissions";
import { GET_PHYSIATRISTS_FOR_TABLE } from "@/graphql/query/professional.query";
import { IProfessional, IProfessionalFilter } from "@/interfaces/IProfessional";
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
import { DotsVertical, Edit, Plus } from "tabler-icons-react";

const PhysiatristPage = () => {
  const [getPhysiatrists] = useLazyQuery(GET_PHYSIATRISTS_FOR_TABLE);
  const [physiatrists, setPhysiatrists] = useState<IProfessional[]>([]);
  const [physiatristsLoading, setPhysiatristsLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(userContext);

  const getPhysiatristsFromServer = (variables?: {
    filter: IProfessionalFilter;
  }) => {
    setPhysiatristsLoading(true);
    getPhysiatrists({
      variables,
    })
      .then((result) => {
        setPhysiatrists(
          result.data.getPhysiatrists.map((item: any) => {
            delete item.__typename;
            return item;
          })
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setPhysiatristsLoading(false);
      });
  };

  useEffect(() => {
    getPhysiatristsFromServer();
  }, []);

  const newPhysiatristButton = useMemo(
    () => (
      <WithPermission permissionRequired={PermissionCodes.ProfessionalCreate}>
        <>
          <Space h="md" />
          <Button
            onClick={() => {
              navigate("/app/institucionalStaff/physiatrists/new");
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

  const searchForm = useForm<IProfessionalFilter>({
    initialValues: {
      dni: "",
      name: "",
      profession: "",
      medical_license_number: "",
      speciality: "",
    },
  });

  const handleSearchFormSubmit = (values: IProfessionalFilter) => {
    getPhysiatristsFromServer({ filter: values });
  };

  return (
    <>
      <Title order={2}>Fisiatras</Title>
      <Space h="md" />
      <Title order={5} style={{ marginLeft: 15 }}>
        Búsqueda por:
      </Title>
      <Space h="sm" />
      <form onSubmit={searchForm.onSubmit(handleSearchFormSubmit)}>
        <Grid
          gutter="xl"
          sx={(theme) => ({
            marginLeft: theme.spacing.xs,
          })}
        >
          <Grid.Col md={4}>
            <TextInput
              label="Nombre y Apellido"
              placeholder="Ingrese Nombre y Apellido"
              {...searchForm.getInputProps("name")}
            ></TextInput>
            <Space h="sm" />
            <TextInput
              label="DNI"
              placeholder="Ingrese DNI"
              {...searchForm.getInputProps("dni")}
            ></TextInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <TextInput
              label="Matricula"
              placeholder="Ingrese Matricula"
              {...searchForm.getInputProps("medical_license_number")}
            ></TextInput>
            <Space h="xl" />
            <Space h="sm" />
            <Group>
              <div>
                <Button
                  sx={(theme) => ({
                    marginRight: theme.spacing.sm,
                  })}
                  type="submit"
                  //rightIcon={<Search />}
                  loading={physiatristsLoading}
                >
                  Buscar
                </Button>
                <Button
                  variant="outline"
                  onClick={searchForm.reset}
                  loading={physiatristsLoading}
                >
                  Limpiar
                </Button>
              </div>
            </Group>
          </Grid.Col>
        </Grid>
        <Space h="md" />
        <div></div>
        {newPhysiatristButton}
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
                <th>Matricula</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Opciones</th>
              </tr>
            </thead>

            <tbody>
              {physiatrists.map((item) => (
                <tr key={item.user_id}>
                  <td>{item.user?.dni}</td>
                  <td>
                    {item.user
                      ? `${item.user.firstname} ${item.user.lastname}`
                      : ""}
                  </td>
                  <td>{item.medical_license_number}</td>
                  <td>{item.user?.email}</td>
                  <td>{item.user?.phone_number}</td>
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
                            navigate(
                              `/app/institucionalStaff/physiatrists/edit/${item.user_id}`
                            );
                          }}
                          icon={<Edit />}
                          disabled={
                            !userHasPermission(
                              user,
                              PermissionCodes.PatientUpdate
                            )
                          }
                        >
                          Modificar profesional
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
        <LoadingOverlay visible={physiatristsLoading} />
      </div>
    </>
  );
};

export default PhysiatristPage;

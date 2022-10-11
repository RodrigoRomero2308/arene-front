import { WithPermission } from "@/components/WithPermission/WithPermission";
import userContext from "@/context/UserContext/UserContext";
import { PermissionCodes } from "@/enums/permissions";
import { GET_COORDINATORS_FOR_TABLE } from "@/graphql/query/user.query";
import { IUser, IUserFilter } from "@/interfaces/IUser";
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

const CoordinatorsPage = () => {
  const [getCoordinators] = useLazyQuery(GET_COORDINATORS_FOR_TABLE);
  const [coordinators, setCoordinators] = useState<IUser[]>([]);
  const [coordinatorsLoading, setCoordinatorsLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(userContext);

  const getCoordinatorsFromServer = (variables?: { filter: IUserFilter }) => {
    setCoordinatorsLoading(true);
    getCoordinators({
      variables,
    })
      .then((result) => {
        console.log(result);
        setCoordinators(
          result.data.getCoordinators.map((item: any) => {
            delete item.__typename;
            return item;
          })
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setCoordinatorsLoading(false);
      });
  };

  useEffect(() => {
    getCoordinatorsFromServer();
  }, []);

  const newCoordinatorsButton = useMemo(
    () => (
      <WithPermission permissionRequired={PermissionCodes.ProfessionalCreate}>
        <>
          <Space h="md" />
          <Button
            onClick={() => {
              navigate("/app/institucionalStaff/coordinators/new");
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

  const searchForm = useForm<IUserFilter>({
    initialValues: {
      dni: "",
      name: "",
      email: "",
    },
  });

  const handleSearchFormSubmit = (values: IUserFilter) => {
    getCoordinatorsFromServer({ filter: values });
  };

  return (
    <>
      <Title order={2}>Coordinadores</Title>
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
              label="Email"
              placeholder="Ingrese Email"
              {...searchForm.getInputProps("email")}
            ></TextInput>
            <Space h="xl" />
            <Space h="sm" />
            <Group position="apart">
              <div>
                <Button
                  sx={(theme) => ({
                    marginRight: theme.spacing.sm,
                  })}
                  type="submit"
                  //rightIcon={<Search />}
                  loading={coordinatorsLoading}
                >
                  Buscar
                </Button>
                <Button
                  variant="outline"
                  onClick={searchForm.reset}
                  loading={coordinatorsLoading}
                >
                  Limpiar
                </Button>
              </div>
            </Group>
          </Grid.Col>
        </Grid>
        <Space h="md" />
        {newCoordinatorsButton}
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
                <th>Mail</th>
                <th>Numero de teléfono</th>
                <th>Opciones</th>
              </tr>
            </thead>

            <tbody>
              {coordinators.map((item) => (
                <tr key={item.id}>
                  <td>{item.dni}</td>
                  <td>{item ? `${item.firstname} ${item.lastname}` : ""}</td>
                  <td>{item.email}</td>
                  <td>{item.phone_number}</td>
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
                              `/app/institucionalStaff/coordinators/edit/${item.id}`
                            );
                          }}
                          icon={<Edit />}
                          disabled={
                            !userHasPermission(
                              user,
                              PermissionCodes.ProfessionalUpdate
                            )
                          }
                        >
                          Modificar
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
        <LoadingOverlay visible={coordinatorsLoading} />
      </div>
    </>
  );
};

export default CoordinatorsPage;

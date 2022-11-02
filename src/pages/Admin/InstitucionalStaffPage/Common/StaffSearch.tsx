import { WithPermission } from "@/components/WithPermission/WithPermission";
import { PermissionCodes } from "@/enums/permissions";
import { IAuthenticatedUser } from "@/interfaces/IAuthenticatedUser";
import { IProfessional, IProfessionalFilter } from "@/interfaces/IProfessional";
import { userHasPermission } from "@/utils/permission.utils";
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
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DotsVertical, Edit, Plus } from "tabler-icons-react";

type Props = {
  handleSearchFormSubmit: any;
  tableLoading: boolean;
  staffName: "Administradores" | "Coordinadores" | "Directores";
  staffPathName: "administrators" | "coordinators" | "directors";
  staffPeople: IProfessional[];
  user: IAuthenticatedUser | undefined;
};

export const NoMedicalStaffSearch = ({
  handleSearchFormSubmit,
  tableLoading,
  staffPathName,
  staffName,
  staffPeople,
  user,
}: Props) => {
  const navigate = useNavigate();

  const stafNameFirstCharTotUpperCase =
    staffName.charAt(0).toUpperCase() + staffName.slice(1);

  const newStaffPersonButton = useMemo(
    () => (
      <WithPermission permissionRequired={PermissionCodes.ProfessionalCreate}>
        <>
          <Space h="md" />
          <Button
            onClick={() => {
              navigate(`/app/institucionalStaff/${staffPathName}/new`);
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
    },
  });

  return (
    <>
      <Title order={2}>{stafNameFirstCharTotUpperCase}</Title>
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
          </Grid.Col>
          <Grid.Col md={4}>
            <TextInput
              label="DNI"
              placeholder="Ingrese DNI"
              {...searchForm.getInputProps("dni")}
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
                  loading={tableLoading}
                >
                  Buscar
                </Button>
                <Button
                  variant="outline"
                  onClick={searchForm.reset}
                  loading={tableLoading}
                >
                  Limpiar
                </Button>
              </div>
            </Group>
          </Grid.Col>
        </Grid>
        <Space h="md" />
        {newStaffPersonButton}
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
              {staffPeople.map((item) => (
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
                              `/app/institucionalStaff/administrators/edit/${item.user_id}`
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
        <LoadingOverlay visible={tableLoading} />
      </div>
    </>
  );
};

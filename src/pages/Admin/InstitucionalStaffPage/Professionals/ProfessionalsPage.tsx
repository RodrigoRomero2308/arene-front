import { WithPermission } from "@/components/WithPermission/WithPermission";
import userContext from "@/context/UserContext/UserContext";
import { PermissionCodes } from "@/enums/permissions";
import { GET_PROFESSIONALS_FOR_TABLE } from "@/graphql/query/professional.query";
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

const ProfessionalPage = () => {
  const [getProfessionals] = useLazyQuery(GET_PROFESSIONALS_FOR_TABLE);
  const [professionals, setProfessionals] = useState<IProfessional[]>([]);
  const [professionalsLoading, setProfessionalsLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useContext(userContext);

  const getProfessionalsFromServer = (variables?: {
    filter: IProfessionalFilter;
  }) => {
    setProfessionalsLoading(true);
    getProfessionals({
      variables,
    })
      .then((result) => {
        setProfessionals(
          result.data.getProfessionals.map((item: any) => {
            delete item.__typename;
            return item;
          })
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setProfessionalsLoading(false);
      });
  };

  useEffect(() => {
    getProfessionalsFromServer();
  }, []);

  const newProfessionalButton = useMemo(
    () => (
      <WithPermission permissionRequired={PermissionCodes.ProfessionalCreate}>
        <>
          <Space h="md" />
          <Button
            onClick={() => {
              navigate("/app/institucionalStaff/professionals/new");
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
    getProfessionalsFromServer({ filter: values });
  };

  return (
    <>
      <Title order={2}>Profesionales</Title>
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
            <Space h="sm" />
            <TextInput
              label="Matricula"
              placeholder="Ingrese Matricula"
              {...searchForm.getInputProps("medical_license_number")}
            ></TextInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <TextInput
              label="Especialidad"
              placeholder="Ingrese Especialidad"
              {...searchForm.getInputProps("speciality")}
            ></TextInput>
            <Space h="sm" />
            <TextInput
              label="Profesión"
              placeholder="Ingrese Profesión"
              {...searchForm.getInputProps("profession")}
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
                  loading={professionalsLoading}
                >
                  Buscar
                </Button>
                <Button
                  variant="outline"
                  onClick={searchForm.reset}
                  loading={professionalsLoading}
                >
                  Limpiar
                </Button>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col md={4}></Grid.Col>
        </Grid>
        <Space h="md" />
        <div></div>
        {newProfessionalButton}
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
                <th>Profesión</th>
                <th>Especialidad</th>
                <th>Matricula</th>
                <th>Opciones</th>
              </tr>
            </thead>

            <tbody>
              {professionals.map((item) => (
                <tr key={item.user_id}>
                  <td>{item.user?.dni}</td>
                  <td>
                    {item.user
                      ? `${item.user.firstname} ${item.user.lastname}`
                      : ""}
                  </td>
                  <td>{item.profession}</td>
                  <td>{item.speciality}</td>
                  <td>{item.medical_license_number}</td>
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
                              `/app/institucionalStaff/professionals/edit/${item.user_id}`
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
        <LoadingOverlay visible={professionalsLoading} />
      </div>
    </>
  );
};

export default ProfessionalPage;

import { WithPermission } from "@/components/WithPermission/WithPermission";
import { PermissionCodes } from "@/enums/permissions";
import { IProfessionalFilter } from "@/interfaces/IProfessional";
import { Button, Grid, Group, Space, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "tabler-icons-react";

type Props = {
  handleSearchFormSubmit: any;
  tableLoading: boolean;
  staffName:
    | "Administradores"
    | "Coordinadores"
    | "Directores"
    | "Fisiatras"
    | "Profesionales";
  staffPathName:
    | "administrators"
    | "coordinators"
    | "directors"
    | "physiatrists"
    | "professionals";
};

export const ProfessionalStaffSearch = ({
  handleSearchFormSubmit,
  tableLoading,
  staffPathName,
}: Props) => {
  const navigate = useNavigate();

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
      medical_license_number: "",
      profession: "",
      speciality: "",
    },
  });

  return (
    <>
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
          <Grid.Col md={4}></Grid.Col>
        </Grid>
        <Space h="md" />
        {newStaffPersonButton}
      </form>
    </>
  );
};

export const PhysiatristStaffSearch = ({
  handleSearchFormSubmit,
  tableLoading,
  staffPathName,
  staffName,
}: Props) => {
  const navigate = useNavigate();

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
      medical_license_number: "",
    },
  });

  return (
    <>
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
        <div></div>
        {newStaffPersonButton}
      </form>
    </>
  );
};

export const NoMedicalStaffSearch = ({
  handleSearchFormSubmit,
  tableLoading,
  staffPathName,
  staffName,
}: Props) => {
  const navigate = useNavigate();

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
    </>
  );
};

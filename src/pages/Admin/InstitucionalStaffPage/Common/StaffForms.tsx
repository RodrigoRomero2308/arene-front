import { phoneTypes } from "@/constants/phoneTypes";
import { UseFormReturnType } from "@mantine/form";
import { ICreateProfessionalFormDto } from "@/interfaces/ICreateProfessionalDTO";
import {
  Divider,
  Grid,
  NumberInput,
  Space,
  TextInput,
  Title,
  Select,
  PasswordInput,
  Button,
  LoadingOverlay,
} from "@mantine/core";

type Props = {
  handleSubmit: any;
  isUpdate: boolean;
  staffName: "Administrador" | "Coordinador" | "Director";
  form: UseFormReturnType<ICreateProfessionalFormDto>;
  formLoading: boolean;
};

export const NoMedicalStaffForm = ({
  handleSubmit,
  isUpdate,
  staffName,
  form,
  formLoading,
}: Props) => {
  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Title order={2}>
          {isUpdate ? `Actualizar ${staffName}` : `Registrar ${staffName}`}
        </Title>
        <Space h="sm" />
        <Title order={4}>Datos del {staffName}:</Title>
        <Space h="sm" />
        <Grid
          sx={(theme) => ({
            marginLeft: theme.spacing.xs,
          })}
        >
          <Grid.Col md={4}>
            <TextInput
              label="Nombre"
              required
              {...form.getInputProps("firstname")}
            ></TextInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <TextInput
              label="Apellido"
              required
              {...form.getInputProps("lastname")}
            ></TextInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <TextInput
              label="Email"
              required
              {...form.getInputProps("email")}
            ></TextInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <TextInput label="DNI" {...form.getInputProps("dni")}></TextInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <PasswordInput
              label={isUpdate ? "Actualizar contraseña" : "Contraseña"}
              required={!isUpdate}
              {...form.getInputProps("password")}
            ></PasswordInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <TextInput
              type="date"
              required
              label="Fecha de nacimiento"
              {...form.getInputProps("birth_date")}
            ></TextInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <TextInput
              label="Género"
              {...form.getInputProps("gender")}
            ></TextInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <TextInput
              label="Estado Civil"
              {...form.getInputProps("marital_status")}
            ></TextInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <Select
              searchable
              data={phoneTypes}
              label="Tipo Tel."
              {...form.getInputProps("phone_type_id")}
            ></Select>
          </Grid.Col>
          <Grid.Col md={4}>
            <NumberInput
              hideControls
              label="Teléfono"
              {...form.getInputProps("phone_number")}
            ></NumberInput>
          </Grid.Col>
        </Grid>
        <Space h="lg" />
        <Divider></Divider>
        <Space h="sm" />
        <Title order={4}>Datos residenciales del {staffName}:</Title>
        <Space h="sm" />
        <Grid
          sx={(theme) => ({
            marginLeft: theme.spacing.xs,
          })}
        >
          <Grid.Col md={4}>
            <TextInput
              label="Calle"
              required
              {...form.getInputProps("address.street")}
            ></TextInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <NumberInput
              hideControls
              label="Altura"
              required
              {...form.getInputProps("address.height")}
            ></NumberInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <TextInput
              label="Nro Dpto"
              {...form.getInputProps("address.flat_number")}
            ></TextInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <TextInput
              label="Provincia"
              required
              {...form.getInputProps("address.province")}
            ></TextInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <TextInput
              label="Ciudad"
              required
              {...form.getInputProps("address.city")}
            ></TextInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <TextInput
              label="Departamento"
              required
              {...form.getInputProps("address.department")}
            ></TextInput>
          </Grid.Col>
        </Grid>
        <Space h="lg" />
        <Divider></Divider>
        <Space h="sm" />
        <Button type="submit" loading={formLoading}>
          {isUpdate ? "Actualizar" : "Guardar"}
        </Button>
        <LoadingOverlay visible={formLoading} />
      </form>
    </>
  );
};

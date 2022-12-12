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
  Group,
} from "@mantine/core";

type UserProps = {
  isUpdate: boolean;
  staffName:
    | "Administrador"
    | "Coordinador"
    | "Director"
    | "Profesional"
    | "Fisiatra";
  form: UseFormReturnType<ICreateProfessionalFormDto>;
};

type ProfessionalProps = {
  form: UseFormReturnType<ICreateProfessionalFormDto>;
  isFisiatra: boolean;
};

type AddressProps = {
  staffName:
    | "Administrador"
    | "Coordinador"
    | "Director"
    | "Profesional"
    | "Fisiatra";
  form: UseFormReturnType<ICreateProfessionalFormDto>;
};

type Props = {
  handleSubmit: any;
  isUpdate: boolean;
  staffName:
    | "Administrador"
    | "Coordinador"
    | "Director"
    | "Profesional"
    | "Fisiatra";
  form: UseFormReturnType<ICreateProfessionalFormDto>;
  formLoading: boolean;
};

const CommonUserDataForm = ({ isUpdate, staffName, form }: UserProps) => {
  return (
    <>
      <Title order={4}>Datos del {staffName}:</Title>
      <Space h="sm" />
      <Divider my="xs" label="Datos personales" />
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
          <TextInput
            label="DNI"
            required
            {...form.getInputProps("dni")}
          ></TextInput>
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
    </>
  );
};

const ProfessionalDataForm = ({ form, isFisiatra }: ProfessionalProps) => {
  return (
    <>
      <Divider my="xs" label="Datos profesionales" />
      <Grid
        sx={(theme) => ({
          marginLeft: theme.spacing.xs,
        })}
      >
        {!isFisiatra ? (
          <>
            <Grid.Col md={4}>
              <TextInput
                label="Profesión"
                required
                {...form.getInputProps("professional.profession")}
              ></TextInput>
            </Grid.Col>
          </>
        ) : (
          <></>
        )}

        <Grid.Col md={4}>
          <TextInput
            label="Especialidad"
            required
            {...form.getInputProps("professional.speciality")}
          ></TextInput>
        </Grid.Col>
        <Grid.Col md={4}>
          <TextInput
            label="Matricula"
            required
            {...form.getInputProps("professional.medical_license_number")}
          ></TextInput>
        </Grid.Col>
      </Grid>
    </>
  );
};

const AddressDataForm = ({ staffName, form }: AddressProps) => {
  return (
    <>
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
    </>
  );
};

export const StaffForm = ({
  handleSubmit,
  isUpdate,
  staffName,
  form,
  formLoading,
}: Props) => {
  const isFisiatra: boolean = staffName == "Fisiatra" ? true : false;

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div style={{ position: "relative" }}>
          <Title order={2}>
            {isUpdate ? `Actualizar ${staffName}` : `Registrar ${staffName}`}
          </Title>
          <Space h="sm" />
          <CommonUserDataForm
            form={form}
            isUpdate={isUpdate}
            staffName={staffName}
          />
          <Space h="sm" />
          {staffName == "Profesional" || staffName == "Fisiatra" ? (
            <>
              <ProfessionalDataForm form={form} isFisiatra={isFisiatra} />
              <Space h="lg" />
              <Divider></Divider>
              <Space h="sm" />
            </>
          ) : (
            <>
              <Space h="lg" />
              <Divider></Divider>
              <Space h="sm" />
            </>
          )}
          <AddressDataForm form={form} staffName={staffName} />
          <Space h="lg" />
          <Space h="sm" />
          <Group position="center">
            <Button type="submit" loading={formLoading}>
              {isUpdate ? "Actualizar" : "Guardar"}
            </Button>
          </Group>
          <LoadingOverlay visible={formLoading} />
        </div>
      </form>
    </>
  );
};

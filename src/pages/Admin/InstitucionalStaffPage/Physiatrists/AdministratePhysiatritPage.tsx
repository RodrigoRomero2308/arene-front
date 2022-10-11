import { phoneTypes } from "@/constants/phoneTypes";
import {
  CREATE_PHYSIATRIST,
  UPDATE_PROFESSIONAL,
} from "@/graphql/mutation/professional.mutation";
import { GET_PROFESSIONAL_BY_ID_TO_UPDATE } from "@/graphql/query/professional.query";
import { ICreateProfessionalFormDto } from "@/interfaces/ICreateProfessionalDTO";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Button,
  Divider,
  Grid,
  LoadingOverlay,
  NumberInput,
  PasswordInput,
  Select,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { LooseKeys } from "@mantine/form/lib/types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PhysiatristFormDataSerializer } from "./PhysiatristFormDataSerializer";

const AdminPhysiatristPage = () => {
  const [createPhysiatrist] = useMutation(CREATE_PHYSIATRIST);
  const [updatePhysiatrist] = useMutation(UPDATE_PROFESSIONAL);
  const [formLoading, setFormLoading] = useState(false);
  const [getPhysiatristData] = useLazyQuery(GET_PROFESSIONAL_BY_ID_TO_UPDATE);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const form = useForm<ICreateProfessionalFormDto>({
    initialValues: {
      birth_date: "",
      dni: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      phone_number: "",
      phone_type_id: "",
      professional: {
        medical_licencse_number: "",
        profession: "Fisiatra",
        speciality: "",
      },
      address: {
        city: "",
        department: "",
        height: "",
        province: "",
        street: "",
      },
    },
  });

  const getPhysiatristFromServer = async (userId: number) => {
    try {
      setFormLoading(true);
      const data = await getPhysiatristData({
        variables: {
          id: userId,
        },
      });

      const formData =
        new PhysiatristFormDataSerializer().physiatristDataToFormData(
          data.data.getProfessionalById
        );

      form.setValues(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    if (params.user_id && Number.isInteger(+params.user_id)) {
      setIsUpdate(true);
      getPhysiatristFromServer(Number(params.user_id));
    }

    return () => {};
  }, []);

  const PhoneInputs = useCallback(
    ({
      form,
      typeProperty,
      numberProperty,
    }: {
      form: UseFormReturnType<ICreateProfessionalFormDto>;
      typeProperty: LooseKeys<ICreateProfessionalFormDto>;
      numberProperty: LooseKeys<ICreateProfessionalFormDto>;
    }) => {
      return (
        <>
          <Grid.Col md={4}>
            <Select
              searchable
              data={phoneTypes}
              label="Tipo Tel."
              {...form.getInputProps(typeProperty)}
            ></Select>
            <Space h="sm" />
            <NumberInput
              hideControls
              label="Teléfono"
              {...form.getInputProps(numberProperty)}
            ></NumberInput>
          </Grid.Col>
        </>
      );
    },
    []
  );

  const saveOperation = useCallback(
    (input) => {
      if (!isUpdate) {
        return createPhysiatrist({
          variables: {
            input,
          },
        });
      }

      const user_id = input.professional.user_id;

      delete input.professional.user_id;

      const variables = {
        input,
        id: user_id,
      };

      return updatePhysiatrist({
        variables,
      });
    },
    [isUpdate]
  );

  const handleSubmit = useCallback(
    async (values: ICreateProfessionalFormDto) => {
      try {
        setFormLoading(true);

        const input = new PhysiatristFormDataSerializer().formDataToCreateData(
          values
        );

        await saveOperation(input);

        setFormLoading(false);

        navigate("/app/institucionalStaff/physiatrists");
      } catch (error) {
        console.error(error);
        setFormLoading(false);
      }
    },
    [saveOperation]
  );

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Title order={2}>Registrar Fisiatra</Title>
        <Space h="sm" />
        <Title order={4}>Datos del Fisiatra:</Title>
        <Space h="sm" />
        <Divider my="xs" label="Datos como usuario" />
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
            <Space h="sm" />
            <TextInput label="DNI" {...form.getInputProps("dni")}></TextInput>
            <Space h="sm" />
            <TextInput
              label="Email"
              required
              {...form.getInputProps("email")}
            ></TextInput>
            <Space h="sm" />
            <TextInput
              label="Género"
              {...form.getInputProps("gender")}
            ></TextInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <TextInput
              label="Apellido"
              required
              {...form.getInputProps("lastname")}
            ></TextInput>
            <Space h="sm" />
            <TextInput
              type="date"
              required
              label="Fecha de nacimiento"
              {...form.getInputProps("birth_date")}
            ></TextInput>
            <Space h="sm" />
            <PasswordInput
              label="Contraseña"
              required
              {...form.getInputProps("password")}
            ></PasswordInput>
            <Space h="sm" />
            <TextInput
              label="Estado Civil"
              {...form.getInputProps("marital_status")}
            ></TextInput>
          </Grid.Col>
          <PhoneInputs
            form={form}
            typeProperty="phone_type_id"
            numberProperty="phone_number"
          />
        </Grid>
        <Space h="xl" />
        <Divider my="xs" label="Datos como fisiatra" />
        <Grid
          sx={(theme) => ({
            marginLeft: theme.spacing.xs,
          })}
        >
          <Grid.Col md={4}>
            <TextInput
              label="Especialidad"
              {...form.getInputProps("professional.speciality")}
            ></TextInput>
          </Grid.Col>
          <Grid.Col md={4}>
            <TextInput
              label="Matricula"
              {...form.getInputProps("professional.medical_licencse_number")}
            ></TextInput>
          </Grid.Col>
        </Grid>
        <Space h="lg" />
        <Divider></Divider>
        <Space h="sm" />
        <Title order={4}>Datos residenciales del fisiatra:</Title>
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

export default AdminPhysiatristPage;

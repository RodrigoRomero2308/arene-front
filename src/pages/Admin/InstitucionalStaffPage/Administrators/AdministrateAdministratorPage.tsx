import { phoneTypes } from "@/constants/phoneTypes";
import {
  CREATE_ADMINISTRATOR,
  UPDATE_USER,
} from "@/graphql/mutation/user.mutation";
import { GET_USER_BY_ID_TO_UPDATE } from "@/graphql/query/user.query";
import { ICreateUserFormDto } from "@/interfaces/ICreateUserDTO";
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
import { AdministratorFormDataSerializer } from "./AdministratorFormDataSerializer";

const AdminAdministratorPage = () => {
  const [createAdministrator] = useMutation(CREATE_ADMINISTRATOR);
  const [updateAdministrator] = useMutation(UPDATE_USER);
  const [formLoading, setFormLoading] = useState(false);
  const [getAdministratorData] = useLazyQuery(GET_USER_BY_ID_TO_UPDATE);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const form = useForm<ICreateUserFormDto>({
    initialValues: {
      birth_date: "",
      dni: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      phone_number: "",
      phone_type_id: "",
      address: {
        city: "",
        department: "",
        height: "",
        province: "",
        street: "",
      },
    },
  });

  const getAdministratorFromServer = async (userId: number) => {
    try {
      setFormLoading(true);
      const data = await getAdministratorData({
        variables: {
          id: userId,
        },
      });

      const formData =
        new AdministratorFormDataSerializer().administratorDataToFormData(
          data.data.getUserById
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
      getAdministratorFromServer(Number(params.user_id));
    }

    return () => {};
  }, []);

  const PhoneInputs = useCallback(
    ({
      form,
      typeProperty,
      numberProperty,
    }: {
      form: UseFormReturnType<ICreateUserFormDto>;
      typeProperty: LooseKeys<ICreateUserFormDto>;
      numberProperty: LooseKeys<ICreateUserFormDto>;
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
        return createAdministrator({
          variables: {
            input,
          },
        });
      }

      const user_id = input.id;

      delete input.id;

      const variables = {
        input,
        id: user_id,
      };

      return updateAdministrator({
        variables,
      });
    },
    [isUpdate]
  );

  const handleSubmit = useCallback(
    async (values: ICreateUserFormDto) => {
      try {
        setFormLoading(true);

        const input =
          new AdministratorFormDataSerializer().formDataToCreateData(values);

        await saveOperation(input);

        setFormLoading(false);

        navigate("/app/institucionalStaff/administrators");
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
        <Title order={2}>Registrar Administrador</Title>
        <Space h="sm" />
        <Title order={4}>Datos del Administrador:</Title>
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
        <Space h="lg" />
        <Divider></Divider>
        <Space h="sm" />
        <Title order={4}>Datos residenciales del administrador:</Title>
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

export default AdminAdministratorPage;

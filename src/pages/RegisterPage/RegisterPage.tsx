import {
  Card,
  Center,
  Title,
  Text,
  Grid,
  TextInput,
  PasswordInput,
  Button,
  Space,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { isEmail, isNumberString } from "class-validator";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import { REGISTER } from "@/graphql/mutation/user.mutation";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUserDTO } from "@/models/user.models";
import { LoginRedirectAction } from "../LoginPage/LoginRedirectActions";

function RegisterPage() {
  const [attemptRegister] = useMutation(REGISTER);
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const navigate = useNavigate();

  const registerForm = useForm({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      confirmPasword: "",
      dni: "",
    },
    validate: {
      email: (value) => {
        if (isEmail(value)) {
          return null;
        }
        return "Debe ingresar un email válido";
      },
      confirmPasword: (value, values) => {
        if (!value || !values.password) {
          return null;
        }
        if (value === values.password) {
          return null;
        }
        return "Las contraseñas no coinciden";
      },
      dni: (value) => {
        if (isNumberString(value)) {
          return null;
        }
        return "El dni debe ser numérico, sin espacios ni puntos";
      },
    },
  });

  const handleSuccessfulRegister = () => {
    navigate("/login", {
      state: {
        redirectAction: LoginRedirectAction.REGISTER_SUCCESSFULLY,
      },
    });
  };

  const handleRegister = registerForm.onSubmit(async (values) => {
    setSubmitButtonLoading(true);
    const registerInput: RegisterUserDTO = {
      dni: values.dni,
      email: values.email,
      firstname: values.firstname,
      lastname: values.lastname,
      password: values.password,
      phone: values.phone,
    };
    try {
      const registerResult = await attemptRegister({
        variables: {
          input: registerInput,
        },
      });
      if (!registerResult.errors) {
        handleSuccessfulRegister();
      }
    } catch (error) {
      console.error(error);
    }
    setSubmitButtonLoading(false);
  });

  return (
    <PublicLayout>
      <Center
        sx={(theme) => ({
          paddingTop: theme.spacing.xl,
        })}
      >
        <Card
          style={{
            width: "70vw",
          }}
          shadow="md"
        >
          <Center
            sx={(theme) => ({
              marginBottom: theme.spacing.sm,
            })}
          >
            <Title>Registro</Title>
          </Center>
          <form onSubmit={handleRegister}>
            <Grid gutter="md">
              <Grid.Col lg={6}>
                <TextInput
                  label="Nombre"
                  placeholder="Ingrese nombre"
                  required
                  {...registerForm.getInputProps("firstname")}
                ></TextInput>
              </Grid.Col>
              <Grid.Col lg={6}>
                <TextInput
                  label="Apellido"
                  placeholder="Ingrese apellido"
                  required
                  {...registerForm.getInputProps("lastname")}
                ></TextInput>
              </Grid.Col>
              <Grid.Col lg={6}>
                <TextInput
                  label="DNI"
                  placeholder="Ingrese DNI"
                  required
                  type="number"
                  {...registerForm.getInputProps("dni")}
                ></TextInput>
              </Grid.Col>
              <Grid.Col lg={6}>
                <TextInput
                  label="Email"
                  placeholder="Ingrese email"
                  required
                  {...registerForm.getInputProps("email")}
                ></TextInput>
              </Grid.Col>
              <Grid.Col lg={6}>
                <TextInput
                  label="Número de teléfono"
                  placeholder="Ingrese número de teléfono"
                  required
                  {...registerForm.getInputProps("phone")}
                ></TextInput>
              </Grid.Col>
              <Grid.Col lg={6}>
                <PasswordInput
                  label="Contraseña"
                  placeholder="Ingrese contraseña"
                  required
                  {...registerForm.getInputProps("password")}
                ></PasswordInput>
              </Grid.Col>
              <Grid.Col lg={6}>
                <PasswordInput
                  label="Confirmar contraseña"
                  placeholder="Confirme su contraseña"
                  required
                  {...registerForm.getInputProps("confirmPasword")}
                ></PasswordInput>
              </Grid.Col>
            </Grid>
            <Space h="md"></Space>
            <Button loading={submitButtonLoading} fullWidth type="submit">
              Registrarme
            </Button>
          </form>
          <Space h="sm"></Space>
          <Center>
            <Text size="xs">
              Si ya tienes una cuenta <Link to="/login">¡INICIA SESIÓN!</Link>
            </Text>
          </Center>
        </Card>
      </Center>
    </PublicLayout>
  );
}

export default RegisterPage;

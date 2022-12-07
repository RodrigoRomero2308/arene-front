import {
  Button,
  Card,
  Center,
  PasswordInput,
  Space,
  Text,
  TextInput,
  Image,
  Title,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { isEmail } from "class-validator";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/graphql/mutation/auth.mutation";
import { useState } from "react";
import LoginLabelByState from "./LoginLabelByState";
import { LocalStorageKeys } from "@/enums/localStorageKeys";
import { toast } from "react-toastify";
import { parseGraphqlErrorMessage } from "@/utils/parseGraphqlError";

function LoginPage() {
  const [attemptLogin] = useMutation(LOGIN);
  const [submitFormLoading, setSubmitFormLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  const localStorageLoginData = localStorage.getItem(
    LocalStorageKeys.LoginData
  );
  const loginData = localStorageLoginData
    ? JSON.parse(localStorageLoginData)
    : {};

  const loginForm = useForm({
    initialValues: {
      dniOrEmail: loginData.dniOrEmail || "",
      password: "",
      rememberMe: loginData.rememberMe || false,
    },
    validate: {
      dniOrEmail: (value) => {
        if (!Number.isNaN(Number(value))) {
          return null;
        }
        if (isEmail(value)) {
          return null;
        }
        return "Debe ingresar un numero de DNI sin puntos o un email válido";
      },
    },
  });

  const handleLogin = loginForm.onSubmit(async (values) => {
    setSubmitFormLoading(true);
    try {
      const loginResult = await attemptLogin({
        variables: {
          dniOrEmail: values.dniOrEmail,
          password: values.password,
        },
      });
      if (!loginResult.errors) {
        if (values.rememberMe) {
          localStorage.setItem(
            LocalStorageKeys.LoginData,
            JSON.stringify({
              dniOrEmail: values.dniOrEmail,
              rememberMe: true,
            })
          );
        } else {
          localStorage.setItem(LocalStorageKeys.LoginData, JSON.stringify({}));
        }
        navigate("/app");
      }
    } catch (error: any) {
      toast.error(parseGraphqlErrorMessage(error) || error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    setSubmitFormLoading(false);
  });

  return (
    <PublicLayout>
      <LoginLabelByState state={state} />
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
            <Title>Iniciar Sesión</Title>
          </Center>
          <form onSubmit={handleLogin}>
            <TextInput
              label="DNI o email"
              placeholder="Ingrese DNI o email"
              required
              {...loginForm.getInputProps("dniOrEmail")}
            ></TextInput>
            <Space h="sm"></Space>
            <PasswordInput
              label="Contraseña"
              placeholder="Ingrese contraseña"
              required
              {...loginForm.getInputProps("password")}
            ></PasswordInput>
            <Space h="sm"></Space>
            <Checkbox
              label="Recordarme"
              {...loginForm.getInputProps("rememberMe", {
                type: "checkbox",
              })}
            />
            <Space h="sm"></Space>
            <Center>
              <Link to="/">
                <Text size="xs">¿Olvidó su contraseña?</Text>
              </Link>
            </Center>
            <Space h="sm"></Space>
            <Button loading={submitFormLoading} fullWidth type="submit">
              Iniciar sesión
            </Button>
          </form>
          <Space h="sm"></Space>
          <Center>
            <Text size="xs">
              Si es la primera vez que ingresa{" "}
              <Link to="/register">¡REGÍSTRESE!</Link>
            </Text>
          </Center>
        </Card>
      </Center>
    </PublicLayout>
  );
}

export default LoginPage;

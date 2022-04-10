import {
  Button,
  Card,
  Center,
  PasswordInput,
  Space,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { isEmail } from "class-validator";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout/PublicLayout";

function LoginPage() {
  const loginForm = useForm({
    initialValues: {
      dniOrEmail: "",
      password: "",
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
          <Card.Section>
            <Center>
              <Title
                sx={(theme) => ({
                  padding: `${theme.spacing.sm}px 0`,
                })}
                order={1}
              >
                AReNe
              </Title>
            </Center>
          </Card.Section>
          <Center>
            <Text>Iniciar Sesión</Text>
          </Center>
          <form
            onSubmit={loginForm.onSubmit((values) => {
              console.log(values);
            })}
          >
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
            <Center>
              <Link to="/">
                <Text size="xs">¿Olvidó su contraseña?</Text>
              </Link>
            </Center>
            <Space h="sm"></Space>
            <Button fullWidth type="submit">
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

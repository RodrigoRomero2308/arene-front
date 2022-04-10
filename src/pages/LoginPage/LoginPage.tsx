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
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout/PublicLayout";

function LoginPage() {
  const loginForm = useForm({
    initialValues: {
      dniOrEmail: "",
      password: "",
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
            <Space h="md"></Space>
            <Button fullWidth type="submit">
              Iniciar sesión
            </Button>
          </form>
          <Space h="sm"></Space>
          <Center>
            <Text size="xs">
              ¿No tienes una cuenta? <Link to="/register">Registrate</Link>
            </Text>
          </Center>
        </Card>
      </Center>
    </PublicLayout>
  );
}

export default LoginPage;

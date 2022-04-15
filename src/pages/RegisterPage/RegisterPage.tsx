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
import { isEmail } from "class-validator";
import PublicLayout from "../../layouts/PublicLayout/PublicLayout";

function RegisterPage() {
  const registerForm = useForm({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      confirmPasword: "",
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
          <Center
            sx={(theme) => ({
              marginBottom: theme.spacing.sm,
            })}
          >
            <Text>Registro</Text>
          </Center>
          <form
            onSubmit={registerForm.onSubmit((values) => {
              console.log(values);
            })}
          >
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
            <Button fullWidth type="submit">
              Registrarme
            </Button>
          </form>
        </Card>
      </Center>
    </PublicLayout>
  );
}

export default RegisterPage;

import userContext from "@/context/UserContext/UserContext";
import { Button, Grid, Space, Text, TextInput, Title } from "@mantine/core";
import { DateRangePicker } from "@mantine/dates";
import { Dropzone } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useContext } from "react";
import { Upload } from "tabler-icons-react";

function ProfilePage() {
  const { user } = useContext(userContext);
  const profileForm = useForm({
    initialValues: {},
  });
  return (
    <>
      <Title order={4}>Datos personales:</Title>
      <Space h="sm" />
      <Grid gutter="md">
        <Grid.Col md={4}>
          <TextInput label="Nombre" placeholder="Ingrese nombre"></TextInput>
          <Space h="sm" />
          <TextInput
            label="Apellido"
            placeholder="Ingrese apellido"
          ></TextInput>
        </Grid.Col>
        <Grid.Col md={4}>
          <TextInput
            label="Correo electrónico"
            placeholder="Ingrese email"
          ></TextInput>
          <Space h="sm" />
          <TextInput label="CUIL" placeholder="Ingrese CUIL"></TextInput>
        </Grid.Col>
        <Grid.Col md={4}>
          <Text>Foto de perfil</Text>
          <Space h={4} />
          <Dropzone
            onDrop={(files) => {
              console.log(files);
            }}
          >
            {() => (
              <div style={{ textAlign: "center" }}>
                <Upload />
                <Space h="sm" />
                <Text>Cargue su imágen de perfil</Text>
              </div>
            )}
          </Dropzone>
        </Grid.Col>
        <Grid.Col md={4}>
          <TextInput
            label="Numero de teléfono"
            placeholder="Ingrese numero de teléfono"
          ></TextInput>
        </Grid.Col>
      </Grid>
      <Space h="sm" />
      <Title order={4}>Residencia:</Title>
      <Space h="sm" />
      <Grid>
        <Grid.Col md={4}>
          <TextInput label="Calle" placeholder="Ingrese calle"></TextInput>
        </Grid.Col>
        <Grid.Col md={4}>
          <TextInput label="N° Dpto."></TextInput>
        </Grid.Col>
        <Grid.Col md={4}>
          <TextInput label="Ciudad" placeholder="Ingrese ciudad"></TextInput>
        </Grid.Col>
        <Grid.Col md={4}>
          <TextInput
            label="Departamento"
            placeholder="Ingrese departamento"
          ></TextInput>
        </Grid.Col>
        <Grid.Col md={4}>
          <TextInput
            label="Provincia"
            placeholder="Ingrese provincia"
          ></TextInput>
        </Grid.Col>
      </Grid>
      <Space h="sm" />
      <Title order={4}>Obra Social:</Title>
      <Space h="sm" />
      <Grid>
        <Grid.Col md={4}>
          <TextInput label="Obra social" placeholder="OSPE"></TextInput>
        </Grid.Col>
        <Grid.Col md={4}>
          <TextInput label="Plan" placeholder="Ingrese plan"></TextInput>
        </Grid.Col>
        <Grid.Col md={4}>
          <TextInput label="Afiliado N°"></TextInput>
        </Grid.Col>
        <Grid.Col md={4}>
          <DateRangePicker locale="es" label="Vigencia desde - hasta" />
        </Grid.Col>
      </Grid>
      <Space h="sm" />
      <Button>Guardar</Button>
    </>
  );
}

export default ProfilePage;

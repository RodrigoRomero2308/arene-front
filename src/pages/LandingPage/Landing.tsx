import "./Landing.css";
import background1Src from "@/assets/images/background1.jpg";
import background2Src from "@/assets/images/background2.jpg";
import background3Src from "@/assets/images/background3.jpg";
import background4Src from "@/assets/images/background4.jpg";
import background5Src from "@/assets/images/background5.jpg";
import background6Src from "@/assets/images/background6.jpg";
import RotatingImageBackground from "@/components/RotatingImageBackground/RotatingImageBackground";
import {
  Accordion,
  Button,
  Center,
  Container,
  Grid,
  Group,
  MantineProvider,
  SimpleGrid,
  Space,
  Stack,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import { HeartHandshake } from "tabler-icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { isEmail } from "class-validator";
import { SendingRedirectActions } from "./SendingRedirectActions";
import { ConsultaDTO } from "@/models/consulta.models";
import { useMutation } from "@apollo/client";
import { CONSULTA } from "@/graphql/mutation/consulta.mutation";
function Landing() {
  const [attemptSendConsulta] = useMutation(CONSULTA);
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const navigate = useNavigate();

  const consultaForm = useForm({
    initialValues: {
      nombre: "",
      email: "",
      telefono: "",
      consulta: "",
    },
    validate: {
      email: (value) => {
        if (isEmail(value)) {
          return null;
        }
        return "Debe ingresar un email válido";
      },
    },
  });

  const handleSuccessfulSent = () => {
    navigate("/", {
      state: {
        redirectAction: SendingRedirectActions.SENDING_SUCCESSFULLY,
      },
    });
  };

  const handleSending = consultaForm.onSubmit(async (values) => {
    setSubmitButtonLoading(true);
    const ConsultaInput: ConsultaDTO = {
      nombre: values.nombre,
      email: values.email,
      telefono: values.telefono,
      consulta: values.consulta,
    };
    try {
      const sendingResult = await attemptSendConsulta({
        variables: {
          input: ConsultaInput,
        },
      });
      if (!sendingResult.errors) {
        handleSuccessfulSent();
      }
    } catch (error) {
      console.error(error);
    }
    setSubmitButtonLoading(false);
  });

  const therapies = [
    {
      label: "Terapia Fisiokinesica",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga saepe tenetur doloribus exercitationem alias nobis deserunt odio nemo labore, quibusdam, obcaecati placeat possimus, velit aliquam illum blanditiis quidem vitae consequuntur.",
    },
    {
      label: "Terapia Ocupacional",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga saepe tenetur doloribus exercitationem alias nobis deserunt odio nemo labore, quibusdam, obcaecati placeat possimus, velit aliquam illum blanditiis quidem vitae consequuntur.",
    },
    {
      label: "Trabajo Social",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga saepe tenetur doloribus exercitationem alias nobis deserunt odio nemo labore, quibusdam, obcaecati placeat possimus, velit aliquam illum blanditiis quidem vitae consequuntur.",
    },
    {
      label: "Fonoaudiología",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga saepe tenetur doloribus exercitationem alias nobis deserunt odio nemo labore, quibusdam, obcaecati placeat possimus, velit aliquam illum blanditiis quidem vitae consequuntur.",
    },
    {
      label: "Psicología",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga saepe tenetur doloribus exercitationem alias nobis deserunt odio nemo labore, quibusdam, obcaecati placeat possimus, velit aliquam illum blanditiis quidem vitae consequuntur.",
    },
    {
      label: "Enfermería",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga saepe tenetur doloribus exercitationem alias nobis deserunt odio nemo labore, quibusdam, obcaecati placeat possimus, velit aliquam illum blanditiis quidem vitae consequuntur.",
    },
    {
      label: "Nutrición",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga saepe tenetur doloribus exercitationem alias nobis deserunt odio nemo labore, quibusdam, obcaecati placeat possimus, velit aliquam illum blanditiis quidem vitae consequuntur.",
    },
  ];

  return (
    <MantineProvider
      theme={{ colorScheme: "light" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <PublicLayout>
        <Stack className="app" spacing={0}>
          <Center className="bienvenida" id="bienvenida">
            <p className="bienvenida-text">
              Bienvenido a la web de la&nbsp;
              <b className="bienvenida-nombre">
                Asociación de Rehabilitación Neurológica (AReNe)
              </b>
            </p>
          </Center>
          <div className="institucion" id="institucion">
            <Title order={1} className="institucion-title">
              Institución
            </Title>
            <SimpleGrid
              cols={2}
              spacing="xs"
              breakpoints={[{ maxWidth: 755, cols: 1, spacing: "sm" }]}
              className="institucion-contenido"
            >
              <Container className="galeria">
                <Title className="galeria-title" order={2}>
                  Galería
                </Title>
                <RotatingImageBackground
                  imageSrcs={[
                    background1Src,
                    background2Src,
                    background3Src,
                    background4Src,
                    background5Src,
                    background6Src,
                  ]}
                  timeout={5000}
                >
                  <></>
                </RotatingImageBackground>
              </Container>
              <Container className="institucion-info">
                <Text size="md">
                  El Instituto ARENE se origina a partir de una insuficiencia
                  sanitaria observada no solo a nivel regional sino también a
                  nivel nacional. Dicha situación se transforma en una fuerte
                  demanda social, ya que si bien los principales damnificados
                  son los pacientes con patologías neurológicas, también afecta
                  a todo su entorno por la dependencia y limitaciones
                  físico-cognitivas que presentan. Hoy en día, el Instituto
                  cuenta con un fuerte perfil social, pensado para los pacientes
                  y sus familias, logrando un espacio inclusivo.
                </Text>
                <Text size="md">
                  En la actualidad, la institución cuenta con el personal
                  capacitado e indispensable para trabajar con pacientes con
                  determinadas características. A medida que la demanda y el
                  funcionamiento del Instituto lo permita, se prevé un
                  crecimiento de la infraestructura, complejidad y recursos
                  humanos.
                </Text>
                <Text size="md">
                  Cabe señalar que en la provincia no existen centros de
                  rehabilitación con características integrales. Hay distintos
                  servicios que nuclean algunas áreas, o se puede acceder a
                  algún tipo de rehabilitación en los distintos centros de salud
                  sin dejar de tener en cuenta la superpoblación que sufren los
                  hospitales públicos.
                </Text>
              </Container>
            </SimpleGrid>
          </div>
          <div className="terapias" id="terapias">
            <Title className="terapias-title" order={1}>
              Terapias
            </Title>
            <Accordion className="terapias-accordion">
              {therapies.map((item) => (
                <Accordion.Item key={item.label} value={item.label}>
                  <Accordion.Control>
                    <Group>
                      <ThemeIcon color="blue" variant="light">
                        <HeartHandshake size={20} />
                      </ThemeIcon>
                      <Text>{item.label}</Text>
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>{item.text}</Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
          <div className="contacto" id="contacto">
            <Title className="contacto-title" order={1}>
              Contáctenos
            </Title>
            <SimpleGrid
              cols={2}
              spacing="xs"
              breakpoints={[{ maxWidth: 755, cols: 1, spacing: "sm" }]}
              className="contacto-contenido"
            >
              <Container className="contacto-form">
                <form onSubmit={handleSending}>
                  <TextInput
                    label="Nombre"
                    placeholder="Ingrese su nombre completo"
                    required
                    {...consultaForm.getInputProps("nombre")}
                  ></TextInput>
                  <Space h="sm"></Space>
                  <Grid columns={2}>
                    <Grid.Col span={1}>
                      <TextInput
                        label="Correo electrónico"
                        placeholder="Ingrese su correo electrónico"
                        required
                        {...consultaForm.getInputProps("email")}
                      ></TextInput>
                    </Grid.Col>
                    <Grid.Col span={1}>
                      <TextInput
                        label="Número de teléfono"
                        placeholder="Ingrese su número de teléfono"
                        required
                        {...consultaForm.getInputProps("telefono")}
                      ></TextInput>
                    </Grid.Col>
                  </Grid>
                  <Space h="sm"></Space>
                  <Textarea
                    placeholder="Ingrese su consulta"
                    label="Consulta"
                    autosize
                    required
                    {...consultaForm.getInputProps("consulta")}
                  />
                  <Space h="sm"></Space>
                  <Center>
                    <Button loading={submitButtonLoading} type="submit">
                      Enviar consulta
                    </Button>
                  </Center>
                </form>
              </Container>
              <Container className="contacto-ubicacion">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d841.4469453237497!2d-58.26670979195411!3d-32.47836757785417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95afda3a5ef161bf%3A0x8b27956410b3b58e!2sBv.%20Ricardo%20Balb%C3%ADn%204000%2C%20Concepci%C3%B3n%20del%20Uruguay%2C%20Entre%20R%C3%ADos!5e0!3m2!1ses-419!2sar!4v1655304340337!5m2!1ses-419!2sar"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Container>
            </SimpleGrid>
          </div>
        </Stack>
      </PublicLayout>
    </MantineProvider>
  );
}

export default Landing;

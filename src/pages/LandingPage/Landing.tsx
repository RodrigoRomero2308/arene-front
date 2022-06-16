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
  Card,
  Center,
  Grid,
  Image,
  MantineProvider,
  Space,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import doctorImg from "@/assets/images/doctorImage.svg";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import { HeartHandshake } from "tabler-icons-react";

function Landing() {
  return (
    <MantineProvider
      theme={{ colorScheme: "light" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <PublicLayout>
        <div className="app">
          <div className="bienvenida">
            <div className="bienvenida-desc">
              <p className="bienvenida-text">
                Bienvenido a la web de la
                <b style={{ color: "#228be6" }}>
                  {" "}
                  Asociación de Rehabilitación Neurológica (AReNe)
                </b>
              </p>
            </div>
            <div className="bienvenida-img">
              <Image
                width={"40vw"}
                src={doctorImg}
                alt="Imagen de doctor de bienvenida"
              />
            </div>
          </div>
          <div className="institucion">
            <div className="institucion-title">
              <Title order={1}>Institución</Title>
            </div>
            <div className="institucion-contenido">
              <div className="institucion-img">
                <Title order={2}>Galería</Title>
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
              </div>
              <div className="institucion-info">
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
              </div>
            </div>
          </div>
          <div className="terapias">
            <Title order={1}>Terapias</Title>
            <Accordion
              className="terapias-accordion"
              iconSize={22}
              icon={
                <ThemeIcon color="blue" variant="light">
                  <HeartHandshake size={20} />
                </ThemeIcon>
              }
              disableIconRotation
            >
              <Accordion.Item label="Terapia Fisiokinesica">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </Accordion.Item>
              <Accordion.Item label="Terapia Ocupacional">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </Accordion.Item>
              <Accordion.Item label="Trabajo Social">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </Accordion.Item>
              <Accordion.Item label="Fonoaudiología">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </Accordion.Item>
              <Accordion.Item label="Psicología">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </Accordion.Item>
              <Accordion.Item label="Enfermería">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </Accordion.Item>
              <Accordion.Item label="Nutrición">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="contacto">
            <div className="contacto-title">
              <Title order={1}>Contáctenos</Title>
            </div>
            <div className="contacto-contenido">
              <div className="contacto-form">
                <form>
                  <TextInput
                    label="Nombre"
                    placeholder="Ingrese su nombre completo"
                    required
                    /* {...loginForm.getInputProps("mail")} */
                  ></TextInput>
                  <Space h="sm"></Space>
                  <Grid columns={2}>
                    <Grid.Col span={1}>
                      <TextInput
                        label="Correo electrónico"
                        placeholder="Ingrese su correo electrónico"
                        required
                        /* {...loginForm.getInputProps("mail")} */
                      ></TextInput>
                    </Grid.Col>
                    <Grid.Col span={1}>
                      <TextInput
                        label="Número de teléfono"
                        placeholder="Ingrese su número de teléfono"
                        required
                        /*                 {...loginForm.getInputProps("telefono")} */
                      ></TextInput>
                    </Grid.Col>
                  </Grid>
                  <Space h="sm"></Space>
                  <Textarea
                    placeholder="Ingrese su consulta"
                    label="Consulta"
                    autosize
                    required
                  />
                  <Space h="sm"></Space>
                  <Center>
                    <Button type="submit">Enviar consulta</Button>
                  </Center>
                </form>
              </div>
              <div className="contacto-ubicacion">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d841.4469453237497!2d-58.26670979195411!3d-32.47836757785417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95afda3a5ef161bf%3A0x8b27956410b3b58e!2sBv.%20Ricardo%20Balb%C3%ADn%204000%2C%20Concepci%C3%B3n%20del%20Uruguay%2C%20Entre%20R%C3%ADos!5e0!3m2!1ses-419!2sar!4v1655304340337!5m2!1ses-419!2sar"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    </MantineProvider>
  );
}

export default Landing;

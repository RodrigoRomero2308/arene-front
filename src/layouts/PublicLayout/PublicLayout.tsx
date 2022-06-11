import {
  AppShell,
  Button,
  Center,
  Footer,
  Header,
  Image,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { ReactNode } from "react";
import { Link, useMatch } from "react-router-dom";
import logoArene from "@/assets/images/logo-arene-name.svg";
import phoneSrc from "@/assets/images/phone.svg";

function PublicLayout({ children }: { children: ReactNode }) {
  const theme = useMantineTheme();
  const isLanding = useMatch("/");
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          padding: isLanding? "0": "none"
        },
      }}
      fixed
      header={
        <Header height={80} p="md">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div style={{ width: "33vw", textAlign: "left" }}>
              <Link to="/">
                <Image
                  src={logoArene}
                  height={70}
                  fit="contain"
                  style={{ display: "inline-block" }}
                />
              </Link>
            </div>
            <div style={{ width: "33vw", textAlign: "center" }}>
              <Text size="xs">Asociacion de Rehabilitación Neurológica</Text>
              <Text size="xs">"Alfredo F. Thompson"</Text>
              <Text size="xs">Reg. Pub. Com. 257/06</Text>
            </div>
            <div style={{ width: "33vw" }}>
              <Center style={{ justifyContent: "end" }}>
                <Link
                  style={{
                    color: "inherit",
                    textDecoration: "inherit",
                  }}
                  to="/"
                >
                  <Text
                    sx={(theme) => ({
                      marginRight: theme.spacing.md,
                    })}
                  >
                    Institución
                  </Text>
                </Link>
                <Link
                  style={{
                    color: "inherit",
                    textDecoration: "inherit",
                  }}
                  to="/"
                >
                  <Text
                    sx={(theme) => ({
                      marginRight: theme.spacing.md,
                    })}
                  >
                    Terapias
                  </Text>
                </Link>
                <Link
                  style={{
                    color: "inherit",
                    textDecoration: "inherit",
                  }}
                  to="/"
                >
                  <Text
                    sx={(theme) => ({
                      marginRight: theme.spacing.md,
                    })}
                  >
                    Contacto
                  </Text>
                </Link>
                {isLanding ? (
                  <Link to={"/login"}>
                    <Button size="sm">Ingresar</Button>
                  </Link>
                ) : (
                  <></>
                )}
              </Center>
            </div>
          </div>
        </Header>
      }
      footer={
        isLanding ? (
          <Footer
            height={"80"}
            style={{
              padding: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div className="footer-left">
              <div
                className="footer-phone"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  className="inline-img"
                  src={phoneSrc}
                  alt=""
                  style={{ marginRight: "0.25rem" }}
                ></img>
                <span>( 03442 ) - 15519170</span>
              </div>
              <div>Horario de Atención de Lun. a Vier. 09 a 17 hs.</div>
            </div>
            <div className="footer-right" style={{ textAlign: "right" }}>
              <div>
                El Portal de AReNe - Concepción del Uruguay - Entre Ríos
              </div>
              <div>Acc. Luis Rodriguez Artuzi N° 2430, Esq. Villa Flor</div>
              <div>
                &copy; 2022 - Políticas de Privacidad - Términos y Condiciones -
                Desarrollado por Alumnos P.H.P. UTN
              </div>
            </div>
          </Footer>
        ) : (
          <></>
        )
      }
    >
      {children}
    </AppShell>
  );
}

export default PublicLayout;

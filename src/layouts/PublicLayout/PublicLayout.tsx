import {
  AppShell,
  Button,
  Center,
  Footer,
  Header,
  Image,
  Text,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { ReactNode } from "react";
import { Link, Outlet, Route, Routes, useMatch } from "react-router-dom";
import logoArene from "@/assets/images/logo-arene-name.svg";
import phoneSrc from "@/assets/images/phone.svg";
import { FileX, PhoneCall } from "tabler-icons-react";
import Landing from "@/pages/LandingPage/Landing";

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
          padding: isLanding ? "0" : "none",
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
              <a href="/#bienvenida">
                <Image
                  src={logoArene}
                  height={60}
                  fit="contain"
                  pt={5}
                  style={{ display: "inline-block" }}
                />
              </a>
            </div>
            <div style={{ width: "33vw", textAlign: "center" }}>
              <Text size="xs">Asociacion de Rehabilitación Neurológica</Text>
              <Text size="xs">"Alfredo F. Thompson"</Text>
              <Text size="xs">Reg. Pub. Com. 257/06</Text>
            </div>
            <div style={{ width: "33vw" }}>
              <Center style={{ justifyContent: "end" }}>
                <a
                  style={{
                    color: "inherit",
                    textDecoration: "inherit",
                  }}
                  href="/#institucion"
                >
                  <Text
                    sx={(theme) => ({
                      marginRight: theme.spacing.md,
                    })}
                  >
                    Institución
                  </Text>
                </a>
                <a
                  style={{
                    color: "inherit",
                    textDecoration: "inherit",
                  }}
                  href="/#terapias"
                >
                  <Text
                    sx={(theme) => ({
                      marginRight: theme.spacing.md,
                    })}
                  >
                    Terapias
                  </Text>
                </a>
                <a
                  style={{
                    color: "inherit",
                    textDecoration: "inherit",
                  }}
                  href="/#contacto"
                >
                  <Text
                    sx={(theme) => ({
                      marginRight: theme.spacing.md,
                    })}
                  >
                    Contacto
                  </Text>
                </a>
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
                <PhoneCall size={20} />
                <span> (03442) - 15519170</span>
              </div>
              <div>Horario de Atención de Lun. a Vier. 09 a 17 hs.</div>
            </div>
            <div className="footer-right" style={{ textAlign: "right" }}>
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
      <Outlet />
      {children}
    </AppShell>
  );
}

export default PublicLayout;

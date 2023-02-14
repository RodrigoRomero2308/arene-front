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
import { ReactNode, useEffect, useState } from "react";
import { Link, Outlet, useMatch } from "react-router-dom";
import logoArene from "@/assets/images/logo-arene-name.svg";
import { Mail, PhoneCall } from "tabler-icons-react";
import "./PublicLayout.css";

function PublicLayout({ children }: { children: ReactNode }) {
  const theme = useMantineTheme();
  const isLanding = useMatch("/");
  const [footerSpacing, setFooterSpacing] = useState(112);

  const handlerResizeFooterSpacing = (event: UIEvent) => {
    const footer = document.getElementById("public-layout-footer");

    if (!footer) return;

    console.log(footer.getBoundingClientRect().height);
    setFooterSpacing(footer.getBoundingClientRect().height + 16);
  };

  useEffect(() => {
    window.addEventListener("resize", handlerResizeFooterSpacing);
    return () =>
      window.removeEventListener("resize", handlerResizeFooterSpacing);
  }, []);

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
          <div className="public-layout-header">
            <div className="public-layout-header-logo">
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
            <div className="public-layout-header-description">
              <Text size="xs">Asociacion de Rehabilitación Neurológica</Text>
              <Text size="xs">"Alfredo F. Thompson"</Text>
              <Text size="xs">Reg. Pub. Com. 257/06</Text>
            </div>
            <div className="public-layout-header-buttons">
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
                      marginRight: theme.spacing.sm,
                    })}
                    size="xs"
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
                    size="xs"
                    sx={(theme) => ({
                      marginRight: theme.spacing.sm,
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
                    size="xs"
                    sx={(theme) => ({
                      marginRight: theme.spacing.sm,
                    })}
                  >
                    Contacto
                  </Text>
                </a>
                {isLanding ? (
                  <Link to={"/login"}>
                    <Button size="xs">Ingresar</Button>
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
            id="public-layout-footer"
            height={"96"}
            style={{
              padding: "1rem 1rem 0.5rem 1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
                width: "100%",
              }}
            >
              {/* top-left */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <PhoneCall size={20} />
                  <Text size="xs" style={{ marginLeft: "0.5rem" }}>
                    +54 9 3442 562300
                  </Text>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Mail />
                  <a href="mailto: institutoarene@gmail.com">
                    <Text size="xs" style={{ marginLeft: "0.5rem" }}>
                      institutoarene@gmail.com
                    </Text>
                  </a>
                </div>
              </div>
              {/* top-right */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "end",
                }}
              >
                <Text size="xs">
                  Horario de Atención de Lun. a Vier. 08 a 12 hs.
                </Text>
                <Text size="xs">
                  Acc. Luis Rodriguez Artuzi N° 2430, Esq. Villa Flor
                </Text>
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
                width: "100%",
                paddingTop: "0.5rem",
              }}
            >
              <Text size="xs">
                &copy; 2022 - Políticas de Privacidad - Términos y Condiciones -
                Desarrollado por Alumnos P.H.P. UTN
              </Text>
            </div>
          </Footer>
        ) : (
          <></>
        )
      }
    >
      <Outlet />
      {children}
      <div
        style={{
          paddingBottom: footerSpacing,
          backgroundColor: "white",
        }}
      ></div>
    </AppShell>
  );
}

export default PublicLayout;

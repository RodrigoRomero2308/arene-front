import {
  AppShell,
  Center,
  Header,
  Image,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import logoDark from "@/assets/images/logo-arene-dark.jpeg";

function PublicLayout({ children }: { children: ReactNode }) {
  const theme = useMantineTheme();
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
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
                  src={logoDark}
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
              </Center>
            </div>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}

export default PublicLayout;

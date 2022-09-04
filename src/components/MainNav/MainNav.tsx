import {
  Box,
  Group,
  Navbar,
  ScrollArea,
  Space,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { navRoutes } from "./NavRoutes";

function MainNav() {
  const navigate = useNavigate();
  return (
    <Navbar.Section
      grow
      component={ScrollArea}
      sx={(theme: any) => ({
        padding: theme.spacing.sm,
      })}
    >
      {navRoutes.map((route) => (
        <div key={route.route}>
          <UnstyledButton
            onClick={() => {
              navigate(`/app${route.route}`);
            }}
          >
            <Group>
              <ThemeIcon
                sx={(theme) => ({
                  borderRadius: theme.defaultRadius,
                })}
                color={route.iconColor}
                variant="light"
              >
                {route.icon}
              </ThemeIcon>
              <Text>{route.label}</Text>
            </Group>
          </UnstyledButton>
          <Space h="md" />
        </div>
      ))}
    </Navbar.Section>
  );
}

export default MainNav;

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
import { WithPermission } from "@/components/WithPermission/WithPermission";
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
      {navRoutes.map((route) => {
        const innerComponent = (
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
        );
        if (route.permissionRequired) {
          return (
            <WithPermission
              key={route.route}
              permissionRequired={route.permissionRequired}
            >
              {innerComponent}
            </WithPermission>
          );
        }
        return innerComponent;
      })}
    </Navbar.Section>
  );
}

export default MainNav;

import appContext from "@/context/AppContext/AppContext";
import { LOGOUT } from "@/graphql/mutation/auth.mutation";
import { useMutation } from "@apollo/client";
import { Divider, Menu, Text, Title, UnstyledButton } from "@mantine/core";
import { MouseEventHandler, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Logout } from "tabler-icons-react";
import UserAvatar from "../UserAvatar/UserAvatar";

const MainHeader = () => {
  const [logout] = useMutation(LOGOUT);
  const navigate = useNavigate();
  const { setAppLoading } = useContext(appContext);

  const handleLogout: MouseEventHandler = () => {
    setAppLoading(true);
    return logout({
      onError: (error) => {
        console.error(error);
        setAppLoading(false);
      },
      onCompleted: () => {
        setAppLoading(false);
        return navigate("/login");
      },
    });
  };

  return (
    <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
      <Title sx={{ display: "block", flex: 1, minWidth: 0 }} order={1}>
        Arene
      </Title>
      <Divider
        sx={{ height: "auto", marginRight: "0.75rem" }}
        size="xs"
        orientation="vertical"
      />
      <div style={{ flex: 0 }}>
        <Menu>
          <Menu.Target>
            <UnstyledButton>
              <UserAvatar />
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item rightSection={<Logout />} onClick={handleLogout}>
              <Text>Cerrar sesión</Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};

export default MainHeader;

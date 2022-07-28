import appContext from "@/context/AppContext/AppContext";
import { LOGOUT } from "@/graphql/mutation/auth.mutation";
import { useMutation } from "@apollo/client";
import { Menu, Text, UnstyledButton } from "@mantine/core";
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
      <span
        style={{
          flex: 1,
          minWidth: 0,
          fontWeight: "bold",
        }}
      >
        Arene
      </span>
      <div style={{ flex: 0 }}>
        <Menu
          control={
            <UnstyledButton>
              <UserAvatar />
            </UnstyledButton>
          }
        >
          <Menu.Item rightSection={<Logout />} onClick={handleLogout}>
            <Text>Cerrar sesión</Text>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default MainHeader;

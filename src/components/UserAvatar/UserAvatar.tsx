import userContext from "@/context/UserContext/UserContext";
import { Avatar } from "@mantine/core";
import { useContext } from "react";

function UserAvatar() {
  const { user } = useContext(userContext);

  if (!user) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Avatar
        sx={(theme) => ({
          marginRight: theme.spacing.xs,
        })}
      >
        {user.firstname[0]}
      </Avatar>
      <span>{user.firstname}</span>
    </div>
  );
}

export default UserAvatar;

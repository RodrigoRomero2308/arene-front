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
        textAlign: "right",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: "0.25rem",
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
      {user.email && (
        <div
          style={{
            fontSize: "0.75rem",
          }}
        >
          {user.email}
        </div>
      )}
    </div>
  );
}

export default UserAvatar;

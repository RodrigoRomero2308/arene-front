import userContext from "@/context/UserContext/UserContext";
import { PermissionCodes } from "@/enums/permissions";
import { userHasPermission } from "@/utils/permission.utils";
import { ReactElement, useContext } from "react";

export const WithPermission = ({
  children,
  permissionRequired,
  renderWithoutPermission,
}: {
  children: ReactElement;
  permissionRequired: PermissionCodes;
  renderWithoutPermission?: ReactElement;
}) => {
  const { user } = useContext(userContext);

  if (userHasPermission(user, permissionRequired)) {
    return children;
  }

  return renderWithoutPermission || null;
};

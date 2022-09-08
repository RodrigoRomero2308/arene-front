import { PermissionCodes } from "@/enums/permissions";
import { IAuthenticatedUser } from "@/interfaces/IAuthenticatedUser";

export const userHasPermission = (
  user: IAuthenticatedUser | undefined,
  permission: PermissionCodes
): boolean => {
  return !!user && !!user.permissions.find((item) => item.code === permission);
};

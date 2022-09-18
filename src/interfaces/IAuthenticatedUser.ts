import { IPermission } from "./IPermission";
import { IUser } from "./IUser";

export interface IAuthenticatedUser extends IUser {
  permissions: IPermission[];
}

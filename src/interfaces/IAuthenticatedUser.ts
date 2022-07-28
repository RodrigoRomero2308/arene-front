import { IPermission } from "./IPermission";

export interface IAuthenticatedUser {
  id: number;
  dni: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  permissions: IPermission[];
}

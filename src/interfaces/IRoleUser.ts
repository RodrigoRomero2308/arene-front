import { IUser } from "./IUser";
import { IRole } from "./IRole";

export interface IRoleUser {
  user_id: number;
  role_id: number;
  user: IUser | null;
  role: IRole | null;
}

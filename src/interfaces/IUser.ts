import { IAddress } from "./IAddress";

export interface IUser {
  id: number;

  dni: string;

  email: string;

  firstname: string;

  lastname: string;

  password: string;

  active: boolean;

  birth_date: string;

  gender?: string | null;

  marital_status?: string | null;

  phone_type_id?: number | null;

  phone_number?: string | null;

  adress_id?: number | null;

  profile_picture_id?: number | null;

  address?: IAddress | null;
}

export interface IUserFilter {
  dni?: string;

  name?: string;

  email?: string;
}

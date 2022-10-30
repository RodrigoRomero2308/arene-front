export interface IUser {
  id: number;

  dni: string;

  email: string;

  firstname: string;

  lastname: string;

  password: string;

  active: boolean;

  birth_date: Date;

  phone_type_id?: number | null;

  phone_number?: string | null;

  adress_id?: number | null;

  profile_picture_id?: number | null;
}

export interface IUserFilter {
  dni?: string;

  name?: string;

  email?: string;
}

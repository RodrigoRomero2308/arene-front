import { IUser } from "./IUser";

export interface IProfessional {
  user_id: number;

  profession: string;

  speciality: string;

  medical_license_number: string;

  user?: IUser | null;
}

export interface IProfessionalFilter {
  dni?: string;

  name?: string;

  speciality?: string;

  profession?: string;

  medical_license_number?: string;
}

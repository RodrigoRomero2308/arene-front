import { IUser } from "./IUser";

export interface IPatient {
  user_id: number;

  patient_status_id: number;

  companion_firstname?: string | null;

  companion_lastname?: string | null;

  companion_phone_type_id?: number | null;

  companion_phone_number?: string | null;

  responsible_firstname?: string | null;

  responsible_lastname?: string | null;

  responsible_phone_type_id?: number | null;

  responsible_phone_number?: string | null;

  primary_doctor_firstname?: string | null;

  primary_doctor_lastname?: string | null;

  primary_doctor_phone_type_id?: number | null;

  primary_doctor_phone_number?: string | null;

  diagnose: string;

  diagnose_date: string;

  needs_transfer: boolean;

  transfer?: string | null;

  transfer_responsible?: string | null;

  transfer_phone_type_id?: number | null;

  transfer_phone_number?: string | null;

  cud_number?: string | null;

  cud_companion?: boolean | null;

  cud_valid_from?: string | null;

  cud_valid_to?: string | null;

  social_work?: string | null;

  social_work_plan?: string | null;

  social_work_number?: string | null;

  social_work_valid_from?: string | null;

  social_work_valid_to?: string | null;

  user?: IUser | null;
}

export interface IPatientFilter {
  dni?: string;

  name?: string;

  email?: string;
}

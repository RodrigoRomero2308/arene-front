import { OrderByDirection } from "@/enums/patientInformationOrderByDirection";
import { PatientInformationOrderByField } from "@/enums/patientInformationOrderByField";
import { IUser } from "./IUser";

export interface IPatientInformation {
  id: number;

  title: string;

  information: string;

  documentation_id?: number;

  created_by: number;

  Its: Date;

  createdBy?: IUser;
}

export interface IPatientInformationFilter {
  patient_id?: number;

  created_by?: number;

  date_from?: Date;

  date_to?: Date;
}

export interface IPatientInformationOrderByInput {
  field: PatientInformationOrderByField;

  direction: OrderByDirection;
}

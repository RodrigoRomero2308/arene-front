import { IArea } from "./IArea";

export interface ITreatment {
  id: number;
  area_id: number;
  quantity: number;
  patient_id: number;
  area: IArea;
}

export interface ITreatmentFilter {
  area_id?: number;
  patient_id?: number;
}

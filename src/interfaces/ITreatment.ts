export interface ITreatment {
  id: number;
  area_id: number;
  quantity: number;
  patient_id: number;
}

export interface ITreatmentFilter {
  area_id?: number;
  patient_id?: number;
}

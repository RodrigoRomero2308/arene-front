export interface IAppointment {
  id: number;
  treatment_id: number;
  professional_id: number;
  day_of_the_week: string;
  start_hour: string;
  end_hour: string;
  treatment: {
    id: number;
    area_id: number;
    patient_id: number;
    patient: {
      user: {
        id: number;
        firstname: string;
        lastname: string;
        email: string;
      };
    };
  };
}

export interface IAppointmentFilter {
  id?: number;
  treatment_id?: number;
  professional_id?: number;
  day_of_the_week?: string;
  start_hour?: string;
  end_hour?: string;
}

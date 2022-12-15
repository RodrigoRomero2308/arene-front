export interface ICreatePatientFormDto {
  dni: string;

  email: string;

  firstname: string;

  lastname: string;

  gender?: string;

  marital_status?: string;

  password: string;

  birth_date: string;

  phone_type_id?: string;

  phone_number?: string;

  adress_id?: number;

    patient: {
    companion_firstname?: string;

    companion_lastname?: string;

    companion_phone_type_id?: string;

    companion_phone_number?: string;

    responsible_firstname?: string;

    responsible_lastname?: string;

    responsible_phone_type_id?: string;

    responsible_phone_number?: string;

    primary_doctor_firstname?: string;

    primary_doctor_lastname?: string;

    primary_doctor_phone_type_id?: string;

    primary_doctor_phone_number?: string;

    diagnose: string;

    diagnose_date: string;

    needs_transfer: string;

    transfer?: string;

    transfer_responsible?: string;

    transfer_phone_type_id?: string;

    transfer_phone_number?: string;

    cud_number?: string;

    cud_companion?: boolean;

    cud_valid_from?: string;

    cud_valid_to?: string;

    social_work?: string;

    social_work_plan?: string;

    social_work_number?: string;

    social_work_valid_from?: string;

    social_work_valid_to?: string;
  };

  address: {
    street: string;

    height: string;

    flat_number?: string;

    province: string;

    city: string;

    department: string;
  };
}

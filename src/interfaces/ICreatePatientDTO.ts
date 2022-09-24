export interface ICreatePatientFormDto {
  dni: string;

  email: string;

  firstname: string;

  lastname: string;

  gender?: string;

  marital_status?: string;

  password: string;

  birth_date: string;

  phone_type_id?: number;

  phone_number?: string;

  adress_id?: number;

  patient: {
    companion_firstname?: string;

    companion_lastname?: string;

    companion_phone_type_id?: number;

    companion_phone_number?: string;

    responsible_firstname?: string;

    responsible_lastname?: string;

    responsible_phone_type_id?: number;

    responsible_phone_number?: string;

    primary_doctor_firstname?: string;

    primary_doctor_lastname?: string;

    primary_doctor_phone_type_id?: number;

    primary_doctor_phone_number?: string;

    diagnose: string;

    diagnose_date: string;

    needs_transfer: boolean;

    transfer?: string;

    transfer_responsible?: string;

    transfer_phone_type_id?: number;

    transfer_phone_number?: string;
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

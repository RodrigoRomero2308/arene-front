export interface ICreateUserFormDto {
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

  address: {
    street: string;

    height: string;

    flat_number?: string;

    province: string;

    city: string;

    department: string;
  };
}

import { gql } from "@apollo/client";

export const GET_PATIENTS = gql`
  query getPatients {
    getPatients {
      user_id
      patient_status_id
      companion_firstname
      companion_lastname
      companion_phone_type_id
      companion_phone_number
      responsible_firstname
      responsible_lastname
      responsible_phone_type_id
      responsible_phone_number
      primary_doctor_firstname
      primary_doctor_lastname
      primary_doctor_phone_type_id
      primary_doctor_phone_number
      diagnose
      diagnose_date
      needs_transfer
      transfer
      transfer_responsible
      transfer_phone_type_id
      transfer_phone_number
      user {
        dni
        email
        firstname
        lastname
        birth_date
        phone_type_id
        phone_number
        address {
          street
          height
          flat_number
          province
          city
          department
        }
        profile_picture_id
      }
    }
  }
`;

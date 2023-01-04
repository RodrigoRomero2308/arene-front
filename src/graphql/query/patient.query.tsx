import { gql } from "@apollo/client";

export const GET_PATIENT_BY_ID = gql`
  query getPatientById($id: Int!) {
    getPatientById(id: $id) {
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
      cud_number
      cud_companion
      cud_valid_from
      cud_valid_to
      social_work
      social_work_plan
      social_work_number
      social_work_valid_from
      social_work_valid_to
      user {
        dni
        email
        firstname
        lastname
        birth_date
        gender
        marital_status
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

export const GET_PATIENTS_FOR_TABLE = gql`
  query getPatients($filter: PatientFilter) {
    getPatients(filter: $filter) {
      user_id
      patient_status_id
      needs_transfer
      user {
        id
        dni
        email
        firstname
        lastname
        phone_number
      }
    }
  }
`;

export const GET_PATIENT_INFORMATION = gql`
  query patientInformation(
    $filter: PatientInformationFilter
    $orderBy: PatientInformationOrderByInput
  ) {
    patientInformation(filter: $filter, orderBy: $orderBy) {
      id
      information
      documentation_id
      its
      created_by
      createdBy {
        firstname
        lastname
      }
      patientInformationType {
        name
      }
    }
  }
`;

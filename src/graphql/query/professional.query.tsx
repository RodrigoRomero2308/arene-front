import { gql } from "@apollo/client";

export const GET_PROFESSIONAL_BY_ID_TO_UPDATE = gql`
  query getProfessionalById($id: Int!) {
    getProfessionalById(id: $id) {
      user_id
      profession
      speciality
      medical_license_number
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

export const GET_PROFESSIONALS_FOR_TABLE = gql`
  query getProfessionals($filter: ProfessionalFilter) {
    getProfessionals(filter: $filter) {
      user_id
      profession
      speciality
      medical_license_number
      user {
        firstname
        lastname
        dni
      }
    }
  }
`;

export const GET_PHYSIATRISTS_FOR_TABLE = gql`
  query getPhysiatrists($filter: ProfessionalFilter) {
    getPhysiatrists(filter: $filter) {
      user_id
      medical_license_number
      user {
        firstname
        lastname
        dni
      }
    }
  }
`;

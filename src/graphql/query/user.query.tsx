import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
    }
  }
`;

export const GET_USER_BY_ID_TO_UPDATE = gql`
  query getUserById($id: Int!) {
    getUserById(id: $id) {
      id
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
    }
  }
`;

export const AUTHENTICATE = gql`
  query authenticate {
    authenticate {
      id
      email
      firstname
      lastname
      permissions {
        code
      }
    }
  }
`;

export const GET_ADMINISTRATORS_FOR_TABLE = gql`
  query getAdministrators($filter: UserFilter) {
    getAdministrators(filter: $filter) {
      id
      dni
      email
      firstname
      lastname
      phone_number
    }
  }
`;

export const GET_COORDINATORS_FOR_TABLE = gql`
  query getCoordinators($filter: UserFilter) {
    getCoordinators(filter: $filter) {
      id
      dni
      email
      firstname
      lastname
      phone_number
    }
  }
`;

export const GET_DIRECTORS_FOR_TABLE = gql`
  query getDirectors($filter: UserFilter) {
    getDirectors(filter: $filter) {
      id
      dni
      email
      firstname
      lastname
      phone_number
    }
  }
`;

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

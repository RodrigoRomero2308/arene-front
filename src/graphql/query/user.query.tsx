import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
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

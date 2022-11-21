import { gql } from "@apollo/client";

export const GET_ROLES = gql`
  query getRoles {
    getRoles {
      id
      name
      description
    }
  }
`;

export const GET_ROLES_BY_USER_ID = gql`
  query getRoleUsersByUserId($userId: Int!) {
    getRoleUsersByUserId(userId: $userId) {
      role {
        id
        name
        description
      }
    }
  }
`;

export const GET_ROLE_BY_ROLE_NAME = gql`
  query getRoleByName($name: String!) {
    getRoleByName(name: $name) {
      id
      name
      description
    }
  }
`;

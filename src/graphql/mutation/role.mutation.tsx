import { gql } from "@apollo/client";

export const DELETE_ROLE = gql`
  mutation deleteRole($id: Int!) {
    deleteRole(id: $id) {
      id
    }
  }
`;

export const CREATE_ROLE = gql`
  mutation createRole($input: CreateRoleInput!) {
    createRole(input: $input) {
      id
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation updateRole($id: Int!, $input: UpdateRoleInput!) {
    updateRole(id: $id, input: $input) {
      id
    }
  }
`;


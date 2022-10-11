import { gql } from "@apollo/client";

export const CREATE_ROLEUSER = gql`
  mutation createRoleUser($input: createRoleUserInput) {
    createRoleUser(input: $input) {
      userId
      roleId
    }
  }
`;

export const DELETE_ROLEUSER = gql`
  mutation deleteRoleUser($input: deleteRoleUserInput) {
    deleteRoleUser(input: $input) {
      userId
      roleId
    }
  }
`;

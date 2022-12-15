import { gql } from "@apollo/client";

export const CREATE_ROLEUSER = gql`
  mutation createRoleUser($input: CreateRoleUserInput!) {
    createRoleUser(input: $input) {
      userId
      roleId
    }
  }
`;

export const DELETE_ROLEUSER = gql`
  mutation deleteRoleUser($input: RoleUserUserIdRoleIdCompoundUniqueInput!) {
    deleteRoleUser(input: $input) {
      userId
      roleId
    }
  }
`;

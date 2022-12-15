import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($input: CreateUserInput!) {
    register(input: $input)
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`;

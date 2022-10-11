import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($input: CreateUserInput!) {
    register(input: $input)
  }
`;

export const CREATE_ADMINISTRATOR = gql`
  mutation createAdministrator($input: CreateUserInput!) {
    createAdministrator(input: $input) {
      user_id
    }
  }
`;

export const CREATE_COORDINATOR = gql`
  mutation createCoordinator($input: CreateUserInput!) {
    createCoordinator(input: $input) {
      user_id
    }
  }
`;

export const CREATE_DIRECTOR = gql`
  mutation createDirector($input: CreateUserInput!) {
    createDirector(input: $input) {
      user_id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      user_id
    }
  }
`;

import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($input: CreateUserInput!) {
    register(input: $input)
  }
`;

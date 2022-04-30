import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($input: RegisterUserDTO!) {
    register(input: $input)
  }
`;

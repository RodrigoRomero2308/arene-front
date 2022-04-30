import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($dniOrEmail: String!, $password: String!) {
    login(dniOrEmail: $dniOrEmail, password: $password)
  }
`;

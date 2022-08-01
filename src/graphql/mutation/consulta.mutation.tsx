import { gql } from "@apollo/client";

export const CONSULTA = gql`
  mutation consulta($input: ConsultaDTO!) {
    consulta(input: $input)
  }
`;
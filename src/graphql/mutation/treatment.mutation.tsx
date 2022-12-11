import { gql } from "@apollo/client";

export const CREATE_TREATMENT = gql`
  mutation createTreatment($input: CreateTreatmentInput!) {
    createTreatment(input: $input) {
      id
    }
  }
`;

export const DELETE_TREATMENT = gql`
  mutation deleteTreatment($id: Int!) {
    deleteTreatment(id: $id) {
      id
    }
  }
`;

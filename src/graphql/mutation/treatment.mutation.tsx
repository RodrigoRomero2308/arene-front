import { gql } from "@apollo/client";

export const CREATE_TREATMENT = gql`
  mutation createTreatment($input: CreateTreatmentInput!) {
    createTreatment(input: $input) {
      id
    }
  }
`;

export const UPDATE_TREATMENT = gql`
  mutation updateTreatment($id: Int!, $input: UpdateTreatmentInput!) {
    updateTreatment(id: $id, input: $input) {
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

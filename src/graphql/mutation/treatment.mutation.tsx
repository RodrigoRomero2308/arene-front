import { gql } from "@apollo/client";

export const CREATE_TREATMENT = gql`
  mutation createTreatment($input: CreateTreatmentInput!) {
    createTreatment(input: $input) {
      id
      area_id
      patient_id
      quantity
      area {
        id
        name
        description
      }
    }
  }
`;

export const DELETE_TREATMENT = gql`
  mutation deleteTreatment($id: Int!) {
    deleteTreatment(id: $id) {
      id
      area_id
      patient_id
      quantity
      area {
        id
        name
        description
      }
    }
  }
`;

import { gql } from "@apollo/client";

export const GET_TREATMENTS = gql`
  query getTreatments {
    getTreatments {
      id
      area_id
      patient_id
      quantity
    }
  }
`;

export const GET_TREATMENTS_BY_USERID = gql`
  query getTreatmentsByUserId($id: Int!) {
    getTreatmentsByUserId(id: $id) {
      id
      area_id
      patient_id
      quantity
    }
  }
`;

import { gql } from "@apollo/client";

export const GET_TREATMENTS_WITH_FILTER = gql`
  query getTreatments($filter: TreatmentFilter) {
    getTreatments(filter: $filter) {
      id
      area_id
      patient_id
      quantity
    }
  }
`;

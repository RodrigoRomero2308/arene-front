import { gql } from "@apollo/client";

export const GET_ALL_PATIENT_STATUS = gql`
  query getAllPatientStatus {
    getAllPatientStatus {
      id
      name
    }
  }
`;

export const GET_PATIENT_STATUS_BY_ID = gql`
  query getStatusById($id: Int!) {
    getStatusById(id: $id) {
      id
      name
    }
  }
`;

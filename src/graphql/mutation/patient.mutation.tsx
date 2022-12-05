import { gql } from "@apollo/client";

export const CREATE_PATIENT = gql`
  mutation createPatient($input: CreatePatientInput!) {
    createPatient(input: $input) {
      user_id
    }
  }
`;

export const UPDATE_PATIENT = gql`
  mutation updatePatient($id: Int!, $input: UpdatePatientInput!) {
    updatePatient(id: $id, input: $input) {
      user_id
    }
  }
`;

export const CHANGE_STATUS = gql`
  mutation changeStatus($id: Int!, $statusId: Int!) {
    changeStatus(id: $id, statusId: $statusId) {
      user_id
    }
  }
`;

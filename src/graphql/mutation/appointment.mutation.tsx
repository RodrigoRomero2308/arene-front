import { gql } from "@apollo/client";

export const CREATE_APPOINTMENT = gql`
  mutation createAppointment($input: CreateAppointmentInput!) {
    createAppointment(input: $input) {
      id
    }
  }
`;

export const DELETE_APPOINTMENT = gql`
  mutation deleteAppointment($id: Int!) {
    deleteAppointment(id: $id) {
      id
    }
  }
`;

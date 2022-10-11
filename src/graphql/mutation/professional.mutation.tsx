import { gql } from "@apollo/client";

export const CREATE_PROFESSIONAL = gql`
  mutation createProfessional($input: CreateProfessionalInput!) {
    createProfessional(input: $input) {
      user_id
    }
  }
`;

export const CREATE_PHYSIATRIST = gql`
  mutation createPhyisiatrist($input: CreateProfessionalInput!) {
    createPhyisiatrist(input: $input) {
      user_id
    }
  }
`;

export const UPDATE_PROFESSIONAL = gql`
  mutation updateProfessional($id: Int!, $input: UpdateProfessionalInput!) {
    updateProfessional(id: $id, input: $input) {
      user_id
    }
  }
`;

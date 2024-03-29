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

export const CREATE_ADMINISTRATOR = gql`
  mutation createAdministrator($input: CreateProfessionalInput!) {
    createAdministrator(input: $input) {
      user_id
    }
  }
`;

export const CREATE_COORDINATOR = gql`
  mutation createCoordinator($input: CreateProfessionalInput!) {
    createCoordinator(input: $input) {
      user_id
    }
  }
`;

export const CREATE_DIRECTOR = gql`
  mutation createDirector($input: CreateProfessionalInput!) {
    createDirector(input: $input) {
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

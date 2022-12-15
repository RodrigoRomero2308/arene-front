import { gql } from "@apollo/client";

export const CREATE_AREA_PROFESSIONAL = gql`
  mutation createAreaProfessional($input: CreateAreaProfessionalInput!) {
    createAreaProfessional(input: $input) {
      professional_id
      area_id
    }
  }
`;

export const DELETE_AREA_PROFESSIONAL = gql`
  mutation deleteAreaProfessional(
    $input: ProfessionalAreaArea_idProfessional_idCompoundUniqueInput!
  ) {
    deleteAreaProfessional(input: $input) {
      professional_id
      area_id
    }
  }
`;

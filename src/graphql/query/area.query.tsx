import { gql } from "@apollo/client";

export const GET_AREAS = gql`
  query getAreas {
    getAreas {
      id
      name
      description
    }
  }
`;

export const GET_AREAS_BY_PROFESSIONAL_ID = gql`
  query getAreaProfessionalsByProfessionalId($userId: Int!) {
    getAreaProfessionalsByProfessionalId(userId: $userId) {
      area {
        id
        name
        description
      }
    }
  }
`;

export const GET_AREA_BY_AREA_NAME = gql`
  query getAreaByAreaName($areaName: String!) {
    getAreaByAreaName(areaName: $areaName) {
      id
      name
      description
    }
  }
`;

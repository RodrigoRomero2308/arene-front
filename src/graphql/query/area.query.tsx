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

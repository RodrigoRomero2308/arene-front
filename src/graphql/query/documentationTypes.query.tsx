import { gql } from "@apollo/client";

export const GET_DOCUMENTATION_TYPES = gql`
  query getDocumentationTypes {
    getDocumentationTypes {
      id
      name
      required
    }
  }
`;

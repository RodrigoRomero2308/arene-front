import { gql } from "@apollo/client";

export const SAVE_DOCUMENTATION = gql`
  mutation saveDocumentation($input: CreateDocumentationInput!) {
    saveDocumentation(input: $input) {
      id
    }
  }
`;

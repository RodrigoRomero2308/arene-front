import { gql } from "@apollo/client";

export const GET_DOCUMENTATION_LIST = gql`
  query getDocumentationList(
    $skip: Int
    $take: Int
    $filter: DocumentationFilterInput
    $orderBy: DocumentationOrderByInput
  ) {
    getDocumentationList(
      skip: $skip
      take: $take
      filter: $filter
      orderBy: $orderBy
    ) {
      id
      documentation_type_id
      other_documentation_type
      filename
      mimetype
      documentationType {
        id
        name
        required
      }
    }
  }
`;

export const GET_DOCUMENTATION = gql`
  query getDocumentation($id: Int!) {
    getDocumentation(id: $id) {
      id
      file
      filename
      mimetype
    }
  }
`;

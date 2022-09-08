import { gql } from "@apollo/client";

export const DELETE_AREA = gql`
  mutation deleteArea($id: Int!) {
    deleteArea(id: $id) {
      id
    }
  }
`;

export const CREATE_AREA = gql`
  mutation createArea($input: CreateAreaInput!) {
    createArea(input: $input) {
      id
    }
  }
`;

export const UPDATE_AREA = gql`
  mutation updateArea($id: Int!, $input: UpdateAreaInput!) {
    updateArea(id: $id, input: $input) {
      id
    }
  }
`;

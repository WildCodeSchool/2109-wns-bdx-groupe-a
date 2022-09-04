import { gql } from '@apollo/client';

export const GET_PROJECT_BY_ID = gql`
  query GetProjectById($getProjectById: String!) {
    getProjectById(id: $getProjectById) {
      title
    }
  }
`;
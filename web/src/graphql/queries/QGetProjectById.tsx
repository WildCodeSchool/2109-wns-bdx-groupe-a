import { gql } from '@apollo/client';

export const GET_PROJECT_BY_ID = gql`
  query GetProjectById($project: String!) {
    getProjectById(project: $project) {
    title
  }
  }
`;
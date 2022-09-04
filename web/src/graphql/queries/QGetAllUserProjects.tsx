import { gql } from '@apollo/client';

export const GET_ALL_USER_PROJECTS = gql`
  query GetUserWithProjects($getUserWithProjectsId: String!) {
  getUserWithProjects(id: $getUserWithProjectsId) {
    id
    firstName
    projects {
      id
      title
    }
  }
}
`;
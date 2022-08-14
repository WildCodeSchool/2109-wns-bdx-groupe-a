import { gql } from "@apollo/client";

export const GET_PROJECTS_BY_USER_ID = gql `
query GetProjectByUserId($userId: String!) {
  getProjectByUserId(userId: $userId) {
    id
    userId
    title
    description
    picture
    startDate
    endDate
    tasks {
      id
      title
      description
      attachment
      progress_state
    }
  }
}
`;


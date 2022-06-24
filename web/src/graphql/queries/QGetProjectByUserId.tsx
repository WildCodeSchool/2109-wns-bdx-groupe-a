import { gql } from "@apollo/client";

const GET_PROJECTS_BY_USER_ID = gql `
query GetProjectByUserId($userId: String!) {
    getProjectByUserId(userId: $userId) {
      id
      userId
      title
      description
      picture
      start_date
      end_date
    }
  }
`;

export default GET_PROJECTS_BY_USER_ID;
import { gql } from "@apollo/client";


export const GET_TASKS_BY_PROJECT_ID = gql`
query GetTasksByProjectId($projectId: String!) {
    getTasksByProjectId(projectId: $projectId) {
      id
      title
      description
      attachment
      progress_state
      project {
        id
        userId
        title
        description
        picture
        start_date
        end_date
      }
    }
  }
`;
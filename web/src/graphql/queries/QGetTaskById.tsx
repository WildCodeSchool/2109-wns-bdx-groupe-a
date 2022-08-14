import { gql } from '@apollo/client';

export const GET_TASK_BY_ID = gql`
  query GetTaskById($taskId: String!) {
    getTaskById(id: $taskId) {
      id
      title
      description
      attachment
      progress_state
    }
  }
`;
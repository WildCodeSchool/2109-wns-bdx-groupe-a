import { gql } from '@apollo/client';

export const GET_TASK_BY_ID = gql`
  query GetTaskById($getTaskByIdId: String!) {
    getTaskById(id: $getTaskByIdId) {
      id
      title
      description
      attachment
      progress_state
    }
  }
`;
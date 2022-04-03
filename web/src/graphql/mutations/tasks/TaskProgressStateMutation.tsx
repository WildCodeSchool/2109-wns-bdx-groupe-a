import { gql } from '@apollo/client';

export const TASK_PROGRESS_STATE = gql`
    mutation ($updateTaskId: String!, $progressState: String) {
      updateTask(id: $updateTaskId, progress_state: $progressState) {
        title
        description
        attachment
        id
        progress_state
      }
    }
  `;
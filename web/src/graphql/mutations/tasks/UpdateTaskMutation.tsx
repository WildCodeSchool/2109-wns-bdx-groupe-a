import { gql } from '@apollo/client';

//TODO description et attachement sont obligatoires, les rendre facultatifs ?
export const UPDATE_TASK = gql`
  mutation ($updateTaskId: String!, $title: String, $description: String, $attachment: String, $progressState: String) {
    updateTask(id: $updateTaskId, title: $title, description: $description, attachment: $attachment, progress_state: $progressState) {
      id
      title
      description
      attachment
      progress_state
    }
  }
`;

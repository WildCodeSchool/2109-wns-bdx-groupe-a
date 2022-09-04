import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation ($title: String!, $description: String!, $attachment: String!, $progress_state: String!) {
    createTask(title: $title, description: $description, attachment: $attachment, progress_state: $progress_state) {
      id
      title
      description
      attachment
      progress_state
    }
  }
`;

import { gql } from '@apollo/client';

//TODO description et attachement sont obligatoires, les rendre facultatifs ?
export const CREATE_TASK = gql`
mutation CreateTask($title: String!, $description: String!, $attachment: String!, $progress_state: String!, $projectId: String!) {
  createTask(title: $title, description: $description, attachment: $attachment, progress_state: $progress_state, projectId: $projectId) {
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
      startDate
      endDate
    }
  }
}
`;

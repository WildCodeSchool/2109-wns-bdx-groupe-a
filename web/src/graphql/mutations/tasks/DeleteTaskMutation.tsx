import { gql } from '@apollo/client';

//TODO on renvoie l'id, description, attachement, progress_state alors que la tache est delete donc erreur graphql ?
export const DELETE_TASK = gql`
  mutation ($taskId: String!) {
    deleteTask(id: $taskId) {
      id
      title
      description
      attachment
      progress_state
    }
  }
`;

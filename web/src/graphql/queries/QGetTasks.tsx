import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query getTasks {
    getTasks {
      id
      title
      description
      attachment
      progress_state
    }
  }
`;


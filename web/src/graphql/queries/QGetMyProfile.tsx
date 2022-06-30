import { gql } from '@apollo/client';

export const GET_MY_PROFILE = gql`
  query GetMyProfile {
    userProfile {
      id
      email
      firstName
      lastName
    }
  }
`;
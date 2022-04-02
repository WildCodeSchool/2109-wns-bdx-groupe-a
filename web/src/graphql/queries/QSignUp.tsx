import { gql } from '@apollo/client';

export const SIGN_UP = gql`
mutation Mutation(
  $firstName: String!
  $lastName: String!
  $email: String!
  $password: String!
) {
  signUp(
    firstName: $firstName
    lastName: $lastName
    email: $email
    password: $password
  ) {
    id
    firstName
    lastName
    email
  }
}
`;
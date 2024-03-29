import { gql } from '@apollo/client';

export const SIGN_IN = gql`
mutation SignIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    id
    firstName
    lastName
    email
  }
}
`
import { gql } from "@apollo/client";

export const GET_USERS = gql`
query GetUsers {
    getUsers {
      id
      firstName
      lastName
      email
      role
      projects {
        id
        userId
        title
        description
        picture
        start_date
        end_date
      }
    }
  }
`
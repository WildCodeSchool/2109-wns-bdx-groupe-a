import { gql } from "@apollo/client";


export const CREATE_PROJECT = gql`
mutation CreateProject($title: String!, $userId: String!, $description: String!, $picture: String!, $start_date: DateTime!, $end_date: DateTime!) {
  createProject(title: $title, userId: $userId, description: $description, picture: $picture, start_date: $start_date, end_date: $end_date) {
    id
    userId
    title
    description
    picture
    start_date
    end_date
  }
}
`
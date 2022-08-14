import { gql } from "@apollo/client";


export const CREATE_PROJECT = gql`
mutation CreateProject($title: String!, $userId: String!, $description: String!, $picture: String!, $startDate: DateTime!, $endDate: DateTime!, $userAssignedId: String!) {
  createProject(title: $title, userId: $userId, description: $description, picture: $picture, startDate: $startDate, endDate: $endDate, userAssignedId: $userAssignedId) {
    id
    userId
    title
    description
    picture
    startDate
    endDate
  }
}
`
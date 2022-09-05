import { gql } from '@apollo/client';

export const UPDATE_PROJECT = gql`
  mutation ($updateProjectId: String!, $title: String, $description: String, $picture: String, $startDate: String, $endDate: String, $userId: String) {
    updateProject(id: $updateProjectId, title: $title, description: $description, picture: $picture, start_date: $startDate, end_date: $endDate, userId: $userId) {
    id
    title
    description
    picture
    start_date
    end_date
    users {
      id
      email
      firstName
      lastName
    }
  }
}
`;

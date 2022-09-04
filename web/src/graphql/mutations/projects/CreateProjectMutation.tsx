import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation ($title: String!, $creatorId: String!, $description: String!, $picture: String!, $startDate: String!, $endDate: String!) {
  createProject(title: $title, creatorId: $creatorId, description: $description, picture: $picture, start_date: $startDate, end_date: $endDate) {
    id
    creatorId
    title
    description
    picture
    start_date
    end_date
  }
}
`;

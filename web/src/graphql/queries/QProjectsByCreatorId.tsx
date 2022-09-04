import { gql } from '@apollo/client';

export const GET_PROJECTS_BY_CREATORID = gql`
  query GetProjectByCreatorId($creatorId: String!) {
  getProjectByCreatorId(creatorId: $creatorId) {
    id
    title
    description
    picture
    start_date
    end_date
  }
}
`;
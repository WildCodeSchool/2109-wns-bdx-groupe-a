import { gql } from '@apollo/client'

const GET_PROJECTS = gql`
  query Project {
    projects {
      id
      title
      description
      picture
      start_date
      end_date
    }
  }
  `;
import { gql } from '@apollo/client'

// status type gets from the name we gave it in schema at the back end
const ADD_PROJECT = gql`
  mutation addProject(
    $clientID: ID!
    $name: String!
    $description: String!
    $status: ProjectStatus!
  ) {
    addProject(name: $name, description: $description, status: $status, clientId: $clientID) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`

const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`

const EDIT_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $name: String!
    $description: String!
    $status: ProjectStatusUpdate!
  ) {
    updateProject(id: $id, name: $name, description: $description, status: $status) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`

export { ADD_PROJECT, DELETE_PROJECT, EDIT_PROJECT }

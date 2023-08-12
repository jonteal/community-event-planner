import { gql } from "@apollo/client";

const ADD_EVENT = gql`
  mutation AddEvent(
    $name: String!
    $description: String!
    $location: String!
    $startingTime: String!
    $endingTime: String!
    $memberId: ID!
  ) {
    addEvent(
      name: $name
      description: $description
      location: $location
      startingTime: $startingTime
      endingTime: $endingTime
      memberId: $memberId
    ) {
      id
      name
      description
      location
      startingTime
      endingTime
      member {
        id
        username
      }
    }
  }
`;

const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;

const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!
    $name: String!
    $description: String!
    $location: String!
    $startingTime: String!
    $endingTime: String!
    $memberId: ID!
  ) {
    updateEvent(
      name: $name
      description: $description
      location: $location
      startingTime: $startingTime
      endingTime: $endingTime
      memberId: $memberId
    ) {
      id
      name
      description
      location
      startingTime
      endingTime
      member {
        id
        username
      }
    }
  }
`;

export { ADD_EVENT, UPDATE_EVENT, DELETE_EVENT };

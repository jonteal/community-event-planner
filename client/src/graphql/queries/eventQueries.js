import { gql } from "@apollo/client";

const GET_EVENTS = gql`
  query getEvents {
    events {
      id
      name
      description
      location
      date
      startingTime
      endingTime
      member {
        id
        username
      }
    }
  }
`;

const GET_EVENT = gql`
  query getIndexCard($id: ID) {
    event(id: $id) {
      id
      name
      description
      location
      date
      startingTime
      endingTime
      member {
        id
        username
      }
    }
  }
`;

export { GET_EVENTS, GET_EVENT };

import { gql } from "@apollo/client";

const GET_MEMBERS = gql`
  query getMembers {
    members {
      id
      username
      email
      phone
    }
  }
`;

const GET_MEMBER = gql`
  query getMember($id: ID) {
    member(id: $id) {
      id
      username
      email
      phone
    }
  }
`;

export { GET_MEMBERS, GET_MEMBER };

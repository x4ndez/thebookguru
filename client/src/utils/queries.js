import { gql } from "@apollo/client";

export const QUERY_GET_ME = gql`
query GET_ME {
  me {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      authors
      description
      title
      image
    }
  }
}
`;

export const QUERY_GET_USER = gql`
query userData($username: String) {
  userData(username: $username) {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      authors
      description
      title
      image
    }
  }
}
`;
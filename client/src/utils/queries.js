import { gql } from "@apollo/client";

export const QUERY_GET_ME = gql`
query GET_ME {
    me {
      _id
      email
      username
      bookCount
      savedBooks {
        bookId
        author
        title
        description
        image
        link
      }
    }
  }  
`;
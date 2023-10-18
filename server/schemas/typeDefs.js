const typeDefs = `
type Query {
    name: String!
}

input BookData {
    authors: [String]
    title: String
    description: String
    bookId: String!
    image: String
}
type Query {
    me: [User]
    }


type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(data: BookData): User
    removeBook(bookId: String!): User
}
    
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    
    type Book {
        bookId: String!
        authors: [String]
        description: String
        title: String
        image: String
    }
    
    type Auth {
        token: String!
        user: String!
    }
        `;

module.exports = typeDefs;

// authors: String!, title: String!, description: String!, bookId: String!, image: String!, link: String!
//    removeBook(bookId: String!): User



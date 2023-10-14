const typeDefs = `

type Query {
me: [User]
}

type Mutation {
    login(email: String!, password: String!): Auth
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    bookId: String
    author: [String]
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: String
    user: String
}

`;

module.exports = typeDefs;
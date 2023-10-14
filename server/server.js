const path = require('path');
const db = require('./config/connection'); // CONNECT TO MONGODB
const routes = require('./routes');
//a
// EXPRESS
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

// APOLLO SERVER
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await apolloServer.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  //NOTE: ENABLE THIS WHEN FIXING MIDDLEWARE.
  // app.use("/graphql", expressMiddleware(apolloServer, {
  //   context: authMiddleware,
  // }));

  app.use("/graphql", expressMiddleware(apolloServer));

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.use(routes);

  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  });

}

// START APOLLO SERVER
startApolloServer();


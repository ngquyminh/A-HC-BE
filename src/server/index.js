const { ApolloServer } = require("apollo-server");
const typeDefs = require("../typeDefs");
const resolvers = require("../resolvers");
// const express = require("express");
// const { createServer } = require("http");
const { formatError, context } = require("./auth");

const PORT = process.env.PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  formatError,
  context,
});

// const app = express();
// const corsOptions = {
//   origin: "*",
// };

// server.applyMiddleware({ app, cors: corsOptions });

// const httpServer = createServer(app);
// server.installSubscriptionHandlers(httpServer);

// const startServer = () => {
//   httpServer.listen({ port: PORT }, () => {
//     console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
//   });
// };

const startServer = async () => {
  await server.listen({ port: PORT }).then((obj) => {
    //url: PORT
    // console.log({obj})
    console.log(`🚀 Apollo Server on http://localhost:${PORT}/graphql`);
  });
};

module.exports = startServer;

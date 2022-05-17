const { ApolloServer } = require("apollo-server");
const typeDefs = require("../typeDefs");
const resolvers = require("../resolvers");
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

const startServer = async () => {
  await server.listen({ port: PORT }).then((obj) => {
    console.log(`🚀 Apollo Server on http://localhost:${PORT}/graphql`);
  });
};

module.exports = startServer;

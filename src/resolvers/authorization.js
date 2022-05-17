const { ForbiddenError } = require("apollo-server");
const { combineResolvers, skip } = require("graphql-resolvers");

function isAuthenticated(parent, args, { me }) {
  return me ? skip : new ForbiddenError("Not authenticated as user.");
}

const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === "ADMIN" ? skip : new ForbiddenError("Not authorized as admin.")
);

module.exports = {
  isAuthenticated,
  isAdmin,
};

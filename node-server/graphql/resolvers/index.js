const usersResolvers = require("./users");
const pagesResolvers = require("./pages");

module.exports = {
  Query: {
    ...pagesResolvers.Query,
  },

  Mutation: {
    ...usersResolvers.Mutation,
    ...pagesResolvers.Mutation,
  },
};

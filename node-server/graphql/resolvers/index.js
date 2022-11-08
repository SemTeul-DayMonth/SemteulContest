const usersResolvers = require("./users");
const todosResolvers = require("./todos");

module.exports = {
  Query: {
    ...todosResolvers.Query,
  },

  Mutation: {
    ...usersResolvers.Mutation,
    ...todosResolvers.Mutation,
  },
};

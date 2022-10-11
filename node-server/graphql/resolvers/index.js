const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const tdyTdsResolvers = require("./tdyTds");

module.exports = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...postsResolvers.Mutation,
    ...usersResolvers.Mutation,
    ...tdyTdsResolvers.Mutation,
  },
};

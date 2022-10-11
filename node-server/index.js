const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const { MONGODB } = require("./config");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 8000 });
  })
  .then(() => {
    console.log("Server Running");
  });

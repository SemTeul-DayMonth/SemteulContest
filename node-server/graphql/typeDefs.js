const { gql } = require("apollo-server");

module.exports = gql`
  type Todos {
    id: ID!
    userId: ID!
    username: String!
    todos: [Todo]!
  }

  type Todo {
    id: ID!
    date: String!
    todo: String!
    createdAt: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getTodos(userId: ID!): Todos
    getTodo(userId: ID!, todoId: ID!): Todo
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createTodo(userId: ID!, date: String!, todo: String!): Todos!
    deleteTodo(userId: ID!, todoId: ID!): Todos!
    updateTodo(userId: ID!, todoId: ID!, date: String!, todo: String!): Todos!
  }
`;

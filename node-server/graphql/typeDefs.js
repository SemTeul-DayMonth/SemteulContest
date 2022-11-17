const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  type Pages {
    id: ID!
    userId: ID!
    username: String!
    pages: [Page]!
  }

  type Page {
    id: ID!
    title: String!
    date: String!
    isDone: Boolean!
    parent: [Parent]!
    childs: [Child]!
    text: String!
    pageType: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  input PageInput {
    userId: ID!
    pageId: ID
    title: String!
    date: String!
    text: String
    parentInput: [ParentInput]
    childInput: [ChildInput]
    pageType: String!
  }

  type Parent {
    parentId: ID!
    parentDate: String!
    parentTitle: String!
  }

  input ParentInput {
    parentId: ID!
    parentDate: String!
    parentTitle: String!
  }

  type Child {
    childId: ID!
    childDate: String!
    childTitle: String!
  }

  input ChildInput {
    childId: ID!
    childDate: String!
    childTitle: String!
  }

  type Query {
    getPages(userId: ID!): Pages!
    getPage(userId: ID!, pageId: ID!): Page!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPage(pageInput: PageInput): Pages!
    deletePage(userId: ID!, pageId: ID!): Pages!
    updatePage(pageInput: PageInput): Page!
  }
`;

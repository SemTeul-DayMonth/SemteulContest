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
    parent: [Parents]!
    child: [Childs]!
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
    parentIds: [ParentIds]
    childIds: [ChildIds]
    pageType: String!
  }

  type Parents {
    parentId: ID!
  }

  input ParentIds {
    parentId: ID!
  }

  type Childs {
    childId: ID!
  }

  input ChildIds {
    childId: ID!
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

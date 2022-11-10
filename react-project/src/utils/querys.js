import gql from "graphql-tag";

const FETCH_TODOS_QUERY = gql`
  query GetPages($userId: ID!) {
    getPages(userId: $userId) {
      id
      userId
      pages {
        id
        title
        date
        isDone
        parent {
          parentId
        }
        child {
          childId
        }
        text
      }
    }
  }
`;

export default FETCH_TODOS_QUERY;

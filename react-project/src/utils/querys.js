import gql from "graphql-tag";

export const FETCH_TODOS_QUERY = gql`
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
          parentDate
          parentTitle
        }
        childs {
          childId
          childDate
          childTitle
        }
        text
        pageType
      }
    }
  }
`;

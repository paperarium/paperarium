export const listTags = /* GraphQL */ `
  query ListTagsPCP(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        title
        title_encoded
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

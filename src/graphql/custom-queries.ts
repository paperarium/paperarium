export const listTags = /* GraphQL */ `
  query ListTagsPCP(
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        title
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const searchTags = /* GraphQL */ `
  query SearchTagsPCP(
    $filter: SearchableTagFilterInput
    $sort: [SearchableTagSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableTagAggregationInput]
  ) {
    searchTags(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        title
        id
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;

export const listPapercrafts = /* GraphQL */ `
  query ListPapercraftsPCP(
    $filter: ModelPapercraftFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPapercrafts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        title
        description
        glb {
          bucket
          region
          key
          identityId
        }
        pdo {
          bucket
          region
          key
          identityId
        }
        pdf_lineless {
          bucket
          region
          key
          identityId
        }
        pdf_lined {
          bucket
          region
          key
          identityId
        }
        tags {
          items {
            tagID
          }
          nextToken
        }
        pictures {
          bucket
          region
          key
          identityId
        }
        builds {
          items {
            id
          }
          nextToken
        }
        user {
          username
        }
        difficulty
        width_in
        height_in
        length_in
        verified
        id
        createdAt
        updatedAt
        userPapercraftsId
        owner
      }
      nextToken
    }
  }
`;

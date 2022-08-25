/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      username
      email
      papercrafts {
        nextToken
      }
      builds {
        nextToken
      }
      profile_picture {
        bucket
        region
        key
      }
      description
      website
      instagram
      twitter
      id
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        username
        email
        description
        website
        instagram
        twitter
        id
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: [SearchableUserSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableUserAggregationInput]
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        username
        email
        description
        website
        instagram
        twitter
        id
        createdAt
        updatedAt
        owner
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getPapercraft = /* GraphQL */ `
  query GetPapercraft($id: ID!) {
    getPapercraft(id: $id) {
      user {
        username
        email
        description
        website
        instagram
        twitter
        id
        createdAt
        updatedAt
        owner
      }
      glb {
        bucket
        region
        key
      }
      pdo {
        bucket
        region
        key
      }
      pdf_lineless {
        bucket
        region
        key
      }
      pdf_lined {
        bucket
        region
        key
      }
      tags {
        nextToken
      }
      builds {
        nextToken
      }
      verified
      id
      createdAt
      updatedAt
      userPapercraftsId
      owner
    }
  }
`;
export const listPapercrafts = /* GraphQL */ `
  query ListPapercrafts(
    $filter: ModelPapercraftFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPapercrafts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
export const searchPapercrafts = /* GraphQL */ `
  query SearchPapercrafts(
    $filter: SearchablePapercraftFilterInput
    $sort: [SearchablePapercraftSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchablePapercraftAggregationInput]
  ) {
    searchPapercrafts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        verified
        id
        createdAt
        updatedAt
        userPapercraftsId
        owner
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getBuild = /* GraphQL */ `
  query GetBuild($id: ID!) {
    getBuild(id: $id) {
      user {
        username
        email
        description
        website
        instagram
        twitter
        id
        createdAt
        updatedAt
        owner
      }
      papercraft {
        verified
        id
        createdAt
        updatedAt
        userPapercraftsId
        owner
      }
      pictures {
        bucket
        region
        key
      }
      verified
      id
      createdAt
      updatedAt
      userBuildsId
      papercraftBuildsId
      owner
    }
  }
`;
export const listBuilds = /* GraphQL */ `
  query ListBuilds(
    $filter: ModelBuildFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBuilds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        verified
        id
        createdAt
        updatedAt
        userBuildsId
        papercraftBuildsId
        owner
      }
      nextToken
    }
  }
`;
export const searchBuilds = /* GraphQL */ `
  query SearchBuilds(
    $filter: SearchableBuildFilterInput
    $sort: [SearchableBuildSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableBuildAggregationInput]
  ) {
    searchBuilds(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        verified
        id
        createdAt
        updatedAt
        userBuildsId
        papercraftBuildsId
        owner
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getTag = /* GraphQL */ `
  query GetTag($id: ID!) {
    getTag(id: $id) {
      title
      papercrafts {
        nextToken
      }
      id
      createdAt
      updatedAt
    }
  }
`;
export const listTags = /* GraphQL */ `
  query ListTags(
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
  query SearchTags(
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
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getPapercraftTags = /* GraphQL */ `
  query GetPapercraftTags($id: ID!) {
    getPapercraftTags(id: $id) {
      id
      papercraftID
      tagID
      papercraft {
        verified
        id
        createdAt
        updatedAt
        userPapercraftsId
        owner
      }
      tag {
        title
        id
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listPapercraftTags = /* GraphQL */ `
  query ListPapercraftTags(
    $filter: ModelPapercraftTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPapercraftTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        papercraftID
        tagID
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;

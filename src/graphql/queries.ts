/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      username
      email
      papercrafts {
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
      builds {
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
      nextToken
    }
  }
`;
export const getPapercraft = /* GraphQL */ `
  query GetPapercraft($id: ID!) {
    getPapercraft(id: $id) {
      user {
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
      builds {
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
      nextToken
    }
  }
`;
export const getBuild = /* GraphQL */ `
  query GetBuild($id: ID!) {
    getBuild(id: $id) {
      user {
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
      papercraft {
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
      nextToken
    }
  }
`;
export const getTag = /* GraphQL */ `
  query GetTag($id: ID!) {
    getTag(id: $id) {
      title
      title_encoded
      papercrafts {
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
      id
      createdAt
      updatedAt
      owner
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
        title_encoded
        papercrafts {
          nextToken
        }
        id
        createdAt
        updatedAt
        owner
      }
      nextToken
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
      tag {
        title
        title_encoded
        papercrafts {
          nextToken
        }
        id
        createdAt
        updatedAt
        owner
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
          title_encoded
          id
          createdAt
          updatedAt
          owner
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;

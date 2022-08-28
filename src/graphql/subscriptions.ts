/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
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
export const onCreatePapercraft = /* GraphQL */ `
  subscription OnCreatePapercraft($owner: String) {
    onCreatePapercraft(owner: $owner) {
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
      title
      description
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
      pictures {
        bucket
        region
        key
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
export const onUpdatePapercraft = /* GraphQL */ `
  subscription OnUpdatePapercraft($owner: String) {
    onUpdatePapercraft(owner: $owner) {
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
      title
      description
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
      pictures {
        bucket
        region
        key
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
export const onDeletePapercraft = /* GraphQL */ `
  subscription OnDeletePapercraft($owner: String) {
    onDeletePapercraft(owner: $owner) {
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
      title
      description
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
      pictures {
        bucket
        region
        key
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
export const onCreateBuild = /* GraphQL */ `
  subscription OnCreateBuild($owner: String) {
    onCreateBuild(owner: $owner) {
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
        title
        description
        verified
        id
        createdAt
        updatedAt
        userPapercraftsId
        owner
      }
      description
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
export const onUpdateBuild = /* GraphQL */ `
  subscription OnUpdateBuild($owner: String) {
    onUpdateBuild(owner: $owner) {
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
        title
        description
        verified
        id
        createdAt
        updatedAt
        userPapercraftsId
        owner
      }
      description
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
export const onDeleteBuild = /* GraphQL */ `
  subscription OnDeleteBuild($owner: String) {
    onDeleteBuild(owner: $owner) {
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
        title
        description
        verified
        id
        createdAt
        updatedAt
        userPapercraftsId
        owner
      }
      description
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
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag {
    onCreateTag {
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
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag {
    onUpdateTag {
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
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag {
    onDeleteTag {
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
export const onCreatePapercraftTags = /* GraphQL */ `
  subscription OnCreatePapercraftTags($owner: String) {
    onCreatePapercraftTags(owner: $owner) {
      id
      papercraftID
      tagID
      papercraft {
        title
        description
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
export const onUpdatePapercraftTags = /* GraphQL */ `
  subscription OnUpdatePapercraftTags($owner: String) {
    onUpdatePapercraftTags(owner: $owner) {
      id
      papercraftID
      tagID
      papercraft {
        title
        description
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
export const onDeletePapercraftTags = /* GraphQL */ `
  subscription OnDeletePapercraftTags($owner: String) {
    onDeletePapercraftTags(owner: $owner) {
      id
      papercraftID
      tagID
      papercraft {
        title
        description
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

/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createPapercraft = /* GraphQL */ `
  mutation CreatePapercraft(
    $input: CreatePapercraftInput!
    $condition: ModelPapercraftConditionInput
  ) {
    createPapercraft(input: $input, condition: $condition) {
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
export const updatePapercraft = /* GraphQL */ `
  mutation UpdatePapercraft(
    $input: UpdatePapercraftInput!
    $condition: ModelPapercraftConditionInput
  ) {
    updatePapercraft(input: $input, condition: $condition) {
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
export const deletePapercraft = /* GraphQL */ `
  mutation DeletePapercraft(
    $input: DeletePapercraftInput!
    $condition: ModelPapercraftConditionInput
  ) {
    deletePapercraft(input: $input, condition: $condition) {
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
export const createBuild = /* GraphQL */ `
  mutation CreateBuild(
    $input: CreateBuildInput!
    $condition: ModelBuildConditionInput
  ) {
    createBuild(input: $input, condition: $condition) {
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
export const updateBuild = /* GraphQL */ `
  mutation UpdateBuild(
    $input: UpdateBuildInput!
    $condition: ModelBuildConditionInput
  ) {
    updateBuild(input: $input, condition: $condition) {
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
export const deleteBuild = /* GraphQL */ `
  mutation DeleteBuild(
    $input: DeleteBuildInput!
    $condition: ModelBuildConditionInput
  ) {
    deleteBuild(input: $input, condition: $condition) {
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
export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
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
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
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
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
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
export const createPapercraftTags = /* GraphQL */ `
  mutation CreatePapercraftTags(
    $input: CreatePapercraftTagsInput!
    $condition: ModelPapercraftTagsConditionInput
  ) {
    createPapercraftTags(input: $input, condition: $condition) {
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
export const updatePapercraftTags = /* GraphQL */ `
  mutation UpdatePapercraftTags(
    $input: UpdatePapercraftTagsInput!
    $condition: ModelPapercraftTagsConditionInput
  ) {
    updatePapercraftTags(input: $input, condition: $condition) {
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
export const deletePapercraftTags = /* GraphQL */ `
  mutation DeletePapercraftTags(
    $input: DeletePapercraftTagsInput!
    $condition: ModelPapercraftTagsConditionInput
  ) {
    deletePapercraftTags(input: $input, condition: $condition) {
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

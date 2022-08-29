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
        nextToken
      }
      builds {
        nextToken
      }
      profile_picture {
        bucket
        region
        key
        identityId
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
        nextToken
      }
      builds {
        nextToken
      }
      profile_picture {
        bucket
        region
        key
        identityId
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
        nextToken
      }
      builds {
        nextToken
      }
      profile_picture {
        bucket
        region
        key
        identityId
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
        nextToken
      }
      pictures {
        bucket
        region
        key
        identityId
      }
      builds {
        nextToken
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
        nextToken
      }
      pictures {
        bucket
        region
        key
        identityId
      }
      builds {
        nextToken
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
        nextToken
      }
      pictures {
        bucket
        region
        key
        identityId
      }
      builds {
        nextToken
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
      description
      pictures {
        bucket
        region
        key
        identityId
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
      description
      pictures {
        bucket
        region
        key
        identityId
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
      description
      pictures {
        bucket
        region
        key
        identityId
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
      papercrafts {
        nextToken
      }
      id
      createdAt
      updatedAt
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
      papercrafts {
        nextToken
      }
      id
      createdAt
      updatedAt
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
      papercrafts {
        nextToken
      }
      id
      createdAt
      updatedAt
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
        title
        description
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
        title
        description
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
        title
        description
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

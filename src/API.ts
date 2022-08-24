/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ModelTagFilterInput = {
  title?: ModelStringInput | null,
  title_encoded?: ModelStringInput | null,
  and?: Array< ModelTagFilterInput | null > | null,
  or?: Array< ModelTagFilterInput | null > | null,
  not?: ModelTagFilterInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelTagConnection = {
  __typename: "ModelTagConnection",
  items:  Array<Tag | null >,
  nextToken?: string | null,
};

export type Tag = {
  __typename: "Tag",
  title: string,
  title_encoded: string,
  papercrafts?: ModelPapercraftTagsConnection | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelPapercraftTagsConnection = {
  __typename: "ModelPapercraftTagsConnection",
  items:  Array<PapercraftTags | null >,
  nextToken?: string | null,
};

export type PapercraftTags = {
  __typename: "PapercraftTags",
  id: string,
  papercraftID: string,
  tagID: string,
  papercraft: Papercraft,
  tag: Tag,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type Papercraft = {
  __typename: "Papercraft",
  user: User,
  glb?: S3Object | null,
  pdo?: S3Object | null,
  pdf_lineless?: S3Object | null,
  pdf_lined: S3Object,
  tags?: ModelPapercraftTagsConnection | null,
  builds?: ModelBuildConnection | null,
  verified?: boolean | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  userPapercraftsId: string,
  owner?: string | null,
};

export type User = {
  __typename: "User",
  username: string,
  email?: string | null,
  papercrafts?: ModelPapercraftConnection | null,
  builds?: ModelBuildConnection | null,
  profile_picture?: S3Object | null,
  description?: string | null,
  website?: string | null,
  instagram?: string | null,
  twitter?: string | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelPapercraftConnection = {
  __typename: "ModelPapercraftConnection",
  items:  Array<Papercraft | null >,
  nextToken?: string | null,
};

export type ModelBuildConnection = {
  __typename: "ModelBuildConnection",
  items:  Array<Build | null >,
  nextToken?: string | null,
};

export type Build = {
  __typename: "Build",
  user: User,
  papercraft?: Papercraft | null,
  pictures:  Array<S3Object >,
  verified?: boolean | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  userBuildsId: string,
  papercraftBuildsId: string,
  owner?: string | null,
};

export type S3Object = {
  __typename: "S3Object",
  bucket: string,
  region: string,
  key: string,
};

export type CreateUserInput = {
  username: string,
  email?: string | null,
  profile_picture?: S3ObjectInput | null,
  description?: string | null,
  website?: string | null,
  instagram?: string | null,
  twitter?: string | null,
  id?: string | null,
};

export type S3ObjectInput = {
  bucket: string,
  region: string,
  key: string,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  description?: ModelStringInput | null,
  website?: ModelStringInput | null,
  instagram?: ModelStringInput | null,
  twitter?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type UpdateUserInput = {
  username?: string | null,
  email?: string | null,
  profile_picture?: S3ObjectInput | null,
  description?: string | null,
  website?: string | null,
  instagram?: string | null,
  twitter?: string | null,
  id: string,
};

export type DeleteUserInput = {
  id: string,
};

export type CreatePapercraftInput = {
  glb?: S3ObjectInput | null,
  pdo?: S3ObjectInput | null,
  pdf_lineless?: S3ObjectInput | null,
  pdf_lined: S3ObjectInput,
  verified?: boolean | null,
  id?: string | null,
  userPapercraftsId: string,
};

export type ModelPapercraftConditionInput = {
  verified?: ModelBooleanInput | null,
  and?: Array< ModelPapercraftConditionInput | null > | null,
  or?: Array< ModelPapercraftConditionInput | null > | null,
  not?: ModelPapercraftConditionInput | null,
  userPapercraftsId?: ModelIDInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdatePapercraftInput = {
  glb?: S3ObjectInput | null,
  pdo?: S3ObjectInput | null,
  pdf_lineless?: S3ObjectInput | null,
  pdf_lined?: S3ObjectInput | null,
  verified?: boolean | null,
  id: string,
  userPapercraftsId: string,
};

export type DeletePapercraftInput = {
  id: string,
};

export type CreateBuildInput = {
  pictures: Array< S3ObjectInput >,
  verified?: boolean | null,
  id?: string | null,
  userBuildsId: string,
  papercraftBuildsId: string,
};

export type ModelBuildConditionInput = {
  verified?: ModelBooleanInput | null,
  and?: Array< ModelBuildConditionInput | null > | null,
  or?: Array< ModelBuildConditionInput | null > | null,
  not?: ModelBuildConditionInput | null,
  userBuildsId?: ModelIDInput | null,
  papercraftBuildsId?: ModelIDInput | null,
};

export type UpdateBuildInput = {
  pictures?: Array< S3ObjectInput > | null,
  verified?: boolean | null,
  id: string,
  userBuildsId: string,
  papercraftBuildsId: string,
};

export type DeleteBuildInput = {
  id: string,
};

export type CreateTagInput = {
  title: string,
  title_encoded: string,
  id?: string | null,
};

export type ModelTagConditionInput = {
  title?: ModelStringInput | null,
  title_encoded?: ModelStringInput | null,
  and?: Array< ModelTagConditionInput | null > | null,
  or?: Array< ModelTagConditionInput | null > | null,
  not?: ModelTagConditionInput | null,
};

export type UpdateTagInput = {
  title?: string | null,
  title_encoded?: string | null,
  id: string,
};

export type DeleteTagInput = {
  id: string,
};

export type CreatePapercraftTagsInput = {
  id?: string | null,
  papercraftID: string,
  tagID: string,
};

export type ModelPapercraftTagsConditionInput = {
  papercraftID?: ModelIDInput | null,
  tagID?: ModelIDInput | null,
  and?: Array< ModelPapercraftTagsConditionInput | null > | null,
  or?: Array< ModelPapercraftTagsConditionInput | null > | null,
  not?: ModelPapercraftTagsConditionInput | null,
};

export type UpdatePapercraftTagsInput = {
  id: string,
  papercraftID?: string | null,
  tagID?: string | null,
};

export type DeletePapercraftTagsInput = {
  id: string,
};

export type ModelUserFilterInput = {
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  description?: ModelStringInput | null,
  website?: ModelStringInput | null,
  instagram?: ModelStringInput | null,
  twitter?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelPapercraftFilterInput = {
  verified?: ModelBooleanInput | null,
  and?: Array< ModelPapercraftFilterInput | null > | null,
  or?: Array< ModelPapercraftFilterInput | null > | null,
  not?: ModelPapercraftFilterInput | null,
  userPapercraftsId?: ModelIDInput | null,
};

export type ModelBuildFilterInput = {
  verified?: ModelBooleanInput | null,
  and?: Array< ModelBuildFilterInput | null > | null,
  or?: Array< ModelBuildFilterInput | null > | null,
  not?: ModelBuildFilterInput | null,
  userBuildsId?: ModelIDInput | null,
  papercraftBuildsId?: ModelIDInput | null,
};

export type ModelPapercraftTagsFilterInput = {
  id?: ModelIDInput | null,
  papercraftID?: ModelIDInput | null,
  tagID?: ModelIDInput | null,
  and?: Array< ModelPapercraftTagsFilterInput | null > | null,
  or?: Array< ModelPapercraftTagsFilterInput | null > | null,
  not?: ModelPapercraftTagsFilterInput | null,
};

export type ListTagsPCPQueryVariables = {
  filter?: ModelTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTagsPCPQuery = {
  listTags?:  {
    __typename: "ModelTagConnection",
    items:  Array< {
      __typename: "Tag",
      title: string,
      title_encoded: string,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    username: string,
    email?: string | null,
    papercrafts?:  {
      __typename: "ModelPapercraftConnection",
      items:  Array< {
        __typename: "Papercraft",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userPapercraftsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    builds?:  {
      __typename: "ModelBuildConnection",
      items:  Array< {
        __typename: "Build",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userBuildsId: string,
        papercraftBuildsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    profile_picture?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description?: string | null,
    website?: string | null,
    instagram?: string | null,
    twitter?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    username: string,
    email?: string | null,
    papercrafts?:  {
      __typename: "ModelPapercraftConnection",
      items:  Array< {
        __typename: "Papercraft",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userPapercraftsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    builds?:  {
      __typename: "ModelBuildConnection",
      items:  Array< {
        __typename: "Build",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userBuildsId: string,
        papercraftBuildsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    profile_picture?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description?: string | null,
    website?: string | null,
    instagram?: string | null,
    twitter?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    username: string,
    email?: string | null,
    papercrafts?:  {
      __typename: "ModelPapercraftConnection",
      items:  Array< {
        __typename: "Papercraft",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userPapercraftsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    builds?:  {
      __typename: "ModelBuildConnection",
      items:  Array< {
        __typename: "Build",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userBuildsId: string,
        papercraftBuildsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    profile_picture?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description?: string | null,
    website?: string | null,
    instagram?: string | null,
    twitter?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreatePapercraftMutationVariables = {
  input: CreatePapercraftInput,
  condition?: ModelPapercraftConditionInput | null,
};

export type CreatePapercraftMutation = {
  createPapercraft?:  {
    __typename: "Papercraft",
    user:  {
      __typename: "User",
      username: string,
      email?: string | null,
      papercrafts?:  {
        __typename: "ModelPapercraftConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      profile_picture?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      description?: string | null,
      website?: string | null,
      instagram?: string | null,
      twitter?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    glb?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdo?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdf_lineless?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdf_lined:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    },
    tags?:  {
      __typename: "ModelPapercraftTagsConnection",
      items:  Array< {
        __typename: "PapercraftTags",
        id: string,
        papercraftID: string,
        tagID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    builds?:  {
      __typename: "ModelBuildConnection",
      items:  Array< {
        __typename: "Build",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userBuildsId: string,
        papercraftBuildsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    verified?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    userPapercraftsId: string,
    owner?: string | null,
  } | null,
};

export type UpdatePapercraftMutationVariables = {
  input: UpdatePapercraftInput,
  condition?: ModelPapercraftConditionInput | null,
};

export type UpdatePapercraftMutation = {
  updatePapercraft?:  {
    __typename: "Papercraft",
    user:  {
      __typename: "User",
      username: string,
      email?: string | null,
      papercrafts?:  {
        __typename: "ModelPapercraftConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      profile_picture?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      description?: string | null,
      website?: string | null,
      instagram?: string | null,
      twitter?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    glb?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdo?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdf_lineless?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdf_lined:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    },
    tags?:  {
      __typename: "ModelPapercraftTagsConnection",
      items:  Array< {
        __typename: "PapercraftTags",
        id: string,
        papercraftID: string,
        tagID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    builds?:  {
      __typename: "ModelBuildConnection",
      items:  Array< {
        __typename: "Build",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userBuildsId: string,
        papercraftBuildsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    verified?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    userPapercraftsId: string,
    owner?: string | null,
  } | null,
};

export type DeletePapercraftMutationVariables = {
  input: DeletePapercraftInput,
  condition?: ModelPapercraftConditionInput | null,
};

export type DeletePapercraftMutation = {
  deletePapercraft?:  {
    __typename: "Papercraft",
    user:  {
      __typename: "User",
      username: string,
      email?: string | null,
      papercrafts?:  {
        __typename: "ModelPapercraftConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      profile_picture?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      description?: string | null,
      website?: string | null,
      instagram?: string | null,
      twitter?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    glb?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdo?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdf_lineless?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdf_lined:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    },
    tags?:  {
      __typename: "ModelPapercraftTagsConnection",
      items:  Array< {
        __typename: "PapercraftTags",
        id: string,
        papercraftID: string,
        tagID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    builds?:  {
      __typename: "ModelBuildConnection",
      items:  Array< {
        __typename: "Build",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userBuildsId: string,
        papercraftBuildsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    verified?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    userPapercraftsId: string,
    owner?: string | null,
  } | null,
};

export type CreateBuildMutationVariables = {
  input: CreateBuildInput,
  condition?: ModelBuildConditionInput | null,
};

export type CreateBuildMutation = {
  createBuild?:  {
    __typename: "Build",
    user:  {
      __typename: "User",
      username: string,
      email?: string | null,
      papercrafts?:  {
        __typename: "ModelPapercraftConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      profile_picture?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      description?: string | null,
      website?: string | null,
      instagram?: string | null,
      twitter?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    papercraft?:  {
      __typename: "Papercraft",
      user:  {
        __typename: "User",
        username: string,
        email?: string | null,
        description?: string | null,
        website?: string | null,
        instagram?: string | null,
        twitter?: string | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      glb?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdo?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lineless?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lined:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      },
      tags?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      verified?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      userPapercraftsId: string,
      owner?: string | null,
    } | null,
    pictures:  Array< {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } >,
    verified?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    userBuildsId: string,
    papercraftBuildsId: string,
    owner?: string | null,
  } | null,
};

export type UpdateBuildMutationVariables = {
  input: UpdateBuildInput,
  condition?: ModelBuildConditionInput | null,
};

export type UpdateBuildMutation = {
  updateBuild?:  {
    __typename: "Build",
    user:  {
      __typename: "User",
      username: string,
      email?: string | null,
      papercrafts?:  {
        __typename: "ModelPapercraftConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      profile_picture?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      description?: string | null,
      website?: string | null,
      instagram?: string | null,
      twitter?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    papercraft?:  {
      __typename: "Papercraft",
      user:  {
        __typename: "User",
        username: string,
        email?: string | null,
        description?: string | null,
        website?: string | null,
        instagram?: string | null,
        twitter?: string | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      glb?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdo?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lineless?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lined:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      },
      tags?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      verified?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      userPapercraftsId: string,
      owner?: string | null,
    } | null,
    pictures:  Array< {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } >,
    verified?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    userBuildsId: string,
    papercraftBuildsId: string,
    owner?: string | null,
  } | null,
};

export type DeleteBuildMutationVariables = {
  input: DeleteBuildInput,
  condition?: ModelBuildConditionInput | null,
};

export type DeleteBuildMutation = {
  deleteBuild?:  {
    __typename: "Build",
    user:  {
      __typename: "User",
      username: string,
      email?: string | null,
      papercrafts?:  {
        __typename: "ModelPapercraftConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      profile_picture?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      description?: string | null,
      website?: string | null,
      instagram?: string | null,
      twitter?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    papercraft?:  {
      __typename: "Papercraft",
      user:  {
        __typename: "User",
        username: string,
        email?: string | null,
        description?: string | null,
        website?: string | null,
        instagram?: string | null,
        twitter?: string | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      glb?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdo?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lineless?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lined:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      },
      tags?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      verified?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      userPapercraftsId: string,
      owner?: string | null,
    } | null,
    pictures:  Array< {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } >,
    verified?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    userBuildsId: string,
    papercraftBuildsId: string,
    owner?: string | null,
  } | null,
};

export type CreateTagMutationVariables = {
  input: CreateTagInput,
  condition?: ModelTagConditionInput | null,
};

export type CreateTagMutation = {
  createTag?:  {
    __typename: "Tag",
    title: string,
    title_encoded: string,
    papercrafts?:  {
      __typename: "ModelPapercraftTagsConnection",
      items:  Array< {
        __typename: "PapercraftTags",
        id: string,
        papercraftID: string,
        tagID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateTagMutationVariables = {
  input: UpdateTagInput,
  condition?: ModelTagConditionInput | null,
};

export type UpdateTagMutation = {
  updateTag?:  {
    __typename: "Tag",
    title: string,
    title_encoded: string,
    papercrafts?:  {
      __typename: "ModelPapercraftTagsConnection",
      items:  Array< {
        __typename: "PapercraftTags",
        id: string,
        papercraftID: string,
        tagID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteTagMutationVariables = {
  input: DeleteTagInput,
  condition?: ModelTagConditionInput | null,
};

export type DeleteTagMutation = {
  deleteTag?:  {
    __typename: "Tag",
    title: string,
    title_encoded: string,
    papercrafts?:  {
      __typename: "ModelPapercraftTagsConnection",
      items:  Array< {
        __typename: "PapercraftTags",
        id: string,
        papercraftID: string,
        tagID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreatePapercraftTagsMutationVariables = {
  input: CreatePapercraftTagsInput,
  condition?: ModelPapercraftTagsConditionInput | null,
};

export type CreatePapercraftTagsMutation = {
  createPapercraftTags?:  {
    __typename: "PapercraftTags",
    id: string,
    papercraftID: string,
    tagID: string,
    papercraft:  {
      __typename: "Papercraft",
      user:  {
        __typename: "User",
        username: string,
        email?: string | null,
        description?: string | null,
        website?: string | null,
        instagram?: string | null,
        twitter?: string | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      glb?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdo?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lineless?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lined:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      },
      tags?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      verified?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      userPapercraftsId: string,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      title: string,
      title_encoded: string,
      papercrafts?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdatePapercraftTagsMutationVariables = {
  input: UpdatePapercraftTagsInput,
  condition?: ModelPapercraftTagsConditionInput | null,
};

export type UpdatePapercraftTagsMutation = {
  updatePapercraftTags?:  {
    __typename: "PapercraftTags",
    id: string,
    papercraftID: string,
    tagID: string,
    papercraft:  {
      __typename: "Papercraft",
      user:  {
        __typename: "User",
        username: string,
        email?: string | null,
        description?: string | null,
        website?: string | null,
        instagram?: string | null,
        twitter?: string | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      glb?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdo?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lineless?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lined:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      },
      tags?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      verified?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      userPapercraftsId: string,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      title: string,
      title_encoded: string,
      papercrafts?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeletePapercraftTagsMutationVariables = {
  input: DeletePapercraftTagsInput,
  condition?: ModelPapercraftTagsConditionInput | null,
};

export type DeletePapercraftTagsMutation = {
  deletePapercraftTags?:  {
    __typename: "PapercraftTags",
    id: string,
    papercraftID: string,
    tagID: string,
    papercraft:  {
      __typename: "Papercraft",
      user:  {
        __typename: "User",
        username: string,
        email?: string | null,
        description?: string | null,
        website?: string | null,
        instagram?: string | null,
        twitter?: string | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      glb?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdo?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lineless?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lined:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      },
      tags?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      verified?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      userPapercraftsId: string,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      title: string,
      title_encoded: string,
      papercrafts?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    username: string,
    email?: string | null,
    papercrafts?:  {
      __typename: "ModelPapercraftConnection",
      items:  Array< {
        __typename: "Papercraft",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userPapercraftsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    builds?:  {
      __typename: "ModelBuildConnection",
      items:  Array< {
        __typename: "Build",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userBuildsId: string,
        papercraftBuildsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    profile_picture?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description?: string | null,
    website?: string | null,
    instagram?: string | null,
    twitter?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      username: string,
      email?: string | null,
      papercrafts?:  {
        __typename: "ModelPapercraftConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      profile_picture?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      description?: string | null,
      website?: string | null,
      instagram?: string | null,
      twitter?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPapercraftQueryVariables = {
  id: string,
};

export type GetPapercraftQuery = {
  getPapercraft?:  {
    __typename: "Papercraft",
    user:  {
      __typename: "User",
      username: string,
      email?: string | null,
      papercrafts?:  {
        __typename: "ModelPapercraftConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      profile_picture?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      description?: string | null,
      website?: string | null,
      instagram?: string | null,
      twitter?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    glb?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdo?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdf_lineless?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdf_lined:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    },
    tags?:  {
      __typename: "ModelPapercraftTagsConnection",
      items:  Array< {
        __typename: "PapercraftTags",
        id: string,
        papercraftID: string,
        tagID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    builds?:  {
      __typename: "ModelBuildConnection",
      items:  Array< {
        __typename: "Build",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userBuildsId: string,
        papercraftBuildsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    verified?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    userPapercraftsId: string,
    owner?: string | null,
  } | null,
};

export type ListPapercraftsQueryVariables = {
  filter?: ModelPapercraftFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPapercraftsQuery = {
  listPapercrafts?:  {
    __typename: "ModelPapercraftConnection",
    items:  Array< {
      __typename: "Papercraft",
      user:  {
        __typename: "User",
        username: string,
        email?: string | null,
        description?: string | null,
        website?: string | null,
        instagram?: string | null,
        twitter?: string | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      glb?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdo?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lineless?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lined:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      },
      tags?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      verified?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      userPapercraftsId: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetBuildQueryVariables = {
  id: string,
};

export type GetBuildQuery = {
  getBuild?:  {
    __typename: "Build",
    user:  {
      __typename: "User",
      username: string,
      email?: string | null,
      papercrafts?:  {
        __typename: "ModelPapercraftConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      profile_picture?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      description?: string | null,
      website?: string | null,
      instagram?: string | null,
      twitter?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    papercraft?:  {
      __typename: "Papercraft",
      user:  {
        __typename: "User",
        username: string,
        email?: string | null,
        description?: string | null,
        website?: string | null,
        instagram?: string | null,
        twitter?: string | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      glb?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdo?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lineless?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lined:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      },
      tags?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      verified?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      userPapercraftsId: string,
      owner?: string | null,
    } | null,
    pictures:  Array< {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } >,
    verified?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    userBuildsId: string,
    papercraftBuildsId: string,
    owner?: string | null,
  } | null,
};

export type ListBuildsQueryVariables = {
  filter?: ModelBuildFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBuildsQuery = {
  listBuilds?:  {
    __typename: "ModelBuildConnection",
    items:  Array< {
      __typename: "Build",
      user:  {
        __typename: "User",
        username: string,
        email?: string | null,
        description?: string | null,
        website?: string | null,
        instagram?: string | null,
        twitter?: string | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      papercraft?:  {
        __typename: "Papercraft",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userPapercraftsId: string,
        owner?: string | null,
      } | null,
      pictures:  Array< {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } >,
      verified?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      userBuildsId: string,
      papercraftBuildsId: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTagQueryVariables = {
  id: string,
};

export type GetTagQuery = {
  getTag?:  {
    __typename: "Tag",
    title: string,
    title_encoded: string,
    papercrafts?:  {
      __typename: "ModelPapercraftTagsConnection",
      items:  Array< {
        __typename: "PapercraftTags",
        id: string,
        papercraftID: string,
        tagID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListTagsQueryVariables = {
  filter?: ModelTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTagsQuery = {
  listTags?:  {
    __typename: "ModelTagConnection",
    items:  Array< {
      __typename: "Tag",
      title: string,
      title_encoded: string,
      papercrafts?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPapercraftTagsQueryVariables = {
  id: string,
};

export type GetPapercraftTagsQuery = {
  getPapercraftTags?:  {
    __typename: "PapercraftTags",
    id: string,
    papercraftID: string,
    tagID: string,
    papercraft:  {
      __typename: "Papercraft",
      user:  {
        __typename: "User",
        username: string,
        email?: string | null,
        description?: string | null,
        website?: string | null,
        instagram?: string | null,
        twitter?: string | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      glb?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdo?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lineless?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lined:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      },
      tags?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      verified?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      userPapercraftsId: string,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      title: string,
      title_encoded: string,
      papercrafts?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListPapercraftTagsQueryVariables = {
  filter?: ModelPapercraftTagsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPapercraftTagsQuery = {
  listPapercraftTags?:  {
    __typename: "ModelPapercraftTagsConnection",
    items:  Array< {
      __typename: "PapercraftTags",
      id: string,
      papercraftID: string,
      tagID: string,
      papercraft:  {
        __typename: "Papercraft",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userPapercraftsId: string,
        owner?: string | null,
      },
      tag:  {
        __typename: "Tag",
        title: string,
        title_encoded: string,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    username: string,
    email?: string | null,
    papercrafts?:  {
      __typename: "ModelPapercraftConnection",
      items:  Array< {
        __typename: "Papercraft",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userPapercraftsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    builds?:  {
      __typename: "ModelBuildConnection",
      items:  Array< {
        __typename: "Build",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userBuildsId: string,
        papercraftBuildsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    profile_picture?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description?: string | null,
    website?: string | null,
    instagram?: string | null,
    twitter?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    username: string,
    email?: string | null,
    papercrafts?:  {
      __typename: "ModelPapercraftConnection",
      items:  Array< {
        __typename: "Papercraft",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userPapercraftsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    builds?:  {
      __typename: "ModelBuildConnection",
      items:  Array< {
        __typename: "Build",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userBuildsId: string,
        papercraftBuildsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    profile_picture?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description?: string | null,
    website?: string | null,
    instagram?: string | null,
    twitter?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    username: string,
    email?: string | null,
    papercrafts?:  {
      __typename: "ModelPapercraftConnection",
      items:  Array< {
        __typename: "Papercraft",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userPapercraftsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    builds?:  {
      __typename: "ModelBuildConnection",
      items:  Array< {
        __typename: "Build",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userBuildsId: string,
        papercraftBuildsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    profile_picture?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    description?: string | null,
    website?: string | null,
    instagram?: string | null,
    twitter?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreatePapercraftSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreatePapercraftSubscription = {
  onCreatePapercraft?:  {
    __typename: "Papercraft",
    user:  {
      __typename: "User",
      username: string,
      email?: string | null,
      papercrafts?:  {
        __typename: "ModelPapercraftConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      profile_picture?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      description?: string | null,
      website?: string | null,
      instagram?: string | null,
      twitter?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    glb?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdo?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdf_lineless?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdf_lined:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    },
    tags?:  {
      __typename: "ModelPapercraftTagsConnection",
      items:  Array< {
        __typename: "PapercraftTags",
        id: string,
        papercraftID: string,
        tagID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    builds?:  {
      __typename: "ModelBuildConnection",
      items:  Array< {
        __typename: "Build",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userBuildsId: string,
        papercraftBuildsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    verified?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    userPapercraftsId: string,
    owner?: string | null,
  } | null,
};

export type OnUpdatePapercraftSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdatePapercraftSubscription = {
  onUpdatePapercraft?:  {
    __typename: "Papercraft",
    user:  {
      __typename: "User",
      username: string,
      email?: string | null,
      papercrafts?:  {
        __typename: "ModelPapercraftConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      profile_picture?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      description?: string | null,
      website?: string | null,
      instagram?: string | null,
      twitter?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    glb?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdo?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdf_lineless?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdf_lined:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    },
    tags?:  {
      __typename: "ModelPapercraftTagsConnection",
      items:  Array< {
        __typename: "PapercraftTags",
        id: string,
        papercraftID: string,
        tagID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    builds?:  {
      __typename: "ModelBuildConnection",
      items:  Array< {
        __typename: "Build",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userBuildsId: string,
        papercraftBuildsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    verified?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    userPapercraftsId: string,
    owner?: string | null,
  } | null,
};

export type OnDeletePapercraftSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeletePapercraftSubscription = {
  onDeletePapercraft?:  {
    __typename: "Papercraft",
    user:  {
      __typename: "User",
      username: string,
      email?: string | null,
      papercrafts?:  {
        __typename: "ModelPapercraftConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      profile_picture?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      description?: string | null,
      website?: string | null,
      instagram?: string | null,
      twitter?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    glb?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdo?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdf_lineless?:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    pdf_lined:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    },
    tags?:  {
      __typename: "ModelPapercraftTagsConnection",
      items:  Array< {
        __typename: "PapercraftTags",
        id: string,
        papercraftID: string,
        tagID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    builds?:  {
      __typename: "ModelBuildConnection",
      items:  Array< {
        __typename: "Build",
        verified?: boolean | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        userBuildsId: string,
        papercraftBuildsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    verified?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    userPapercraftsId: string,
    owner?: string | null,
  } | null,
};

export type OnCreateBuildSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateBuildSubscription = {
  onCreateBuild?:  {
    __typename: "Build",
    user:  {
      __typename: "User",
      username: string,
      email?: string | null,
      papercrafts?:  {
        __typename: "ModelPapercraftConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      profile_picture?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      description?: string | null,
      website?: string | null,
      instagram?: string | null,
      twitter?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    papercraft?:  {
      __typename: "Papercraft",
      user:  {
        __typename: "User",
        username: string,
        email?: string | null,
        description?: string | null,
        website?: string | null,
        instagram?: string | null,
        twitter?: string | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      glb?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdo?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lineless?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lined:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      },
      tags?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      verified?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      userPapercraftsId: string,
      owner?: string | null,
    } | null,
    pictures:  Array< {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } >,
    verified?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    userBuildsId: string,
    papercraftBuildsId: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateBuildSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateBuildSubscription = {
  onUpdateBuild?:  {
    __typename: "Build",
    user:  {
      __typename: "User",
      username: string,
      email?: string | null,
      papercrafts?:  {
        __typename: "ModelPapercraftConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      profile_picture?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      description?: string | null,
      website?: string | null,
      instagram?: string | null,
      twitter?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    papercraft?:  {
      __typename: "Papercraft",
      user:  {
        __typename: "User",
        username: string,
        email?: string | null,
        description?: string | null,
        website?: string | null,
        instagram?: string | null,
        twitter?: string | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      glb?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdo?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lineless?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lined:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      },
      tags?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      verified?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      userPapercraftsId: string,
      owner?: string | null,
    } | null,
    pictures:  Array< {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } >,
    verified?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    userBuildsId: string,
    papercraftBuildsId: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteBuildSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteBuildSubscription = {
  onDeleteBuild?:  {
    __typename: "Build",
    user:  {
      __typename: "User",
      username: string,
      email?: string | null,
      papercrafts?:  {
        __typename: "ModelPapercraftConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      profile_picture?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      description?: string | null,
      website?: string | null,
      instagram?: string | null,
      twitter?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    papercraft?:  {
      __typename: "Papercraft",
      user:  {
        __typename: "User",
        username: string,
        email?: string | null,
        description?: string | null,
        website?: string | null,
        instagram?: string | null,
        twitter?: string | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      glb?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdo?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lineless?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lined:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      },
      tags?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      verified?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      userPapercraftsId: string,
      owner?: string | null,
    } | null,
    pictures:  Array< {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } >,
    verified?: boolean | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    userBuildsId: string,
    papercraftBuildsId: string,
    owner?: string | null,
  } | null,
};

export type OnCreateTagSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateTagSubscription = {
  onCreateTag?:  {
    __typename: "Tag",
    title: string,
    title_encoded: string,
    papercrafts?:  {
      __typename: "ModelPapercraftTagsConnection",
      items:  Array< {
        __typename: "PapercraftTags",
        id: string,
        papercraftID: string,
        tagID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateTagSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateTagSubscription = {
  onUpdateTag?:  {
    __typename: "Tag",
    title: string,
    title_encoded: string,
    papercrafts?:  {
      __typename: "ModelPapercraftTagsConnection",
      items:  Array< {
        __typename: "PapercraftTags",
        id: string,
        papercraftID: string,
        tagID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteTagSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteTagSubscription = {
  onDeleteTag?:  {
    __typename: "Tag",
    title: string,
    title_encoded: string,
    papercrafts?:  {
      __typename: "ModelPapercraftTagsConnection",
      items:  Array< {
        __typename: "PapercraftTags",
        id: string,
        papercraftID: string,
        tagID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreatePapercraftTagsSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreatePapercraftTagsSubscription = {
  onCreatePapercraftTags?:  {
    __typename: "PapercraftTags",
    id: string,
    papercraftID: string,
    tagID: string,
    papercraft:  {
      __typename: "Papercraft",
      user:  {
        __typename: "User",
        username: string,
        email?: string | null,
        description?: string | null,
        website?: string | null,
        instagram?: string | null,
        twitter?: string | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      glb?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdo?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lineless?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lined:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      },
      tags?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      verified?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      userPapercraftsId: string,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      title: string,
      title_encoded: string,
      papercrafts?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdatePapercraftTagsSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdatePapercraftTagsSubscription = {
  onUpdatePapercraftTags?:  {
    __typename: "PapercraftTags",
    id: string,
    papercraftID: string,
    tagID: string,
    papercraft:  {
      __typename: "Papercraft",
      user:  {
        __typename: "User",
        username: string,
        email?: string | null,
        description?: string | null,
        website?: string | null,
        instagram?: string | null,
        twitter?: string | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      glb?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdo?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lineless?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lined:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      },
      tags?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      verified?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      userPapercraftsId: string,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      title: string,
      title_encoded: string,
      papercrafts?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeletePapercraftTagsSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeletePapercraftTagsSubscription = {
  onDeletePapercraftTags?:  {
    __typename: "PapercraftTags",
    id: string,
    papercraftID: string,
    tagID: string,
    papercraft:  {
      __typename: "Papercraft",
      user:  {
        __typename: "User",
        username: string,
        email?: string | null,
        description?: string | null,
        website?: string | null,
        instagram?: string | null,
        twitter?: string | null,
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      glb?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdo?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lineless?:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      } | null,
      pdf_lined:  {
        __typename: "S3Object",
        bucket: string,
        region: string,
        key: string,
      },
      tags?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      builds?:  {
        __typename: "ModelBuildConnection",
        nextToken?: string | null,
      } | null,
      verified?: boolean | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      userPapercraftsId: string,
      owner?: string | null,
    },
    tag:  {
      __typename: "Tag",
      title: string,
      title_encoded: string,
      papercrafts?:  {
        __typename: "ModelPapercraftTagsConnection",
        nextToken?: string | null,
      } | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

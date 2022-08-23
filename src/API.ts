/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type User = {
  __typename: "User",
  username: string,
  email?: string | null,
  papercrafts?: ModelPapercraftConnection | null,
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

export type Papercraft = {
  __typename: "Papercraft",
  user: User,
  glb?: S3Object | null,
  pdo?: S3Object | null,
  pdf_lineless?: S3Object | null,
  pdf_lined: S3Object,
  tags?: ModelPapercraftTagsConnection | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  userPapercraftsId: string,
  owner?: string | null,
};

export type S3Object = {
  __typename: "S3Object",
  bucket: string,
  region: string,
  key: string,
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

export type Tag = {
  __typename: "Tag",
  title: string,
  papercrafts?: ModelPapercraftTagsConnection | null,
  id: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type getUserQueryVariables = {
  id: string,
};

export type getUserQuery = {
  getUser?:  {
    __typename: "User",
    username: string,
    id: string,
    email?: string | null,
    createdAt: string,
    updatedAt: string,
    papercrafts?:  {
      __typename: "ModelPapercraftConnection",
      items:  Array< {
        __typename: "Papercraft",
        id: string,
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
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class S3Object {
  readonly bucket: string;
  readonly region: string;
  readonly key: string;
  constructor(init: ModelInit<S3Object>);
}

export declare class Color {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  constructor(init: ModelInit<Color>);
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PapercraftMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TagMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PapercraftTagsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly username: string;
  readonly email?: string | null;
  readonly papercrafts: Papercraft[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Papercraft {
  readonly id: string;
  readonly user: User;
  readonly glb?: S3Object | null;
  readonly pdo?: S3Object | null;
  readonly pdf_lineless?: S3Object | null;
  readonly pdf_lined: S3Object;
  readonly tags: PapercraftTags[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Papercraft, PapercraftMetaData>);
  static copyOf(source: Papercraft, mutator: (draft: MutableModel<Papercraft, PapercraftMetaData>) => MutableModel<Papercraft, PapercraftMetaData> | void): Papercraft;
}

export declare class Tag {
  readonly id: string;
  readonly title: string;
  readonly papercrafts: PapercraftTags[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Tag, TagMetaData>);
  static copyOf(source: Tag, mutator: (draft: MutableModel<Tag, TagMetaData>) => MutableModel<Tag, TagMetaData> | void): Tag;
}

export declare class PapercraftTags {
  readonly id: string;
  readonly papercraft: Papercraft;
  readonly tag: Tag;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<PapercraftTags, PapercraftTagsMetaData>);
  static copyOf(source: PapercraftTags, mutator: (draft: MutableModel<PapercraftTags, PapercraftTagsMetaData>) => MutableModel<PapercraftTags, PapercraftTagsMetaData> | void): PapercraftTags;
}
/*
 * supabase.ts
 * author: evan kirkiles
 * created on Tue Aug 30 2022
 * 2022 the nobot space,
 */

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type RowMetadata = 'id' | 'created_at' | 'updated_at' | 'user';
type QueryCount = { count: number }[];

/* -------------------------------------------------------------------------- */
/*                                   PROFILE                                  */
/* -------------------------------------------------------------------------- */

export type Profile = {
  id: string;
  username: string;
  name?: string;
  website?: string;
  about?: string;
  avatar_url?: string;
  n_papercrafts: number;
  n_builds: number;
  n_followers: number;
  n_following: number;
  created_at: string;
  updated_at: string;
  archived: boolean;
  is_default: boolean;
};

export type ProfilesFollowers = {
  user_id: string;
  following_id: string;
  created_at: string;
  follower: Profile;
  following: Profile;
  id: number;
};

/* -------------------------------------------------------------------------- */
/*                                 PAPERCRAFTS                                */
/* -------------------------------------------------------------------------- */

export interface Papercraft {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  pdo_url?: string;
  glb_url?: string;
  pdf_lineless_url?: string;
  pdf_lined_url?: string;
  xlink?: string;
  pictures: Picture[];
  difficulty: number;
  dimensions_cm?: number[];
  verified: boolean;
  build_id?: string;
  display_build?: Build;
  collective_id?: number;
  collective?: Collective;
  user: Profile;
  tags: Tag[];
  variants: PapercraftVariant[];
  n_builds: number;
  n_likes: number;
}

export interface PapercraftLike {
  id: number;
  user_id: string;
  papercraft_id: string;
  created_at: string;
}

export type PapercraftLikeInput = Omit<PapercraftLike, 'id' | 'created_at'>;

export interface PapercraftVariant {
  id: number;
  user_id: string;
  created_at: string;
  title: string;
  papercraft_id: string;
  pdo_url?: string;
  pdf_lineless_url?: string;
  pdf_lined_url?: string;
}

export type PapercraftInput = PartialBy<
  Papercraft,
  RowMetadata | 'tags' | 'variants' | 'n_likes' | 'n_builds'
>;

export type PapercraftVariantInput = PartialBy<
  PapercraftVariant,
  'id' | 'created_at'
>;

export type PapercraftVariantLocal = Omit<
  PapercraftVariant,
  'pdo_url' | 'pdf_lineless_url' | 'pdf_lined_url'
> & {
  pdo_url: File | string | null;
  pdf_lineless_url: File | string | null;
  pdf_lined_url: File | string | null;
};

/* -------------------------------------------------------------------------- */
/*                                   BUILDS                                   */
/* -------------------------------------------------------------------------- */

export interface Build {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  papercraft_id: string;
  pictures: Picture[];
  xlink?: string;
  description?: string;
  verified: boolean;
  papercraft: Papercraft;
  user: Profile;
  n_likes: number;
}

export type Announcement = {
  id: number;
  created_at: string;
  active: boolean;
  text: string;
};

export type BuildInput = PartialBy<
  Build,
  RowMetadata | 'papercraft' | 'n_likes'
>;

/* -------------------------------------------------------------------------- */
/*                                 COLLECTIVES                                */
/* -------------------------------------------------------------------------- */

export interface Collective {
  id: number;
  created_at: string;
  title: string;
  description: string;
  titlecode: string;
  xlink?: string;
  avatar_url?: string;
  n_members: number;
  n_followers: number;
  n_builds: number;
  n_papercrafts: number;
}

export type CollectivesProfiles = {
  id: number;
  profile_id: string;
  collective_id: number;
};

export type CollectiveInput = PartialBy<
  Collective,
  'id' | 'created_at' | 'n_members' | 'n_papercrafts'
>;

/* -------------------------------------------------------------------------- */
/*                                    TAGS                                    */
/* -------------------------------------------------------------------------- */

export type PapercraftsTags = {
  id: number;
  papercraft_id: string;
  tag_id: number;
};

export type Tag = {
  id: number;
  name: string;
  code: string;
  n_papercrafts: number;
};

export type PapercraftsTagsInput = Omit<PapercraftsTags, 'id'>;

/* -------------------------------------------------------------------------- */
/*                                 PRIMITIVES                                 */
/* -------------------------------------------------------------------------- */

export enum Difficulty {
  Easy = 0,
  Medium = 1,
  Hard = 2,
  InSaNe = 3,
}

export type Picture = {
  key: string;
  width: number;
  height: number;
};

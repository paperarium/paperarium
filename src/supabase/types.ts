/*
 * supabase.ts
 * author: evan kirkiles
 * created on Tue Aug 30 2022
 * 2022 the nobot space,
 */

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type RowMetadata = "id" | "created_at" | "updated_at" | "user";

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
  papercrafts: { count: number }[];
  builds: { count: number }[];
  created_at: string;
  updated_at: string;
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
}

export type PapercraftInput = PartialBy<Papercraft, RowMetadata | "tags">;

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
}

export type Announcement = {
  id: number;
  created_at: string;
  active: boolean;
  text: string;
};

export type BuildInput = PartialBy<Build, RowMetadata | "papercraft">;

/* -------------------------------------------------------------------------- */
/*                                 COLLECTIVES                                */
/* -------------------------------------------------------------------------- */

export interface Collective {
  id: number;
  created_at?: string;
  title: string;
  description: string;
  titlecode: string;
  xlink?: string;
  avatar_url?: string;
  members: Profile[];
  papercrafts: Papercraft[];
}

export type CollectivesProfiles = {
  id: number;
  profile_id: string;
  collective_id: number;
};

export type CollectiveInput = PartialBy<
  Collective,
  "id" | "created_at" | "members" | "papercrafts"
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
};

export type PapercraftsTagsInput = Omit<PapercraftsTags, "id">;

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

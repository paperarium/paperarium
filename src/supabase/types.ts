/*
 * supabase.ts
 * author: evan kirkiles
 * created on Tue Aug 30 2022
 * 2022 the nobot space,
 */

export type Profile = {
  id: string;
  username: string;
  name?: string;
  website?: string;
  about?: string;
  avatur_url?: string;
  papercrafts: { count: number }[];
  builds: { count: number }[];
  created_at: string;
  updated_at: string;
};

export type Papercraft = {
  id: number;
  user_id: string;
  created_at: string;
  title: string;
  description: string;
  glb_url?: string;
  pdo_url: string;
  pdf_lineless_url?: string;
  pdf_lined_url?: string;
  pictures: string[];
  difficulty: number;
  dimensions_cm?: number[];
  verified: boolean;
  user: Profile;
  tags: Tag[];
};

export type Announcement = {
  id: number;
  created_at: string;
  active: boolean;
  text: string;
};

export type PapercraftInput = Omit<
  Papercraft,
  "id" | "created_at" | "user" | "tags"
>;

export type PapercraftsTags = {
  id: number;
  papercraft_id: number;
  tag_id: number;
};

export type PapercraftsTagsInput = Omit<PapercraftsTags, "id">;

export type Tag = {
  id: number;
  name: string;
  code: string;
};

export enum Difficulty {
  Easy = 0,
  Medium = 1,
  Hard = 2,
  InSaNe = 3,
}

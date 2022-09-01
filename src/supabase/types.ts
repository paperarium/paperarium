/*
 * supabase.ts
 * author: evan kirkiles
 * created on Tue Aug 30 2022
 * 2022 the nobot space,
 */

export type User = {
  id: string;
  username: string;
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
  user: User;
};

export type Announcement = {
  id: number;
  created_at: string;
  active: boolean;
  text: string;
};

export type PapercraftInput = Omit<Papercraft, "id" | "created_at" | "user">;

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
  easy = 0,
  medium = 1,
  hard = 2,
  insane = 3,
}

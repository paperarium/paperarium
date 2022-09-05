/*
 * queries.ts
 * author: evan kirkiles
 * created on Wed Aug 31 2022
 * 2022 the nobot space,
 */

import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import * as APIt from "../types";

/* -------------------------------------------------------------------------- */
/*                                   QUERIES                                  */
/* -------------------------------------------------------------------------- */

/**
 * Gets a papercraf by its id
 * @returns A list of papercrafts
 */
export const getPapercraft = async (pid: number) => {
  const { data: papercrafts, error } = await supabaseClient
    .from<APIt.Papercraft>("papercrafts")
    .select(
      `
      *,
      user:profiles(username,avatar_url),
      tags:tags(*)
    `
    )
    .eq("id", pid);
  if (error) throw error;
  return papercrafts[0];
};

/**
 * Lists the papercrafts from the supabase database.
 * @returns A list of papercrafts
 */
export const listPapercrafts = async () => {
  const { data: papercrafts, error } = await supabaseClient
    .from<APIt.Papercraft>("papercrafts")
    .select(
      `
      *,
      user:profiles(username,avatar_url),
      tags:tags(*)
    `
    )
    .order("created_at", { ascending: false });
  if (error) throw error;
  return papercrafts;
};

/**
 * Searches papercrafts from the supabase database by title keywords.
 * @returns A list of papercrafts
 */
export const searchPapercrafts = async (search: string) => {
  const { data: papercrafts, error } = await supabaseClient
    .from<APIt.Papercraft>("papercrafts")
    .select(
      `
      *,
      user:profiles(username,avatar_url)
    `
    )
    .order("created_at", { ascending: false });
  if (error) throw error;
  return papercrafts;
};

/**
 * Lists a user's papercrafts from the database.
 * @returns A list of papercrafts
 */
export const searchUserPapercrafts = async (
  usernameOrId: string,
  useId?: boolean,
  search?: string
) => {
  const { data: papercrafts, error } = await supabaseClient
    .from<APIt.Papercraft>("papercrafts")
    .select(
      `
      *,
      user:profiles(username,avatar_url)
    `
    )
    .eq(useId ? "user_id" : ("user.username" as any), usernameOrId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return papercrafts;
};

/* -------------------------------------------------------------------------- */
/*                                  MUTATIONS                                 */
/* -------------------------------------------------------------------------- */

/**
 * Creates a papercraft in the supabase database.
 * @param input
 * @returns
 */
export const createPapercraft = async (
  input: APIt.PapercraftInput | APIt.PapercraftInput[]
) => {
  const { data: papercrafts, error } = await supabaseClient
    .from<APIt.Papercraft>("papercrafts")
    .insert(input);
  if (error) throw error;
  return papercrafts;
};

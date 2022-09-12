/*
 * queries.ts
 * author: evan kirkiles
 * created on Wed Aug 31 2022
 * 2022 the nobot space,
 */

import {
  supabaseClient,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";
import * as APIt from "../types";

/* -------------------------------------------------------------------------- */
/*                                   QUERIES                                  */
/* -------------------------------------------------------------------------- */

/**
 * Gets a papercraf by its id
 * @returns A list of papercrafts
 */
export const getPapercraft = async (pid: string) => {
  const { data: papercrafts, error } = await supabaseClient
    .from<APIt.Papercraft>("papercrafts")
    .select(
      `
      *,
      user:profiles(id,username,avatar_url,n_builds:builds(count),n_papercrafts:papercrafts(count)),
      display_build:builds!papercrafts_build_id_fkey(id,description,pictures,user_id,user:profiles(username,avatar_url,n_builds:builds(count),n_papercrafts:papercrafts(count))),
      collective:collectives!papercrafts_collective_id_fkey(id,titlecode,title,n_members:collectives_profiles(count),n_papercrafts:papercrafts(count)),
      tags:tags(*)
    `
    )
    .eq("id", pid);
  if (error) throw error;
  return papercrafts[0];
};

type ListPapercraftsQueryVariables = {
  search?: string;
  username?: string;
  collective?: string;
  tags?: number[];
};

/**
 * Lists the papercrafts from the supabase database.
 * @returns A list of papercrafts
 */
export const listPapercrafts = async ({
  search,
  username,
  collective,
  tags,
}: ListPapercraftsQueryVariables) => {
  let req = (
    search
      ? supabaseClient.rpc<APIt.Papercraft>("search_papercrafts", {
          papercraft_term: search,
        })
      : supabaseClient.from<APIt.Papercraft>("papercrafts")
  ).select(`
    *,
    user:profiles!inner(username,avatar_url),
    collective:collectives!${
      collective ? "inner" : "left"
    }(titlecode,title,avatar_url),
    tags!inner(id,name,code)`);
  if (tags) req = req.in("tags.id" as any, tags);
  if (username) req = req.eq("profiles.username" as any, username);
  if (collective) req = req.eq("collectives.titlecode" as any, collective);
  const { data: papercrafts, error } = await req.order("created_at", {
    ascending: false,
  });
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

/**
 * Updates a papercraft in the supabase database.
 * @param input
 * @returns
 */
export const updatePapercraft = async (
  id: string,
  input: Partial<APIt.Papercraft>
) => {
  const { data: papercrafts, error } = await supabaseClient
    .from<APIt.Papercraft>("papercrafts")
    .update(input)
    .match({ id });
  if (error) throw error;
  return papercrafts;
};

/* -------------------------------------------------------------------------- */
/*                                 KEY FACTORY                                */
/* -------------------------------------------------------------------------- */

export const papercraftKeys = {
  all: ["papercrafts"] as const,
  lists: () => [...papercraftKeys.all, "list"] as const,
  list: (params: ListPapercraftsQueryVariables) =>
    [...papercraftKeys.lists(), params] as const,
  gets: () => [...papercraftKeys.all, "get"] as const,
  get: (id: string) => [...papercraftKeys.gets(), id] as const,
};

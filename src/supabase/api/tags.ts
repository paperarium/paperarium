/*
 * tags.ts
 * author: evan kirkiles
 * created on Sat Sep 10 2022
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

export type ListTagsQueryVariables = {
  search?: string;
  user_id?: string;
};

/**
 * Lists the papercrafts from the supabase database.
 * @returns A list of papercrafts
 */
export const listTags = async ({ search, user_id }: ListTagsQueryVariables) => {
  let req = user_id
    ? supabaseClient.rpc<APIt.Tag>("search_tags_user", {
        tag_term: search || "",
        p_user_id: user_id,
      })
    : supabaseClient.rpc<APIt.Tag>("search_tags", {
        tag_term: search || "",
      });
  req = req.select(`*`);
  const { data: tags, error } = await req;
  if (error) throw error;
  return tags;
};

/* -------------------------------------------------------------------------- */
/*                                 KEY FACTORY                                */
/* -------------------------------------------------------------------------- */

export const tagsKeys = {
  all: ["tags"] as const,
  lists: () => [...tagsKeys.all, "list"] as const,
  list: (params: ListTagsQueryVariables) =>
    [...tagsKeys.lists(), params] as const,
  gets: () => [...tagsKeys.all, "get"] as const,
  get: (id: string) => [...tagsKeys.gets(), id] as const,
};

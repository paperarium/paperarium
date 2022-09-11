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

type ListTagsQueryVariables = {
  search?: string;
  count?: "papercrafts" | "builds";
};

/**
 * Lists the papercrafts from the supabase database.
 * @returns A list of papercrafts
 */
export const listTags = async ({ search }: ListTagsQueryVariables) => {
  let req = search
    ? supabaseClient.rpc<APIt.Tag>("search_tags", {
        tag_term: search,
      })
    : supabaseClient.from<APIt.Tag>("tags");
  const { data: tags, error } = await req.select(`*`);
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

/*
 * tags.ts
 * author: evan kirkiles
 * created on Sat Sep 10 2022
 * 2022 the nobot space,
 */
import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { PostgrestTransformBuilder } from '@supabase/postgrest-js';
import { Database } from '../API';
import * as APIt from '../types';

/* -------------------------------------------------------------------------- */
/*                                   QUERIES                                  */
/* -------------------------------------------------------------------------- */

export type ListTagsQueryVariables = {
  search?: string;
  user_id?: string;
  collective_titlecode?: string;
};

/**
 * Lists the papercrafts from the supabase database.
 * @returns A list of papercrafts
 */
export const listTags =
  (supabaseClient: SupabaseClient<Database>) =>
  async ({ search, user_id, collective_titlecode }: ListTagsQueryVariables) => {
    let req: PostgrestTransformBuilder<APIt.Tag, APIt.Tag> = user_id
      ? (supabaseClient.rpc('search_tags_user', {
          tag_term: search || '',
          p_user_id: user_id,
        }) as any)
      : collective_titlecode
      ? (supabaseClient.rpc('search_tags_collective', {
          tag_term: search || '',
          p_collective_titlecode: collective_titlecode,
        }) as any)
      : (supabaseClient.rpc('search_tags', {
          tag_term: search || '',
        }) as any);
    req = req.select(`*`);
    const { data: tags, error } = await req;
    if (error) throw error;
    return tags;
  };

/* -------------------------------------------------------------------------- */
/*                                  MUTATIONS                                 */
/* -------------------------------------------------------------------------- */

/**
 * Creates a tag in the database
 * @param input
 * @returns
 */
export const createTag =
  (supabaseClient: SupabaseClient<Database>) =>
  async (input: APIt.TagInput | APIt.TagInput[]) => {
    const { data: tags, error } = await supabaseClient
      .from('tags')
      .insert(input);
    if (error) throw error;
    return tags;
  };

/* -------------------------------------------------------------------------- */
/*                                 KEY FACTORY                                */
/* -------------------------------------------------------------------------- */

export const tagsKeys = {
  all: ['tags'] as const,
  lists: () => [...tagsKeys.all, 'list'] as const,
  list: (params: ListTagsQueryVariables) =>
    [...tagsKeys.lists(), params] as const,
  gets: () => [...tagsKeys.all, 'get'] as const,
  get: (id: string) => [...tagsKeys.gets(), id] as const,
};

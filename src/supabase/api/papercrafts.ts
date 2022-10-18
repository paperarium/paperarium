/*
 * queries.ts
 * author: evan kirkiles
 * created on Wed Aug 31 2022
 * 2022 the nobot space,
 */

import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import {
  applyNextPageParam,
  InfiniteQueryFilter,
  InfiniteQueryPage,
} from '../../util/getNextPageParam';
import { PAGE_SIZE } from '../../util/getPagination';
import { Database } from '../API';
import * as APIt from '../types';

/* -------------------------------------------------------------------------- */
/*                                   QUERIES                                  */
/* -------------------------------------------------------------------------- */

/**
 * Gets a papercraf by its id
 * @returns A list of papercrafts
 */
export const getPapercraft =
  (supabaseClient: SupabaseClient<Database>) => async (pid: string) => {
    const { data: papercrafts, error } = await supabaseClient
      .from('papercrafts_view')
      .select(
        `
      *,
      user:profiles_view!user_id(*),
      display_build:builds!build_id(id,description,pictures,user_id,user:profiles_view!builds_user_id_fkey(*)),
      collective:collectives_view!papercrafts_collective_id_fkey(*),
      tags:tags(*),
      variants:papercrafts_variants(*)
    `
      )
      .eq('id', pid);
    if (error) throw error;
    return papercrafts[0] as APIt.Papercraft;
  };

export type ListPapercraftsQueryVariables = {
  search: string;
  username?: string;
  collective?: string;
  tags?: number[];
} & InfiniteQueryFilter<APIt.Papercraft>;

/**
 * Lists the papercrafts from the supabase database.
 * @returns A list of papercrafts
 */
export const listPapercrafts =
  (supabaseClient: SupabaseClient<Database>) =>
  async (
    {
      search,
      username,
      collective,
      tags,
      filter,
    }: ListPapercraftsQueryVariables,
    pageParam: number = 0
  ): Promise<InfiniteQueryPage<APIt.Papercraft>> => {
    let req = (
      search
        ? supabaseClient.rpc('search_papercrafts', {
            papercraft_term: search,
          })
        : supabaseClient.from('papercrafts_view')
    ).select(`
    *,
    user:user_id!inner(username,avatar_url,archived),
    collective:collectives!${
      collective ? 'inner' : 'left'
    }(titlecode,title,avatar_url),
    tags!${
      tags?.length ? 'inner' : 'left'
    }(id,name,code)`) as PostgrestFilterBuilder<
      APIt.Papercraft,
      APIt.Papercraft
    >;
    if (tags) req = req.in('tags.id' as any, tags);
    if (username) req = req.eq('user_id.username' as any, username);
    if (collective) req = req.eq('collectives.titlecode' as any, collective);
    // now apply the filters using the next page param
    const { data: papercrafts, error } = await applyNextPageParam(
      req,
      filter,
      pageParam
    );
    if (error) throw error;
    return {
      data: papercrafts,
      page: pageParam,
    };
  };

/* -------------------------------------------------------------------------- */
/*                                  MUTATIONS                                 */
/* -------------------------------------------------------------------------- */

/**
 * Creates a papercraft in the supabase database.
 * @param input
 * @returns
 */
export const createPapercraft =
  (supabaseClient: SupabaseClient<Database>) =>
  async (input: APIt.PapercraftInput | APIt.PapercraftInput[]) => {
    const { data: papercrafts, error } = await supabaseClient
      .from('papercrafts')
      .insert(input);
    if (error) throw error;
    return papercrafts;
  };

/**
 * Updates a papercraft in the supabase database.
 * @param input
 * @returns
 */
export const updatePapercraft =
  (supabaseClient: SupabaseClient<Database>) =>
  async (id: string, input: APIt.PapercraftUpdate) => {
    const { data: papercraft, error } = await supabaseClient
      .from('papercrafts')
      .update(input)
      .match({ id })
      .select('*')
      .limit(1)
      .single();
    if (error) throw error;
    return papercraft as unknown as APIt.Papercraft;
  };

/* -------------------------------------------------------------------------- */
/*                             PAPERCRAFT VARIANTS                            */
/* -------------------------------------------------------------------------- */

/**
 * Inserts papercraft variants into the database
 * @param input
 * @returns
 */
export const insertPapercraftVariants =
  (supabaseClient: SupabaseClient<Database>) =>
  async (
    input: APIt.PapercraftVariantInput | APIt.PapercraftVariantInput[]
  ) => {
    const { data: papercrafts, error } = await supabaseClient
      .from('papercrafts_variants')
      .insert(input);
    if (error) throw error;
    return papercrafts;
  };

/**
 * Upserts papercraft variants into the database
 * @param input
 * @returns
 */
export const upsertPapercraftVariants =
  (supabaseClient: SupabaseClient<Database>) =>
  async (
    input: APIt.PapercraftVariantInput | APIt.PapercraftVariantInput[]
  ) => {
    const { data: papercrafts, error } = await supabaseClient
      .from('papercrafts_variants')
      .upsert(input);
    if (error) throw error;
    return papercrafts;
  };

/**
 * Deletes papercraft variants from the database
 * @param input
 * @returns
 */
export const deletePapercraftVariants =
  (supabaseClient: SupabaseClient<Database>) => async (ids: number[]) => {
    const { data: papercrafts, error } = await supabaseClient
      .from('papercrafts_variants')
      .delete()
      .in('id', ids);
    if (error) throw error;
    return papercrafts;
  };

/* -------------------------------------------------------------------------- */
/*                              PAPERCRAFT LIKES                              */
/* -------------------------------------------------------------------------- */

/**
 * Likes a papercraft in the supabase database.
 * @param input
 * @returns
 */
export const likePapercraft =
  (supabaseClient: SupabaseClient<Database>) =>
  async (input: APIt.PapercraftLikeInput | APIt.PapercraftLikeInput[]) => {
    const { data: papercraft_like, error } = await supabaseClient
      .from('papercrafts_likes')
      .insert(input);
    if (error) throw error;
    return papercraft_like;
  };

/**
 * Unlikes a papercraft in the supabase database.
 * @param input
 * @returns
 */
export const unlikePapercraft =
  (supabaseClient: SupabaseClient<Database>) =>
  async ({ user_id, papercraft_id }: APIt.PapercraftLikeInput) => {
    const { data: papercraft_like, error } = await supabaseClient
      .from('papercrafts_likes')
      .delete()
      .match({ user_id, papercraft_id });
    if (error) throw error;
    return papercraft_like;
  };

/* -------------------------------------------------------------------------- */
/*                                 KEY FACTORY                                */
/* -------------------------------------------------------------------------- */

export const papercraftKeys = {
  all: ['papercrafts'] as const,
  lists: () => [...papercraftKeys.all, 'list'] as const,
  list: (params: ListPapercraftsQueryVariables) =>
    [...papercraftKeys.lists(), params] as const,
  gets: () => [...papercraftKeys.all, 'get'] as const,
  get: (id: string) => [...papercraftKeys.gets(), id] as const,
  isLikeds: () => [...papercraftKeys.all, 'isLiked'] as const,
  isLiked: (id: string) => [...papercraftKeys.isLikeds(), id] as const,
};

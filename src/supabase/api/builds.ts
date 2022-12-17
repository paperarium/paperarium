/*
 * queries.ts
 * author: evan kirkiles
 * created on Wed Aug 31 2022
 * 2022 the nobot space,
 */

import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import {
  applyNextPageParam,
  InfiniteQueryFilter,
} from '../../util/getNextPageParam';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { Database } from '../API';
import * as APIt from '../types';

/* -------------------------------------------------------------------------- */
/*                                   QUERIES                                  */
/* -------------------------------------------------------------------------- */

/**
 * Gets a papercraf by its id
 * @returns A list of builds
 */
export const getBuild =
  (supabaseClient: SupabaseClient<Database>) => async (bid: string) => {
    const { data: builds, error } = await supabaseClient
      .from('builds')
      .select(
        `
      *,
      user:user_id!inner(*),
      papercraft:papercraft_id!inner(id,title,description,pictures,user_id)
    `
      )
      .eq('id', bid);
    if (error) throw error;
    return builds[0] as APIt.Build;
  };

export type ListBuildsQueryVariables = {
  search?: string;
  collective?: string;
  username?: string;
  tags?: number[];
} & InfiniteQueryFilter<APIt.Build>;

/**
 * Lists the builds from the supabase database.
 * @returns A list of builds
 */
export const listBuilds =
  (supabaseClient: SupabaseClient<Database>) =>
  async (
    { search, collective, username, filter }: ListBuildsQueryVariables,
    pageParam: number = 0
  ) => {
    let req = (
      search
        ? supabaseClient.rpc('search_builds', {
            build_term: search,
          })
        : supabaseClient.from('builds_view')
    ).select(
      `*,
    user:user_id!inner(username,avatar_url,archived),
    papercraft:papercraft_id!inner(id,title,description,pictures,user_id,collective_id)`
    ) as PostgrestFilterBuilder<Database['public'], APIt.Build, APIt.Build>;
    if (username) req = req.eq('user_id.username' as any, username);
    if (collective) req = req.eq('collective_titlecode' as any, collective);
    // now apply the filters using the next page param
    const { data: builds, error } = await applyNextPageParam(
      req,
      filter,
      pageParam
    );
    if (error) throw error;
    return {
      data: builds,
      page: pageParam,
    };
  };
/* -------------------------------------------------------------------------- */
/*                                  MUTATIONS                                 */
/* -------------------------------------------------------------------------- */

/**
 * Creates a build in the supabase database.
 * @param input
 * @returns
 */
export const createBuild =
  (supabaseClient: SupabaseClient<Database>) =>
  async (input: APIt.BuildInput | APIt.BuildInput[]) => {
    const { data: builds, error } = await supabaseClient
      .from('builds')
      .insert(input)
      .select('*');
    if (error) throw error;
    return builds as unknown as APIt.Build[];
  };

/**
 * Updates a build in the supabase database.
 * @param input
 * @returns
 */
export const updateBuild =
  (supabaseClient: SupabaseClient<Database>) =>
  async (id: string, input: APIt.BuildUpdate) => {
    const { data: builds, error } = await supabaseClient
      .from('builds')
      .update(input)
      .match({ id })
      .select('*');
    if (error) throw error;
    return builds as APIt.Build[];
  };

/* -------------------------------------------------------------------------- */
/*                                 KEY FACTORY                                */
/* -------------------------------------------------------------------------- */

export const buildKeys = {
  all: ['builds'] as const,
  lists: () => [...buildKeys.all, 'list'] as const,
  list: (params: ListBuildsQueryVariables) =>
    [...buildKeys.lists(), params] as const,
  gets: () => [...buildKeys.all, 'get'] as const,
  get: (id: string) => [...buildKeys.gets(), id] as const,
  isLikeds: () => [...buildKeys.all, 'isLiked'] as const,
  isLiked: (id: string) => [...buildKeys.isLikeds(), id] as const,
};

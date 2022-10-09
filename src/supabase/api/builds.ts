/*
 * queries.ts
 * author: evan kirkiles
 * created on Wed Aug 31 2022
 * 2022 the nobot space,
 */

import {
  supabaseClient,
  supabaseServerClient,
} from '@supabase/auth-helpers-nextjs';
import {
  applyNextPageParam,
  InfiniteQueryFilter,
} from '../../util/getNextPageParam';
import { PAGE_SIZE } from '../../util/getPagination';
import * as APIt from '../types';

/* -------------------------------------------------------------------------- */
/*                                   QUERIES                                  */
/* -------------------------------------------------------------------------- */

/**
 * Gets a papercraf by its id
 * @returns A list of builds
 */
export const getBuild = async (bid: string) => {
  const { data: builds, error } = await supabaseClient
    .from<APIt.Build>('builds')
    .select(
      `
      *,
      user:user_id!inner(*),
      papercraft:papercraft_id!inner(id,title,description,pictures,user_id)
    `
    )
    .eq('id', bid);
  if (error) throw error;
  return builds[0];
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
export const listBuilds = async (
  { search, collective, username, filter }: ListBuildsQueryVariables,
  pageParam: string | number | null = null
) => {
  let req = (
    search
      ? supabaseClient.rpc<APIt.Build>('search_builds', {
          build_term: search,
        })
      : supabaseClient.from<APIt.Build>('builds_view')
  ).select(
    `*,
    user:user_id!inner(username,avatar_url,archived),
    papercraft:papercraft_id!inner(id,title,description,pictures,user_id,collective_id)`
  );
  if (username) req = req.eq('user_id.username' as any, username);
  if (collective) req = req.eq('collective_titlecode' as any, collective);
  // now apply the filters using the next page param
  const { data: builds, error } = await applyNextPageParam(
    req,
    filter,
    pageParam
  );
  if (error) throw error;
  return builds;
};
/* -------------------------------------------------------------------------- */
/*                                  MUTATIONS                                 */
/* -------------------------------------------------------------------------- */

/**
 * Creates a build in the supabase database.
 * @param input
 * @returns
 */
export const createBuild = async (
  input: APIt.BuildInput | APIt.BuildInput[]
) => {
  const { data: builds, error } = await supabaseClient
    .from<APIt.Build>('builds')
    .insert(input);
  if (error) throw error;
  return builds;
};

/**
 * Updates a build in the supabase database.
 * @param input
 * @returns
 */
export const updateBuild = async (id: string, input: Partial<APIt.Build>) => {
  const { data: builds, error } = await supabaseClient
    .from<APIt.Build>('builds')
    .update(input)
    .match({ id });
  if (error) throw error;
  return builds;
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

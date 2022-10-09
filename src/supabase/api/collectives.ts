/*
 * collectives.ts
 * author: evan kirkiles
 * created on Wed Aug 31 2022
 * 2022 the nobot space,
 */

import { supabaseClient } from '@supabase/auth-helpers-nextjs';
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
 * Gets a collective by its titlecode
 * @returns A list of collectives
 */
export const getCollective = async (titlecode: string) => {
  const { data: collectives, error } = await supabaseClient
    .from<APIt.Collective>('collectives_view')
    .select('*')
    .eq('titlecode', titlecode);
  if (error) throw error;
  return collectives[0];
};

export type ListCollectivesQueryVariables = {
  search?: string;
} & InfiniteQueryFilter<APIt.Collective>;

/**
 * Lists the collectives from the supabase database.
 * @returns A list of collectives
 */
export const listCollectives = async (
  { search, filter }: ListCollectivesQueryVariables,
  pageParam: string | number | null = null
) => {
  let req = (
    search
      ? supabaseClient.rpc<APIt.Collective>('search_collectives', {
          collective_term: search,
        })
      : supabaseClient.from<APIt.Collective>('collectives_view')
  ).select(`*`);
  // now apply the filters using the next page param
  const { data: collectives, error } = await applyNextPageParam(
    req,
    filter,
    pageParam
  );
  if (error) throw error;
  return collectives;
};

/* -------------------------------------------------------------------------- */
/*                                  MUTATIONS                                 */
/* -------------------------------------------------------------------------- */

/**
 * Creates a papercraft in the supabase database.
 * @param input
 * @returns
 */
export const createCollective = async (
  input: APIt.CollectiveInput | APIt.CollectiveInput[]
) => {
  const { data: collectives, error } = await supabaseClient
    .from<APIt.Collective>('collectives')
    .insert(input);
  if (error) throw error;
  return collectives;
};

/**
 * Updates a collective in the supabase database.
 * @param input
 * @returns
 */
export const updateCollective = async (
  id: number,
  input: Partial<APIt.Collective>
) => {
  const { data: collectives, error } = await supabaseClient
    .from<APIt.Collective>('collectives')
    .update(input)
    .match({ id });
  if (error) throw error;
  return collectives[0];
};

/**
 * Creates a papercraft in the supabase database.
 * @param input
 * @returns
 */
export const createCollectivesProfiles = async (
  input: Partial<APIt.CollectivesProfiles> | Partial<APIt.CollectivesProfiles>[]
) => {
  const { data: collectives, error } = await supabaseClient
    .from<APIt.CollectivesProfiles>('collectives_profiles')
    .insert(input);
  if (error) throw error;
  return collectives;
};

/* -------------------------------------------------------------------------- */
/*                                 KEY FACTORY                                */
/* -------------------------------------------------------------------------- */

export const collectiveKeys = {
  all: ['collectives'] as const,
  lists: () => [...collectiveKeys.all, 'list'] as const,
  list: (params: ListCollectivesQueryVariables) =>
    [...collectiveKeys.lists(), params] as const,
  gets: () => [...collectiveKeys.all, 'get'] as const,
  get: (titlecode: string) => [...collectiveKeys.gets(), titlecode] as const,
};

/*
 * collectives.ts
 * author: evan kirkiles
 * created on Wed Aug 31 2022
 * 2022 the nobot space,
 */

import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import {
  applyNextPageParam,
  InfiniteQueryFilter,
} from '../../util/getNextPageParam';
import { Database } from '../API';
import * as APIt from '../types';

/* -------------------------------------------------------------------------- */
/*                                   QUERIES                                  */
/* -------------------------------------------------------------------------- */

/**
 * Gets a collective by its titlecode
 * @returns A list of collectives
 */
export const getCollective =
  (supabaseClient: SupabaseClient<Database>) => async (titlecode: string) => {
    const { data: collectives, error } = await supabaseClient
      .from('collectives_view')
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
export const listCollectives =
  (supabaseClient: SupabaseClient<Database>) =>
  async (
    { search, filter }: ListCollectivesQueryVariables,
    pageParam: number = 0
  ) => {
    let req = (
      search
        ? supabaseClient.rpc('search_collectives', {
            collective_term: search,
          })
        : supabaseClient.from('collectives_view')
    ).select(`*`) as PostgrestFilterBuilder<APIt.Collective, APIt.Collective>;
    // now apply the filters using the next page param
    const { data: collectives, error } = await applyNextPageParam(
      req,
      filter,
      pageParam
    );
    if (error) throw error;
    return {
      data: collectives,
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
export const createCollective =
  (supabaseClient: SupabaseClient<Database>) =>
  async (input: APIt.CollectiveInput | APIt.CollectiveInput[]) => {
    const { data: collectives, error } = await supabaseClient
      .from('collectives')
      .insert(input);
    if (error) throw error;
    return collectives;
  };

/**
 * Updates a collective in the supabase database.
 * @param input
 * @returns
 */
export const updateCollective =
  (supabaseClient: SupabaseClient<Database>) =>
  async (id: number, input: APIt.CollectiveInput) => {
    const { data: collectives, error } = await supabaseClient
      .from('collectives')
      .update(input)
      .match({ id })
      .select('*')
      .limit(1)
      .single();
    if (error) throw error;
    return collectives;
  };

/**
 * Creates a papercraft in the supabase database.
 * @param input
 * @returns
 */
export const createCollectivesProfiles =
  (supabaseClient: SupabaseClient<Database>) =>
  async (
    input: APIt.CollectivesProfilesInput | APIt.CollectivesProfilesInput[]
  ) => {
    const { data: collectives, error } = await supabaseClient
      .from('collectives_profiles')
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

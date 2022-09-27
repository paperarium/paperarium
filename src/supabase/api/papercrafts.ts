/*
 * queries.ts
 * author: evan kirkiles
 * created on Wed Aug 31 2022
 * 2022 the nobot space,
 */

import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { InfiniteQueryFilter } from '../../util/getNextPageParam';
import { PAGE_SIZE } from '../../util/getPagination';
import * as APIt from '../types';

/* -------------------------------------------------------------------------- */
/*                                   QUERIES                                  */
/* -------------------------------------------------------------------------- */

/**
 * Gets a papercraf by its id
 * @returns A list of papercrafts
 */
export const getPapercraft = async (pid: string) => {
  const { data: papercrafts, error } = await supabaseClient
    .from<APIt.Papercraft>('papercrafts')
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
  return papercrafts[0];
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
export const listPapercrafts = async (
  { search, username, collective, tags }: ListPapercraftsQueryVariables,
  ltCreated: string | null = null
) => {
  let req = (
    search
      ? supabaseClient.rpc<APIt.Papercraft>('search_papercrafts', {
          papercraft_term: search,
        })
      : supabaseClient.from<APIt.Papercraft>('papercrafts')
  ).select(`
    *,
    user:user_id!inner(username,avatar_url,archived),
    collective:collectives!${
      collective ? 'inner' : 'left'
    }(titlecode,title,avatar_url),
    tags!${tags?.length ? 'inner' : 'left'}(id,name,code)`);
  if (tags) req = req.in('tags.id' as any, tags);
  if (username) req = req.eq('user_id.username' as any, username);
  if (collective) req = req.eq('collectives.titlecode' as any, collective);
  if (ltCreated) req = req.lt('created_at', ltCreated);
  const { data: papercrafts, error } = await req
    .order('created_at', {
      ascending: false,
    })
    .limit(PAGE_SIZE);
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
    .from<APIt.Papercraft>('papercrafts')
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
    .from<APIt.Papercraft>('papercrafts')
    .update(input)
    .match({ id });
  if (error) throw error;
  return papercrafts;
};

/* -------------------------------------------------------------------------- */
/*                             PAPERCRAFT VARIANTS                            */
/* -------------------------------------------------------------------------- */

/**
 * Inserts papercraft variants into the database
 * @param input
 * @returns
 */
export const insertPapercraftVariants = async (
  input: Partial<APIt.PapercraftVariant> | Partial<APIt.PapercraftVariant>[]
) => {
  const { data: papercrafts, error } = await supabaseClient
    .from<APIt.PapercraftVariant>('papercrafts_variants')
    .insert(input);
  if (error) throw error;
  return papercrafts;
};

/**
 * Upserts papercraft variants into the database
 * @param input
 * @returns
 */
export const upsertPapercraftVariants = async (
  input: Partial<APIt.PapercraftVariant> | Partial<APIt.PapercraftVariant>[]
) => {
  const { data: papercrafts, error } = await supabaseClient
    .from<APIt.PapercraftVariant>('papercrafts_variants')
    .upsert(input);
  if (error) throw error;
  return papercrafts;
};

/**
 * Deletes papercraft variants from the database
 * @param input
 * @returns
 */
export const deletePapercraftVariants = async (ids: number[]) => {
  const { data: papercrafts, error } = await supabaseClient
    .from<APIt.PapercraftVariant>('papercrafts_variants')
    .delete()
    .in('id', ids);
  if (error) throw error;
  return papercrafts;
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
};

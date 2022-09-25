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
import * as APIt from '../types';

/* -------------------------------------------------------------------------- */
/*                                   QUERIES                                  */
/* -------------------------------------------------------------------------- */

/**
 * Gets a papercraf by its id
 * @returns A list of builds
 */
export const getBuild = async (pid: string) => {
  const { data: builds, error } = await supabaseClient
    .from<APIt.Build>('builds')
    .select(
      `
      *,
      user:user_id!inner(*),
      papercraft:papercrafts!inner(id,title,description,pictures,user_id)
    `
    )
    .eq('id', pid);
  if (error) throw error;
  return builds[0];
};

type ListBuildsQueryVariables = {
  search?: string;
  username?: string;
  tags?: number[];
};

/**
 * Lists the builds from the supabase database.
 * @returns A list of builds
 */
export const listBuilds = async ({
  search,
  username,
}: ListBuildsQueryVariables) => {
  let req = (
    search
      ? supabaseClient.rpc<APIt.Build>('search_builds', {
          build_term: search,
        })
      : supabaseClient.from<APIt.Build>('builds')
  ).select(
    `*,
    user:user_id!inner(username,avatar_url),
    papercraft:papercraft_id!inner(id,title,description,pictures,user_id)`
  );
  if (username) req = req.eq('user_id.username' as any, username);
  const { data: builds, error } = await req.order('created_at', {
    ascending: false,
  });
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
  list: (params: { search: string; username?: string }) =>
    [...buildKeys.lists(), params] as const,
};

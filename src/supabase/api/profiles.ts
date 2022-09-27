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
 *
 * @param id the user's own ID
 * @returns
 */
export const getSelf = async (id: string) => {
  const { data: profiles, error } = await supabaseClient
    .from<APIt.Profile>('profiles_view')
    .select('*')
    .eq('id', id);
  if (error) throw error;
  return profiles[0];
};

/**
 * Get if the current user is an admin
 */
export const getIsAdmin = async () => {
  const { data: isAdmin, error } = await supabaseClient.rpc<boolean>(
    'get_is_admin'
  );
  if (error) throw error;
  return !!isAdmin;
};

/**
 * Gets a profile by its username
 * @returns a profile
 */
export const getProfile = async (username: string) => {
  const { data: profiles, error } = await supabaseClient
    .from<APIt.Profile>('profiles_view')
    .select('*')
    .eq('username', username);
  if (error) throw error;
  return profiles[0];
};

export type ListProfilesOrderBy = {
  column: keyof APIt.Profile;
  ascending: boolean;
};

export type ListProfilesQueryVariables = {
  search?: string;
  show_all?: boolean;
} & InfiniteQueryFilter<APIt.Profile>;

/**
 * Lists a bunch of profiles from the database
 * @returns A list of profiles
 */
export const listProfiles = async (
  { search, show_all, filter }: ListProfilesQueryVariables,
  pageParam: string | number | null = null
) => {
  let req = (
    search
      ? supabaseClient.rpc<APIt.Profile>('search_profiles', {
          username_term: search,
        })
      : supabaseClient.from<APIt.Profile>('profiles_view')
  ).select(`*`);
  if (!show_all) req = req.filter('is_default', 'eq', 'false');
  // add in filter if it exists
  if (filter) {
    if (pageParam) {
      if (filter.ascending) {
        req = req.lt(filter.column, pageParam);
      } else {
        req = req.gt(filter.column, pageParam);
      }
    }
    req = req.order(filter.column, { ascending: filter.ascending });
    // default is filtering by created_at
  } else if (pageParam) {
    req = req.lt('created_at', pageParam);
  }
  // add in created_at ordering
  const { data: profiles, error } = await req
    .order('created_at', {
      ascending: false,
    })
    .limit(PAGE_SIZE);
  if (error) throw error;
  return profiles;
};

export type ProfileFollowingQueryVariables = Omit<
  APIt.ProfilesFollowers,
  'id' | 'created_at' | 'follower' | 'following'
>;

/**
 * Gets whether or not a user is following another user
 * @param id
 * @returns
 */
export const getIsFollowing = async ({
  user_id,
  following_id,
}: ProfileFollowingQueryVariables) => {
  let req = supabaseClient.from<APIt.Profile>('profiles_followers');
  const { data: profiles, error } = await req
    .select('*')
    .match({ user_id, following_id });
  if (error) throw error;
  return profiles.length > 0;
};

/* -------------------------------------------------------------------------- */
/*                                  MUTATIONS                                 */
/* -------------------------------------------------------------------------- */

export const updateProfile = async (
  id: string,
  input: Partial<APIt.Profile>
) => {
  const { data: profiles, error } = await supabaseClient
    .from<APIt.Profile>('profiles')
    .update(input)
    .match({ id });
  if (error) throw error;
  return profiles[0];
};

export const followProfile = async ({
  user_id,
  following_id,
}: ProfileFollowingQueryVariables) => {
  const { data: profiles, error } = await supabaseClient
    .from<APIt.ProfilesFollowers>('profiles_followers')
    .insert({
      user_id,
      following_id,
    }).select(`
      follower:user_id(username),
      following:following_id(username)
    `);
  if (error) throw error;
  return profiles[0];
};

export const unfollowProfile = async ({
  user_id,
  following_id,
}: ProfileFollowingQueryVariables) => {
  const { data: profiles, error } = await supabaseClient
    .from<APIt.ProfilesFollowers>('profiles_followers')
    .delete()
    .match({
      user_id,
      following_id,
    }).select(`
      follower:user_id(username),
      following:following_id(username)
    `);
  if (error) throw error;
  return profiles[0];
};

/* -------------------------------------------------------------------------- */
/*                                 KEY FACTORY                                */
/* -------------------------------------------------------------------------- */

export const profileKeys = {
  all: ['profiles'] as const,
  lists: () => [...profileKeys.all, 'list'] as const,
  list: (params: ListProfilesQueryVariables) =>
    [...profileKeys.lists(), params] as const,
  gets: () => [...profileKeys.all, 'get'] as const,
  get: (username: string) => [...profileKeys.gets(), username] as const,
  getSelf: () => [...profileKeys.all, 'get', '#'] as const,
  getsIsFollowing: () => [...profileKeys.all, 'isFollowing'] as const,
  getIsFollowing: (params: ProfileFollowingQueryVariables) =>
    [...profileKeys.getsIsFollowing(), params] as const,
};

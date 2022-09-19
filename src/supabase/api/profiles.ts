/*
 * queries.ts
 * author: evan kirkiles
 * created on Wed Aug 31 2022
 * 2022 the nobot space,
 */

import { supabaseClient } from '@supabase/auth-helpers-nextjs';
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
    .from<APIt.Profile>('profiles')
    .select(
      `
      *,
      n_papercrafts:papercrafts(count),
      n_builds:builds(count)`
    )
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
  return isAdmin;
};

/**
 * Gets a profile by its username
 * @returns a profile
 */
export const getProfile = async (username: string) => {
  const { data: profiles, error } = await supabaseClient
    .from<APIt.Profile>('profiles')
    .select(
      `
      *,
      n_papercrafts:papercrafts(count),
      n_builds:builds(count),
      n_followers:profiles_followers!profiles_followers_following_id_fkey(count),
      n_following:profiles_followers!profiles_followers_user_id_fkey(count)`
    )
    .eq('username', username);
  if (error) throw error;
  return profiles[0];
};

export type ListProfilesQueryVariables = {
  search?: string;
  show_all?: boolean;
};

/**
 * Lists a bunch of profiles from the database
 * @returns A list of profiles
 */
export const listProfiles = async ({
  search,
  show_all,
}: ListProfilesQueryVariables) => {
  let req = (
    search
      ? supabaseClient.rpc<APIt.Profile>('search_profiles', {
          username_term: search,
        })
      : supabaseClient.from<APIt.Profile>('profiles')
  ).select(`
    *,
    n_papercrafts:papercrafts(count),
    n_builds:builds(count),
    n_followers:profiles_followers!profiles_followers_following_id_fkey(count),
    n_following:profiles_followers!profiles_followers_user_id_fkey(count)`);
  if (!show_all) req = req.filter('created_at', 'not.eq', 'updated_at');
  const { data: profiles, error } = await req.order('created_at', {
    ascending: false,
  });
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
 * @param input
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

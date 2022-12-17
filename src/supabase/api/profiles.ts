/*
 * queries.ts
 * author: evan kirkiles
 * created on Wed Aug 31 2022
 * 2022 the nobot space,
 */

import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import {
  PostgrestFilterBuilder,
  PostgrestQueryBuilder,
} from '@supabase/postgrest-js';
import {
  applyNextPageParam,
  InfiniteQueryFilter,
} from '../../util/getNextPageParam';
import { PAGE_SIZE } from '../../util/getPagination';
import { Database } from '../API';
import * as APIt from '../types';

/* -------------------------------------------------------------------------- */
/*                                   QUERIES                                  */
/* -------------------------------------------------------------------------- */

/**
 *
 * @param id the user's own ID
 * @returns
 */
export const getSelf =
  (supabaseClient: SupabaseClient<Database>) => async (id: string) => {
    const { data: profiles, error } = await supabaseClient
      .from('profiles_view')
      .select('*')
      .eq('id', id);
    if (error) throw error;
    return profiles[0] as APIt.Profile;
  };

/**
 * Get if the current user is an admin
 */
export const getIsAdmin =
  (supabaseClient: SupabaseClient<Database>) => async () => {
    const { data: isAdmin, error } = await supabaseClient.rpc('get_is_admin');
    if (error) throw error;
    return !!isAdmin[0];
  };

/**
 * Gets a profile by its username
 * @returns a profile
 */
export const getProfile =
  (supabaseClient: SupabaseClient<Database>) => async (username: string) => {
    const { data: profiles, error } = await supabaseClient
      .from('profiles_view')
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
export const listProfiles =
  (supabaseClient: SupabaseClient<Database>) =>
  async (
    { search, show_all, filter }: ListProfilesQueryVariables,
    pageParam: number = 0
  ) => {
    let req = (
      search
        ? supabaseClient.rpc('search_profiles', {
            username_term: search,
          })
        : supabaseClient.from('profiles_view')
    ).select(`*`) as PostgrestFilterBuilder<
      Database['public'],
      APIt.Profile,
      APIt.Profile
    >;
    if (!show_all) req = (req as any).filter('is_default', 'eq', 'false');
    // now apply the filters using the next page param
    const { data: profiles, error } = await applyNextPageParam(
      req,
      filter,
      pageParam
    );
    if (error) throw error;
    return {
      data: profiles,
      page: pageParam,
    };
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
export const getIsFollowing =
  (supabaseClient: SupabaseClient<Database>) =>
  async ({ user_id, following_id }: ProfileFollowingQueryVariables) => {
    let req = supabaseClient.from('profiles_followers');
    const { data: profiles, error } = await req
      .select('*')
      .match({ user_id, following_id });
    if (error) throw error;
    return profiles.length > 0;
  };

/* -------------------------------------------------------------------------- */
/*                                  MUTATIONS                                 */
/* -------------------------------------------------------------------------- */

export const updateProfile =
  (supabaseClient: SupabaseClient<Database>) =>
  async (id: string, input: APIt.ProfileInput) => {
    const { data: profile, error } = await supabaseClient
      .from('profiles')
      .update(input)
      .match({ id })
      .select('*')
      .limit(1)
      .single();
    if (error) throw error;
    return profile;
  };

export const followProfile =
  (supabaseClient: SupabaseClient<Database>) =>
  async ({ user_id, following_id }: ProfileFollowingQueryVariables) => {
    const { data: profiles, error } = await supabaseClient
      .from('profiles_followers')
      .insert({
        user_id,
        following_id,
      }).select(`
      follower:user_id(username),
      following:following_id(username)
    `);
    if (error) throw error;
    return profiles[0] as APIt.ProfilesFollowers;
  };

export const unfollowProfile =
  (supabaseClient: SupabaseClient<Database>) =>
  async ({ user_id, following_id }: ProfileFollowingQueryVariables) => {
    const { data: profiles, error } = await supabaseClient
      .from('profiles_followers')
      .delete()
      .match({
        user_id,
        following_id,
      }).select(`
      follower:user_id(username),
      following:following_id(username)
    `);
    if (error) throw error;
    return profiles[0] as APIt.ProfilesFollowers;
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

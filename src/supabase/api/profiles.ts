/*
 * queries.ts
 * author: evan kirkiles
 * created on Wed Aug 31 2022
 * 2022 the nobot space,
 */

import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import * as APIt from "../types";

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
    .from<APIt.Profile>("profiles")
    .select(
      `
      *,
      n_papercrafts:papercrafts(count),
      n_builds:builds(count)`
    )
    .eq("id", id);
  if (error) throw error;
  return profiles[0];
};

/**
 * Gets a profile by its username
 * @returns a profile
 */
export const getProfile = async (username: string) => {
  const { data: profiles, error } = await supabaseClient
    .from<APIt.Profile>("profiles")
    .select(
      `
      *,
      n_papercrafts:papercrafts(count),
      n_builds:builds(count)`
    )
    .eq("username", username);
  if (error) throw error;
  return profiles[0];
};

type ListProfilesQueryVariables = {
  search?: string;
};

/**
 * Lists a bunch of profiles from the database
 * @returns A list of profiles
 */
export const listProfiles = async ({ search }: ListProfilesQueryVariables) => {
  let req = (
    search
      ? supabaseClient.rpc<APIt.Profile>("search_profiles", {
          username_term: search,
        })
      : supabaseClient.from<APIt.Profile>("profiles")
  ).select(`*`);
  const { data: profiles, error } = await req.order("created_at", {
    ascending: false,
  });
  if (error) throw error;
  return profiles;
};

/* -------------------------------------------------------------------------- */
/*                                  MUTATIONS                                 */
/* -------------------------------------------------------------------------- */

export const adminCreateProfile = async () => {};

export const updateProfile = async (
  id: string,
  input: Partial<APIt.Profile>
) => {
  const { data: profiles, error } = await supabaseClient
    .from<APIt.Profile>("profiles")
    .update(input)
    .match({ id });
  if (error) throw error;
  return profiles[0];
};

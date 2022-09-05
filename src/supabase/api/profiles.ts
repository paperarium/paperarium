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
      papercrafts(count),
      builds(count)`
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
      papercrafts(count),
      builds(count)`
    )
    .eq("username", username);
  if (error) throw error;
  return profiles[0];
};

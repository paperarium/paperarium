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
 * Lists the papercrafts from the supabase database.
 * @returns A list of papercrafts
 */
export const listPapercrafts = async () => {
  const { data: papercrafts, error } = await supabaseClient
    .from<APIt.Papercraft>("papercrafts")
    .select(
      `
      *,
      user:profiles(username)
    `
    )
    .order("created_at", { ascending: true });
  if (error) throw error;
  return papercrafts;
};

/**
 * Searches papercrafts from the supabase database by title keywords.
 * @returns A list of papercrafts
 */
export const searchPapercrafts = async (search: string) => {
  const { data: papercrafts, error } = await supabaseClient
    .from<APIt.Papercraft>("papercrafts")
    .select(
      `
      *,
      user:profiles(username)
    `
    )
    .order("created_at", { ascending: true });
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
    .from<APIt.Papercraft>("papercrafts")
    .insert(input);
  if (error) throw error;
  return papercrafts;
};

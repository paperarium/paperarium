/*
 * queries.ts
 * author: evan kirkiles
 * created on Wed Aug 31 2022
 * 2022 the nobot space,
 */

import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import * as APIt from "../types";

/* -------------------------------------------------------------------------- */
/*                                  MUTATIONS                                 */
/* -------------------------------------------------------------------------- */

/**
 * Creates papercrafts tags join entry in the supabase database.
 * @param input
 * @returns
 */
export const createPapercraftsTags = async (
  input: APIt.PapercraftsTagsInput | APIt.PapercraftsTagsInput[]
) => {
  const { data: papercraftsTags, error } = await supabaseClient
    .from<APIt.PapercraftsTags>("papercrafts_tags")
    .insert(input);
  if (error) throw error;
  return papercraftsTags;
};

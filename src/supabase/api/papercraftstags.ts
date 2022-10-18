/*
 * queries.ts
 * author: evan kirkiles
 * created on Wed Aug 31 2022
 * 2022 the nobot space,
 */

import { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../API';
import * as APIt from '../types';

/* -------------------------------------------------------------------------- */
/*                                  MUTATIONS                                 */
/* -------------------------------------------------------------------------- */

/**
 * Creates papercrafts tags join entry in the supabase database.
 * @param input
 * @returns
 */
export const createPapercraftsTags =
  (supabaseClient: SupabaseClient<Database>) =>
  async (input: APIt.PapercraftsTagsInput | APIt.PapercraftsTagsInput[]) => {
    const { data: papercraftsTags, error } = await supabaseClient
      .from('papercrafts_tags')
      .insert(input);
    if (error) throw error;
    return papercraftsTags;
  };

/**
 * Deletes papercrafts tags join entry in the supabase database.
 * @param input
 * @returns
 */
export const deletePapercraftsTags =
  (supabaseClient: SupabaseClient<Database>) =>
  async (papercraft_id: string, tag_id: number) => {
    const { data: papercraftsTags, error } = await supabaseClient
      .from('papercrafts_tags')
      .delete()
      .match({ papercraft_id, tag_id });
    if (error) throw error;
    return papercraftsTags;
  };

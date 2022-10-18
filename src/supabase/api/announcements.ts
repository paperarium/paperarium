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
export const listAnnouncements =
  (supabaseClient: SupabaseClient<Database>) => async () => {
    const { data: announcements, error } = await supabaseClient
      .from('announcements')
      .select('*')
      .eq('active', true);
    if (error) throw error;
    return announcements;
  };

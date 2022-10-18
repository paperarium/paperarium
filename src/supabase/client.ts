/*
 * client.ts
 * author: evan kirkiles
 * created on Tue Oct 18 2022
 * 2022 the nobot space,
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from './API';

const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default supabaseClient;

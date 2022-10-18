/*
 * getPublicUrl.ts
 * author: evan kirkiles
 * created on Sun Sep 04 2022
 * 2022 the nobot space,
 */

import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Gets the public URL from an encoded key of a supabase storage object.
 * @param url of the format <BUCKET>/<KEY>
 * @returns a public URL for the blob
 */
export default function getPublicUrl(
  supabaseClient: SupabaseClient,
  url: string
) {
  const split = url.split('/');
  const bucket = split.shift();
  return supabaseClient.storage.from(bucket!).getPublicUrl(split.join('/'))
    .data!.publicUrl;
}

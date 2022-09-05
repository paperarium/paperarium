/*
 * uploadFile.ts
 * author: evan kirkiles
 * created on Mon Sep 05 2022
 * 2022 the nobot space,
 */
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

export const uploadFile = async (key: string, i_file: File) => {
  const { data, error } = await supabaseClient.storage
    .from("papercraftplace")
    .upload(key, i_file, {
      cacheControl: "3600",
      upsert: true,
    });
  if (error) throw error;
  if (!data) throw `no key when uploading file ${key}`;
  return data?.Key;
};

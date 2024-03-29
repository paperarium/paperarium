/*
 * uploadFile.ts
 * author: evan kirkiles
 * created on Mon Sep 05 2022
 * 2022 the nobot space,
 */
import { SupabaseClient } from '@supabase/supabase-js';
import * as APIt from '../supabase/types';
import getImageDimensions from './getImageDimensions';

export const uploadImageFile = async (
  supabaseClient: SupabaseClient,
  key: string,
  i_file: File
) => {
  const uploadReq = supabaseClient.storage
    .from('papercraftplace')
    .upload(key, i_file, {
      cacheControl: '3600',
      upsert: true,
    });
  const { width, height } = await getImageDimensions(
    URL.createObjectURL(i_file)
  );
  const { data, error } = await uploadReq;
  if (error) throw error;
  if (!data) throw `no key when uploading file ${key}`;
  return {
    key: `papercraftplace/${data.path}`,
    width,
    height,
  } as APIt.Picture;
};

export const uploadFile = async (
  supabaseClient: SupabaseClient,
  key: string,
  i_file: File
) => {
  const { data, error } = await supabaseClient.storage
    .from('papercraftplace')
    .upload(key, i_file, {
      cacheControl: '3600',
      upsert: true,
    });
  if (error) throw error;
  if (!data) throw `no key when uploading file ${key}`;
  return `papercraftplace/${data.path}`;
};

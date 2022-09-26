/*
 * getPagination.ts
 * author: evan kirkiles
 * created on Mon Sep 26 2022
 * 2022 the nobot space,
 */

export const PAGE_SIZE = 20;

// https://github.com/supabase/supabase/discussions/1223
export const getPagination = (page: number, size: number = PAGE_SIZE) => {
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;

  return { from, to };
};

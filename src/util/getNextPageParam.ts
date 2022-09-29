/*
 * getNextPageParam.ts
 * author: evan kirkiles
 * created on Mon Sep 26 2022
 * 2022 the nobot space,
 */

import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { PAGE_SIZE } from './getPagination';
export const ROW_PAGE_SIZE = 40;
export const CARD_PAGE_SIZE = PAGE_SIZE;

export type InfiniteQueryFilter<T extends object> = {
  filter?: {
    column: keyof T;
    ascending: boolean;
  };
};

export default function getNextPageParam<
  T extends object & { created_at: string }
>(params: InfiniteQueryFilter<T>, page_size: number = PAGE_SIZE) {
  return (lastPage: T[]) =>
    lastPage.length === page_size
      ? lastPage[lastPage.length - 1][params.filter?.column ?? 'created_at']
      : undefined;
}

export function applyNextPageParam<T extends { created_at: string }>(
  req: PostgrestFilterBuilder<T>,
  filter?: InfiniteQueryFilter<T>['filter'],
  pageParam: string | number | null = null,
  page_size: number = PAGE_SIZE
) {
  if (filter) {
    if (pageParam !== null) {
      req = req[filter.ascending ? 'gt' : 'lt'](
        filter.column,
        pageParam as T[keyof T]
      );
    }
    req = req.order(filter.column, { ascending: filter.ascending });
  } else if (pageParam !== null) {
    req = req.lt('created_at', pageParam as T[keyof T]);
  }
  return req.order('created_at', { ascending: false }).limit(page_size);
}

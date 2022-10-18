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

export type InfiniteQueryFilter<T extends Record<string, unknown>> = {
  search?: string;
  filter?: {
    column: string & keyof T;
    ascending: boolean;
  };
};

export type InfiniteQueryPage<T extends Record<string, unknown>> = {
  data: T[];
  page: number;
};

export default function getNextPageParam<T extends Record<string, unknown>>(
  params: InfiniteQueryFilter<T>,
  page_size: number = PAGE_SIZE
) {
  return (lastPage: InfiniteQueryPage<T>) =>
    lastPage.data.length === page_size ? lastPage.page + 1 : undefined;
}

export function applyNextPageParam<T extends Record<string, unknown>>(
  req: PostgrestFilterBuilder<T, T>,
  filter?: InfiniteQueryFilter<T>['filter'],
  pageParam: number | null = 0,
  page_size: number = PAGE_SIZE
) {
  if (filter) req = req.order(filter.column, { ascending: filter.ascending });
  req = req.order('created_at', { ascending: false });
  if (pageParam !== null)
    req = req.range(pageParam * page_size, (pageParam + 1) * page_size);
  return req;
}

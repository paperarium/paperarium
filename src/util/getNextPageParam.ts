/*
 * getNextPageParam.ts
 * author: evan kirkiles
 * created on Mon Sep 26 2022
 * 2022 the nobot space,
 */

import { PAGE_SIZE } from './getPagination';
export const ROW_PAGE_SIZE = 40;
export const CARD_PAGE_SIZE = PAGE_SIZE;

export type InfiniteQueryFilter<T extends object> = {
  filter?: {
    column: keyof T;
    ascending: boolean;
  };
};

export default function getNextPageParam<T extends object>(
  params: InfiniteQueryFilter<T>,
  page_size: number = PAGE_SIZE
) {
  return (lastPage: any[]) =>
    lastPage.length === page_size
      ? lastPage[lastPage.length - 1][params.filter?.column ?? 'created_at']
      : null;
}

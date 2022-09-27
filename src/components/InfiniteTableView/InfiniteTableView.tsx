/*
 * InfiniteTableView.tsx
 * author: evan kirkiles
 * created on Mon Sep 26 2022
 * 2022 the nobot space,
 */
import React from 'react';
import s from './InfiniteTableView.module.scss';

export type InfiniteTableHeaderProps<T extends { id: any }> = {
  onColumnClick: (column: keyof T) => void;
};

export type InfiniteTableRowProps<T extends { id: any }> = {
  content: T;
};

type InfiniteTableViewProps<T extends { id: any }> = {
  pages?: T[][];
  HeaderComponent: React.FC<InfiniteTableHeaderProps<T>>;
  RowComponent: React.FC<InfiniteTableRowProps<T>>;
  onColumnClick: (column: keyof T) => void;
};

const InfiniteTableView = React.memo(function InfiniteTableView<
  T extends { id: string | number }
>({
  pages,
  HeaderComponent,
  RowComponent,
  onColumnClick,
}: InfiniteTableViewProps<T>) {
  return (
    <table className={s.main_grid}>
      <thead className={s.grid_header}>
        <HeaderComponent onColumnClick={onColumnClick} />
      </thead>
      <tbody>
        {pages
          ? pages.flatMap((page) =>
              page.map((entity) => (
                <RowComponent content={entity} key={entity.id} />
              ))
            )
          : null}
      </tbody>
    </table>
  );
});

export default InfiniteTableView;

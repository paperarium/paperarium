/*
 * InfiniteTableView.tsx
 * author: evan kirkiles
 * created on Mon Sep 26 2022
 * 2022 the nobot space,
 */
import Link from 'next/link';
import React, { HTMLAttributes } from 'react';
import * as APIt from '../../supabase/types';
import { EBuildable, ECommunity } from '../../util/enums';
import { InfiniteQueryPage } from '../../util/getNextPageParam';
import { FIELD_ICONS } from '../../util/icons';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
import BuildTitle from '../ResourceTitle/BuildTitle';
import PapercraftTitle from '../ResourceTitle/PapercraftTitle';
import s from './InfiniteTableView.module.scss';

/* -------------------------------------------------------------------------- */
/*                             MAIN TABLE DISPLAYS                            */
/* -------------------------------------------------------------------------- */

type RowProps<T> = {
  entity: T;
  onClick?: (arg0: T) => void;
  columns: (keyof T)[];
};

const PapercraftRow: React.FC<RowProps<APIt.Papercraft>> =
  function PapercraftRow({ entity: papercraft, onClick, columns }) {
    const wrapper = (rest: React.ReactNode) =>
      !!onClick ? (
        rest
      ) : (
        <Link href={`/papercrafts/${papercraft.id}`} prefetch={false}>
          {rest}
        </Link>
      );
    return (
      <>
        {wrapper(
          <tr
            className={s.grid_row}
            onClick={(e) => {
              if (onClick) {
                e.stopPropagation();
                e.preventDefault();
                onClick(papercraft);
              }
            }}
          >
            <td className={s.grid_cell} style={{ width: '100%' }}>
              <div className={s.profile_cell}>
                <div className={s.result_pic} style={{ borderRadius: '3px' }}>
                  <OptimizedImage
                    src={papercraft.pictures[0].key}
                    className={s.inner_image}
                    dimensions={{
                      width: papercraft.pictures[0].width,
                      height: papercraft.pictures[0].height,
                    }}
                    sizes={`20px`}
                  />
                </div>
                <PapercraftTitle
                  papercraft={papercraft}
                  style={onClick ? { pointerEvents: 'none' } : undefined}
                />
              </div>
            </td>
            {columns.map((col) => (
              <td key={col} className={s.grid_cell}>
                {papercraft[col] as number}
              </td>
            ))}
          </tr>
        )}
      </>
    );
  };

const BuildRow: React.FC<RowProps<APIt.Build>> = function BuildRow({
  entity: build,
  columns,
  onClick,
}) {
  const wrapper = (rest: React.ReactNode) =>
    !!onClick ? (
      rest
    ) : (
      <Link
        href={`/papercrafts/${build.papercraft_id}?build=${build.id}`}
        prefetch={false}
      >
        {rest}
      </Link>
    );
  return (
    <>
      {wrapper(
        <tr
          className={s.grid_row}
          onClick={(e) => {
            if (onClick) {
              e.stopPropagation();
              e.preventDefault();
              onClick(build);
            }
          }}
        >
          <td className={s.grid_cell} style={{ width: '100%' }}>
            <div className={s.profile_cell}>
              <div className={s.result_pic} style={{ borderRadius: '3px' }}>
                <OptimizedImage
                  src={build.pictures[0].key}
                  className={s.inner_image}
                  dimensions={{
                    width: build.pictures[0].width,
                    height: build.pictures[0].height,
                  }}
                  sizes={`20px`}
                />
              </div>
              <BuildTitle
                build={build}
                style={onClick ? { pointerEvents: 'none' } : undefined}
              />
            </div>
          </td>
          {columns.map((col) => (
            <td key={col} className={s.grid_cell}>
              {build[col] as number}
            </td>
          ))}
        </tr>
      )}
    </>
  );
};

const ProfileRow: React.FC<RowProps<APIt.Profile>> = function ProfileRow({
  entity: profile,
  columns,
  onClick,
}) {
  const wrapper = (rest: React.ReactNode) =>
    !!onClick ? (
      rest
    ) : (
      <Link href={`/profiles/${profile.username}`} prefetch={false}>
        {rest}
      </Link>
    );
  return (
    <>
      {wrapper(
        <tr
          className={s.grid_row}
          onClick={(e) => {
            if (onClick) {
              e.stopPropagation();
              e.preventDefault();
              onClick(profile);
            }
          }}
        >
          <td className={s.grid_cell} style={{ width: '100%' }}>
            <div className={s.profile_cell}>
              <div className={s.result_pic}>
                <OptimizedImage
                  src={profile.avatar_url || undefined}
                  className={s.inner_image}
                  sizes={`20px`}
                />
              </div>
              {profile.name}
              <br />
              <div className={s.result_username}>@{profile.username}</div>
            </div>
          </td>
          {columns.map((col) => (
            <td key={col} className={s.grid_cell}>
              {profile[col]}
            </td>
          ))}
        </tr>
      )}
    </>
  );
};

const CollectiveRow: React.FC<RowProps<APIt.Collective>> =
  function CollectiveRow({ entity: collective, columns, onClick }) {
    const wrapper = (rest: React.ReactNode) =>
      !!onClick ? (
        rest
      ) : (
        <Link href={`/collectives/${collective.titlecode}`} prefetch={false}>
          {rest}
        </Link>
      );
    return (
      <>
        {wrapper(
          <tr
            className={s.grid_row}
            onClick={(e) => {
              if (onClick) {
                e.stopPropagation();
                e.preventDefault();
                onClick(collective);
              }
            }}
          >
            <td className={s.grid_cell} style={{ width: '100%' }}>
              <div className={s.profile_cell}>
                <div className={s.result_pic}>
                  <OptimizedImage
                    src={collective.avatar_url || undefined}
                    className={s.inner_image}
                    sizes={`20px`}
                  />
                </div>
                {collective.title}
                <br />
                <div className={s.result_username}>@{collective.titlecode}</div>
              </div>
            </td>
            {columns.map((col) => (
              <td key={col} className={s.grid_cell}>
                {collective[col]}
              </td>
            ))}
          </tr>
        )}
      </>
    );
  };

/* -------------------------------------------------------------------------- */
/*                                  GENERICS                                  */
/* -------------------------------------------------------------------------- */

const TableMap: {
  [key in EBuildable | ECommunity]: {
    Main: React.FC<RowProps<any>>;
    cols: string[];
  };
} = {
  [EBuildable.Papercraft]: {
    Main: PapercraftRow,
    cols: ['n_likes', 'n_builds'],
  },
  [EBuildable.Build]: {
    Main: BuildRow,
    cols: ['n_likes'],
  },
  [ECommunity.Collective]: {
    Main: CollectiveRow,
    cols: ['n_members', 'n_papercrafts', 'n_builds', 'n_followers'],
  },
  [ECommunity.Profile]: {
    Main: ProfileRow,
    cols: ['n_papercrafts', 'n_builds', 'n_followers', 'n_following'],
  },
};

export type InfiniteTableHeaderProps<T extends { id: any }> = {
  title: string;
  columns?: (keyof T)[];
  onColumnClick: (column: keyof T) => void;
};

export type InfiniteTableRowProps<T extends { id: any }> = {
  content: T;
  columns?: (keyof T)[];
};

type InfiniteTableViewProps<T extends { id: any }> = {
  type: EBuildable | ECommunity;
  pages?: InfiniteQueryPage<T>[];
  columns?: (keyof T)[];
  onColumnClick: (column: keyof T) => void;
  onCellClick?: (cell: T) => void;
  headerStyle?: HTMLAttributes<HTMLTableSectionElement>['style'];
};

const InfiniteTableView = React.memo(function InfiniteTableView<
  T extends { id: string | number }
>({
  type,
  pages,
  columns,
  onColumnClick,
  onCellClick,
  headerStyle,
}: InfiniteTableViewProps<T>) {
  // if columns is not set, use all columns
  const cols = columns ?? (TableMap[type].cols as (keyof T)[]);
  const ViewComponent = TableMap[type].Main;

  return (
    <table className={s.main_grid}>
      <thead className={s.grid_header} style={headerStyle}>
        <tr>
          <th>{type}</th>
          {cols.map((col) => (
            <th
              key={col as string}
              className={s.sortable_header}
              onClick={() => onColumnClick(col)}
            >
              {FIELD_ICONS[col]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {pages
          ? pages.flatMap((page) =>
              page.data.map((entity) => (
                <ViewComponent
                  entity={entity}
                  key={entity.id}
                  columns={cols}
                  onClick={onCellClick}
                />
              ))
            )
          : null}
      </tbody>
    </table>
  );
});

export default InfiniteTableView;

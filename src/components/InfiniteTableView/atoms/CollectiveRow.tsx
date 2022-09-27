/*
 * CollectiveRow.tsx
 * author: evan kirkiles
 * created on Sun Sep 25 2022
 * 2022 the nobot space,
 */

import Link from 'next/link';
import React from 'react';
import {
  IoCubeOutline,
  IoPeopleOutline,
  IoShapesOutline,
} from 'react-icons/io5';
import { RiUserReceivedLine, RiUserSharedLine } from 'react-icons/ri';
import * as APIt from '../../../supabase/types';
import OptimizedImage from '../../OptimizedImage/OptimizedImage';
import {
  InfiniteTableHeaderProps,
  InfiniteTableRowProps,
} from '../InfiniteTableView';
import s from './InfiniteTableRow.module.scss';

export const CollectiveHeaderRow: React.FC<
  InfiniteTableHeaderProps<APIt.Collective>
> = React.memo(function CollectiveHeaderRow({ onColumnClick }) {
  return (
    <tr>
      <th>Collective</th>
      <th
        className={s.sortable_header}
        onClick={() => onColumnClick('n_members')}
      >
        <IoPeopleOutline />
      </th>
      <th
        className={s.sortable_header}
        onClick={() => onColumnClick('n_papercrafts')}
      >
        <IoShapesOutline />
      </th>
      <th
        className={s.sortable_header}
        onClick={() => onColumnClick('n_builds')}
      >
        <IoCubeOutline />
      </th>
      <th
        className={s.sortable_header}
        onClick={() => onColumnClick('n_followers')}
      >
        <RiUserReceivedLine />
      </th>
    </tr>
  );
});

export const CollectiveRow: React.FC<InfiniteTableRowProps<APIt.Collective>> =
  React.memo(function CollectiveRow({ content: collective }) {
    return (
      <Link href={`/collectives/${collective.titlecode}`} prefetch={false}>
        <tr className={s.grid_row}>
          <td className={s.grid_cell} style={{ width: '100%' }}>
            <div className={s.profile_cell}>
              <div className={s.result_pic}>
                <OptimizedImage
                  src={collective.avatar_url}
                  className={s.inner_image}
                  sizes={`20px`}
                />
              </div>
              {collective.title}
              <br />
              <div className={s.result_username}>@{collective.titlecode}</div>
            </div>
          </td>
          <td className={s.grid_cell}>{collective.n_members}</td>
          <td className={s.grid_cell}>{collective.n_papercrafts}</td>
          <td className={s.grid_cell}>{collective.n_builds}</td>
          <td className={s.grid_cell}>{collective.n_followers}</td>
        </tr>
      </Link>
    );
  });

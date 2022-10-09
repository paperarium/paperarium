/*
 * PapercraftRow.tsx
 * author: evan kirkiles
 * created on Sun Sep 25 2022
 * 2022 the nobot space,
 */

import Link from 'next/link';
import React from 'react';
import {
  IoCubeOutline,
  IoHeartOutline,
  IoShapesOutline,
} from 'react-icons/io5';
import { RiUserReceivedLine, RiUserSharedLine } from 'react-icons/ri';
import * as APIt from '../../../supabase/types';
import OptimizedImage from '../../OptimizedImage/OptimizedImage';
import PapercraftTitle from '../../ResourceTitle/PapercraftTitle';
import {
  InfiniteTableHeaderProps,
  InfiniteTableRowProps,
} from '../InfiniteTableView';
import s from './InfiniteTableRow.module.scss';

export const PapercraftHeaderRow: React.FC<
  InfiniteTableHeaderProps<APIt.Papercraft>
> = React.memo(function PapercraftHeaderRow({ onColumnClick }) {
  return (
    <tr>
      <th>Papercraft</th>
      <th
        className={s.sortable_header}
        onClick={() => onColumnClick('n_likes')}
      >
        <IoHeartOutline />
      </th>
      <th
        className={s.sortable_header}
        onClick={() => onColumnClick('n_builds')}
      >
        <IoShapesOutline />
      </th>
    </tr>
  );
});

export const PapercraftRow: React.FC<InfiniteTableRowProps<APIt.Papercraft>> =
  React.memo(function PapercraftRow({ content: papercraft }) {
    return (
      <Link href={`/papercrafts/${papercraft.id}`} prefetch={false}>
        <tr className={s.grid_row}>
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
              <PapercraftTitle papercraft={papercraft} />
            </div>
          </td>
          <td className={s.grid_cell}>{papercraft.n_likes}</td>
          <td className={s.grid_cell}>{papercraft.n_builds}</td>
        </tr>
      </Link>
    );
  });

/*
 * BuildRow.tsx
 * author: evan kirkiles
 * created on Sun Sep 25 2022
 * 2022 the nobot space,
 */

import Link from 'next/link';
import React from 'react';
import { IoHeartOutline } from 'react-icons/io5';
import * as APIt from '../../../supabase/types';
import OptimizedImage from '../../OptimizedImage/OptimizedImage';
import BuildTitle from '../../ResourceTitle/BuildTitle';
import {
  InfiniteTableHeaderProps,
  InfiniteTableRowProps,
} from '../InfiniteTableView';
import s from './InfiniteTableRow.module.scss';

export const BuildHeaderRow: React.FC<
  InfiniteTableHeaderProps<APIt.Papercraft>
> = React.memo(function PapercraftHeaderRow({ onColumnClick }) {
  return (
    <tr>
      <th>Build</th>
      <th
        className={s.sortable_header}
        onClick={() => onColumnClick('n_likes')}
      >
        <IoHeartOutline />
      </th>
    </tr>
  );
});

export const BuildRow: React.FC<InfiniteTableRowProps<APIt.Build>> = React.memo(
  function BuildRow({ content: build }) {
    return (
      <Link
        href={`/papercrafts/${build.papercraft_id}?build=${build.id}`}
        prefetch={false}
      >
        <tr className={s.grid_row}>
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
              <BuildTitle build={build} />
            </div>
          </td>
          <td className={s.grid_cell}>{build.n_likes}</td>
        </tr>
      </Link>
    );
  }
);

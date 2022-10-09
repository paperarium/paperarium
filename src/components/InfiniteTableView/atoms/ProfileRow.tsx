/*
 * ProfileRow.tsx
 * author: evan kirkiles
 * created on Sun Sep 25 2022
 * 2022 the nobot space,
 */

import Link from 'next/link';
import React from 'react';
import { IoCubeOutline, IoShapesOutline } from 'react-icons/io5';
import { RiUserReceivedLine, RiUserSharedLine } from 'react-icons/ri';
import * as APIt from '../../../supabase/types';
import OptimizedImage from '../../OptimizedImage/OptimizedImage';
import {
  InfiniteTableHeaderProps,
  InfiniteTableRowProps,
} from '../InfiniteTableView';
import s from './InfiniteTableRow.module.scss';

const ProfileColumns: { [key in keyof APIt.Profile]?: JSX.Element } = {
  n_papercrafts: <IoShapesOutline />,
  n_builds: <IoCubeOutline />,
  n_followers: <RiUserReceivedLine />,
  n_following: <RiUserSharedLine />,
};

export const ProfileHeaderRow: React.FC<
  InfiniteTableHeaderProps<APIt.Profile>
> = React.memo(function ProfileHeaderRow({ onColumnClick, columns }) {
  const columnNames = columns || Object.keys(ProfileColumns);

  return (
    <tr>
      <th>Profile</th>
      {(columns as (keyof APIt.Profile)[]).map((col) => (
        <th
          key={col}
          className={s.sortable_header}
          onClick={() => onColumnClick(col)}
        >
          {ProfileColumns[col]}
        </th>
      ))}
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
      <th
        className={s.sortable_header}
        onClick={() => onColumnClick('n_following')}
      >
        <RiUserSharedLine />
      </th>
    </tr>
  );
});

export const ProfileRow: React.FC<InfiniteTableRowProps<APIt.Profile>> =
  React.memo(function ProfileRow({ content: profile }) {
    return (
      <Link href={`/profiles/${profile.username}`} prefetch={false}>
        <tr className={s.grid_row}>
          <td className={s.grid_cell} style={{ width: '100%' }}>
            <div className={s.profile_cell}>
              <div className={s.result_pic}>
                <OptimizedImage
                  src={profile.avatar_url}
                  className={s.inner_image}
                  sizes={`20px`}
                />
              </div>
              {profile.name}
              <br />
              <div className={s.result_username}>@{profile.username}</div>
            </div>
          </td>
          <td className={s.grid_cell}>{profile.n_papercrafts}</td>
          <td className={s.grid_cell}>{profile.n_builds}</td>
          <td className={s.grid_cell}>{profile.n_followers}</td>
          <td className={s.grid_cell}>{profile.n_following}</td>
        </tr>
      </Link>
    );
  });

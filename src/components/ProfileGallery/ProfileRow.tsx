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
import * as APIt from '../../supabase/types';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
import s from './ProfileGallery.module.scss';

type ProfileRowProps = {
  profile: APIt.Profile;
};

export const ProfileHeaderRow: React.FC<{}> = React.memo(
  function ProfileHeaderRow() {
    return (
      <tr>
        <th>Profile</th>
        <th>
          <IoShapesOutline />
        </th>
        <th>
          <IoCubeOutline />
        </th>
        <th>
          <RiUserReceivedLine />
        </th>
        <th>
          <RiUserSharedLine />
        </th>
      </tr>
    );
  }
);

export const ProfileRow: React.FC<ProfileRowProps> = React.memo(
  function ProfileRow({ profile }) {
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
  }
);

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
import * as APIt from '../../supabase/types';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
import s from './ProfileGallery.module.scss';

type CollectiveRowProps = {
  collective: APIt.Collective;
};

export const CollectiveHeaderRow: React.FC<{}> = React.memo(
  function CollectiveHeaderRow() {
    return (
      <tr>
        <th>Collective</th>
        <th>
          <IoPeopleOutline />
        </th>
        <th>
          <IoShapesOutline />
        </th>
        <th>
          <IoCubeOutline />
        </th>
        <th>
          <RiUserReceivedLine />
        </th>
      </tr>
    );
  }
);

export const CollectiveRow: React.FC<CollectiveRowProps> = React.memo(
  function CollectiveRow({ collective }) {
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
  }
);

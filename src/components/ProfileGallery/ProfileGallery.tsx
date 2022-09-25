/*
 * ProfileGallery.tsx
 * author: evan kirkiles
 * created on Tue Sep 20 2022
 * 2022 the nobot space,
 */

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import {
  IoCubeOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoShapesOutline,
} from 'react-icons/io5';
import { MdOutlineTableRows } from 'react-icons/md';
import { RiUserReceivedLine, RiUserSharedLine } from 'react-icons/ri';
import {
  collectiveKeys,
  listCollectives,
} from '../../supabase/api/collectives';
import {
  listProfiles,
  ListProfilesQueryVariables,
  profileKeys,
} from '../../supabase/api/profiles';
import * as APIt from '../../supabase/types';
import FilterBarProfile from '../FilterBar/FilterBarProfile';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
import s from './ProfileGallery.module.scss';

type ProfileGalleryProps = {
  children?: React.ReactNode;
  disabled?: boolean;
};

export enum CommunityEntityType {
  Profiles = 'profiles',
  Collectives = 'collectives',
}

type CommunityEntityMeta = {
  icon: JSX.Element;
  query: typeof listProfiles | typeof listCollectives;
  keys: typeof profileKeys | typeof collectiveKeys;
};

const ENTITY_MAP: { [key in CommunityEntityType]: CommunityEntityMeta } = {
  [CommunityEntityType.Profiles]: {
    icon: <IoPersonOutline />,
    query: listProfiles,
    keys: collectiveKeys,
  },
  [CommunityEntityType.Collectives]: {
    icon: <IoPeopleOutline />,
    query: listCollectives,
    keys: collectiveKeys,
  },
};

const ProfileGallery: React.FC<ProfileGalleryProps> = function ProfileGallery({
  children,
  disabled,
}) {
  // the default entity type in the
  const [entityType, setEntityType] = useState<CommunityEntityType>(
    CommunityEntityType.Profiles
  );
  // search information
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const params: ListProfilesQueryVariables = {
    search: currentSearch,
    filter: {
      n_papercrafts: { ascending: false },
    },
  };
  const entities = useQuery<APIt.Profile[] | APIt.Collective[]>(
    ENTITY_MAP[entityType].keys.list(params),
    () => ENTITY_MAP[entityType].query(params),
    { enabled: !disabled }
  );

  return (
    <div className={s.meta_container}>
      <div className={s.sidebar}>
        {Object.entries(ENTITY_MAP).map(([key, { icon }]) => (
          <div
            className={`${s.layout_type} ${entityType === key ? 'active' : ''}`}
            key={key}
            onClick={() => setEntityType(key as CommunityEntityType)}
          >
            {key} {icon}
          </div>
        ))}
        <div className={`${s.layout_button} active`}>
          <MdOutlineTableRows />
        </div>
      </div>
      <div className={s.container}>
        <FilterBarProfile
          currentSearch={currentSearch}
          submitSearch={setCurrentSearch}
        />
        <div className={s.lower_container}>
          <table className={s.main_grid}>
            <thead className={s.grid_header}>
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
            </thead>
            <tbody>
              {entities.data
                ? (entities.data as APIt.Profile[]).map((entity) => (
                    <Link href={`/profiles/${entity.username}`} key={entity.id}>
                      <tr className={s.grid_row}>
                        <td className={s.grid_cell} style={{ width: '100%' }}>
                          <div className={s.profile_cell}>
                            <div className={s.result_pic}>
                              <OptimizedImage
                                src={entity.avatar_url}
                                className={s.inner_image}
                                sizes={`20px`}
                              />
                            </div>
                            {entity.name}
                            <br />
                            <div className={s.result_username}>
                              @{entity.username}
                            </div>
                          </div>
                        </td>
                        <td className={s.grid_cell}>{entity.n_papercrafts}</td>
                        <td className={s.grid_cell}>{entity.n_builds}</td>
                        <td className={s.grid_cell}>{entity.n_followers}</td>
                        <td className={s.grid_cell}>{entity.n_following}</td>
                      </tr>
                    </Link>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfileGallery;

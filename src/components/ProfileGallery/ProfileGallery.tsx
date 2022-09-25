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
import { CollectiveHeaderRow, CollectiveRow } from './CollectiveRow';
import s from './ProfileGallery.module.scss';
import { ProfileHeaderRow, ProfileRow } from './ProfileRow';

export enum CommunityEntityType {
  Profiles = 'profiles',
  Collectives = 'collectives',
}

type ProfileGalleryProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  displays: CommunityEntityType[];
};

type CommunityEntityMeta = {
  icon: JSX.Element;
  query: typeof listProfiles | typeof listCollectives;
  keys: typeof profileKeys | typeof collectiveKeys;
};

const ENTITY_MAP: { [key in CommunityEntityType]: CommunityEntityMeta } = {
  [CommunityEntityType.Profiles]: {
    icon: <IoPersonOutline />,
    query: listProfiles,
    keys: profileKeys,
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
  displays,
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
        {displays.map((key) => (
          <div
            className={`${s.layout_type} ${entityType === key ? 'active' : ''}`}
            key={key}
            onClick={() => setEntityType(key as CommunityEntityType)}
          >
            {key} {ENTITY_MAP[key].icon}
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
              {entityType === CommunityEntityType.Collectives ? (
                <CollectiveHeaderRow />
              ) : (
                <ProfileHeaderRow />
              )}
            </thead>
            <tbody>
              {entities.data && !entities.isFetching
                ? entityType === CommunityEntityType.Collectives
                  ? (entities.data as APIt.Collective[]).map((entity) => (
                      <CollectiveRow collective={entity} key={entity.id} />
                    ))
                  : (entities.data as APIt.Profile[]).map((entity) => (
                      <ProfileRow profile={entity} key={entity.id} />
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

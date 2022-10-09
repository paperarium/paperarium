/*
 * ProfileGallery.tsx
 * author: evan kirkiles
 * created on Tue Sep 20 2022
 * 2022 the nobot space,
 */

import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { IoPeopleOutline, IoPersonOutline } from 'react-icons/io5';
import { MdOutlineTableRows } from 'react-icons/md';
import InfiniteScroll from 'react-infinite-scroller';
import {
  collectiveKeys,
  listCollectives,
  ListCollectivesQueryVariables,
} from '../../supabase/api/collectives';
import {
  listProfiles,
  ListProfilesQueryVariables,
  profileKeys,
} from '../../supabase/api/profiles';
import * as APIt from '../../supabase/types';
import getNextPageParam from '../../util/getNextPageParam';
import { PAGE_SIZE } from '../../util/getPagination';
import FilterBarProfile from '../FilterBar/FilterBarProfile';
import {
  CollectiveHeaderRow,
  CollectiveRow,
} from '../InfiniteTableView/atoms/CollectiveRow';
import s from './ProfileGallery.module.scss';
import {
  ProfileHeaderRow,
  ProfileRow,
} from '../InfiniteTableView/atoms/ProfileRow';
import InfiniteTableView from '../InfiniteTableView/InfiniteTableView';
import { CgSpinnerTwoAlt } from 'react-icons/cg';

export enum CommunityEntityType {
  Profiles = 'profiles',
  Collectives = 'collectives',
}

type ProfileGalleryProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  displays: CommunityEntityType[];
};

const ENTITY_ICONS: { [key in CommunityEntityType]: JSX.Element } = {
  [CommunityEntityType.Profiles]: <IoPersonOutline />,
  [CommunityEntityType.Collectives]: <IoPeopleOutline />,
};

const ProfileGallery: React.FC<ProfileGalleryProps> = function ProfileGallery({
  disabled,
  displays,
}) {
  // the default entity type in the
  const [entityType, setEntityType] = useState<CommunityEntityType>(
    CommunityEntityType.Profiles
  );
  // search information
  const [currentSearch, setCurrentSearch] = useState<string>('');
  // same params used across queries
  const [profileParams, setProfileParams] =
    useState<ListProfilesQueryVariables>({
      search: currentSearch,
      filter: {
        column: 'n_papercrafts',
        ascending: false,
      },
    });
  const [collectivesParams, setCollectiveParams] =
    useState<ListCollectivesQueryVariables>({
      search: currentSearch,
      filter: {
        column: 'n_members',
        ascending: false,
      },
    });

  // maintain two infinite queries, one for papercrafts and one for builds
  const profilesQuery = useInfiniteQuery<APIt.Profile[]>(
    profileKeys.list(profileParams),
    ({ pageParam = null }) => listProfiles(profileParams, pageParam),
    {
      enabled: !disabled && entityType === CommunityEntityType.Profiles,
      getNextPageParam: getNextPageParam(profileParams),
      keepPreviousData: true,
    }
  );
  const collectivesQuery = useInfiniteQuery<APIt.Collective[]>(
    collectiveKeys.list(collectivesParams),
    ({ pageParam = null }) => listCollectives(collectivesParams, pageParam),
    {
      enabled: !disabled && entityType === CommunityEntityType.Collectives,
      getNextPageParam: getNextPageParam(collectivesParams),
      keepPreviousData: true,
    }
  );

  // combine the two types of infinite queries back into one
  const isColl = entityType === CommunityEntityType.Collectives;
  const currQuery = isColl ? collectivesQuery : profilesQuery;
  const { hasNextPage, fetchNextPage } = currQuery;

  return (
    <div className={s.meta_container}>
      <div className={s.sidebar}>
        {displays.map((key) => (
          <div
            className={`${s.layout_type} ${entityType === key ? 'active' : ''}`}
            key={key}
            onClick={() => setEntityType(key as CommunityEntityType)}
          >
            {key} {ENTITY_ICONS[key]}
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
        <InfiniteScroll
          pageStart={0}
          hasMore={hasNextPage}
          threshold={400}
          loadMore={() => fetchNextPage()}
          className={s.lower_container}
          loader={
            <div className={s.loader} key={0}>
              <div className={s.loader_text}>
                Loading <CgSpinnerTwoAlt />
              </div>
            </div>
          }
        >
          <InfiniteTableView
            pages={currQuery.data?.pages}
            // @ts-ignore
            HeaderComponent={isColl ? CollectiveHeaderRow : ProfileHeaderRow}
            // @ts-ignore
            RowComponent={isColl ? CollectiveRow : ProfileRow}
            onColumnClick={(column: keyof APIt.Profile | APIt.Collective) => {
              let currFilter = (
                entityType === CommunityEntityType.Collectives
                  ? collectivesParams
                  : profileParams
              ).filter;
              // if no filter, sort by descending
              if (!currFilter || currFilter.column !== column) {
                currFilter = {
                  column: column as any,
                  ascending: false,
                };
                // if filter, and sorted by ascending, remove filter
              } else {
                if (currFilter.ascending) {
                  currFilter = undefined;
                  // if filter, and sorted by descending, sort by ascending
                } else {
                  currFilter.ascending = true;
                }
              }
              // apply the filter
              if (isColl) {
                setCollectiveParams({
                  ...collectivesParams,
                  filter: currFilter as any,
                });
              } else {
                setProfileParams({
                  ...profileParams,
                  filter: currFilter as any,
                });
              }
            }}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ProfileGallery;

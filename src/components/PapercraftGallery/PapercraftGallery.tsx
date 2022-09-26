/*
 * PapercraftGallery.tsx
 * author: evan kirkiles
 * created on Sun Sep 04 2022
 * 2022 the nobot space,
 */
import React, { useRef, useState } from 'react';
import s from './PapercraftGallery.module.scss';
import Masonry, { MasonryProps } from 'react-masonry-css';
import FilterBar from '../FilterBar/FilterBar';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  listPapercrafts,
  ListPapercraftsQueryVariables,
  papercraftKeys,
} from '../../supabase/api/papercrafts';
import PapercraftCard from '../PapercraftCard/PapercraftCard';
import { CSSTransition } from 'react-transition-group';
import { MdOutlineTableRows } from 'react-icons/md';
import { RiLayoutGridLine, RiLayoutBottomLine } from 'react-icons/ri';
import { IoCubeOutline, IoShapesOutline } from 'react-icons/io5';
import * as APIt from '../../supabase/types';
import { buildKeys, listBuilds } from '../../supabase/api/builds';
import InfiniteScroll from 'react-infinite-scroller';
import { PAGE_SIZE } from '../../util/getPagination';

const breakpointColumnsObj = {
  default: 5,
  1200: 5,
  992: 4,
  767: 3,
  480: 2,
};

/* -------------------------------------------------------------------------- */
/*                                   TYPINGS                                  */
/* -------------------------------------------------------------------------- */

type PapercraftGalleryProps = {
  children?: React.ReactNode;
  breakPointOverride?: MasonryProps['breakpointCols'];
  username?: string;
  user_id?: string;
  collective?: string;
  disabled?: boolean;
};

/* --------------------------------- layout --------------------------------- */

enum LayoutType {
  Compact = 'compact',
  Rows = 'rows',
  Grid = 'grid',
}

const LAYOUT_ICONS: { [key in LayoutType]: JSX.Element } = {
  [LayoutType.Compact]: <MdOutlineTableRows />,
  [LayoutType.Rows]: <RiLayoutBottomLine />,
  [LayoutType.Grid]: <RiLayoutGridLine />,
};

/* -------------------------------- entities -------------------------------- */

export enum EntityType {
  Papercrafts = 'papercrafts',
  Builds = 'builds',
}

const ENTITY_ICONS: { [key in EntityType]: JSX.Element } = {
  [EntityType.Papercrafts]: <IoShapesOutline />,
  [EntityType.Builds]: <IoCubeOutline />,
};

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

const PapercraftGallery: React.FC<PapercraftGalleryProps> =
  function PapercraftGallery({
    breakPointOverride,
    username,
    user_id,
    collective,
    disabled,
  }) {
    // refs
    const loadingOverlayRef = useRef<HTMLDivElement>(null);

    // statefuls
    const [layoutType, setLayoutType] = useState<LayoutType>(LayoutType.Grid);
    const [entityType, setEntityType] = useState<EntityType>(
      EntityType.Papercrafts
    );
    const [currentSearch, setCurrentSearch] = useState<string>('');
    const [currentTags, setCurrentTags] = useState<APIt.Tag[]>([]);

    // same params used across queries
    const params: ListPapercraftsQueryVariables = {
      search: currentSearch,
      username,
      collective,
      tags:
        currentTags.length > 0 ? currentTags.map(({ id }) => id) : undefined,
    };

    // maintain two infinite queries, one for papercrafts and one for builds
    const papercraftsQuery = useInfiniteQuery<APIt.Papercraft[]>(
      papercraftKeys.list(params),
      ({ pageParam = null }) => listPapercrafts(params, pageParam),
      {
        enabled: !disabled && entityType === EntityType.Papercrafts,
        getNextPageParam: (lastPage) =>
          lastPage.length === PAGE_SIZE
            ? lastPage[lastPage.length - 1].created_at
            : null,
      }
    );
    const buildsQuery = useInfiniteQuery<APIt.Build[]>(
      buildKeys.list(params),
      ({ pageParam = null }) => listBuilds(params, pageParam),
      {
        enabled: !disabled && entityType === EntityType.Builds,
        getNextPageParam: (lastPage) =>
          lastPage.length === PAGE_SIZE
            ? lastPage[lastPage.length - 1].created_at
            : null,
      }
    );

    // combine the two types of infinite queries back into one
    const currQuery =
      entityType === EntityType.Papercrafts ? papercraftsQuery : buildsQuery;
    const { data, hasNextPage, isLoading, isPaused, fetchNextPage } = currQuery;

    return (
      <div className={s.meta_container}>
        <div className={s.sidebar}>
          {Object.entries(ENTITY_ICONS).map(([key, icon]) => (
            <div
              className={`${s.layout_type} ${
                entityType === key ? 'active' : ''
              }`}
              key={key}
              onClick={() => setEntityType(key as EntityType)}
            >
              {key} {icon}
            </div>
          ))}
          {Object.entries(LAYOUT_ICONS).map(([key, icon]) => (
            <div
              className={`${s.layout_button} ${
                layoutType === key ? 'active' : ''
              }`}
              key={key}
              onClick={() => setLayoutType(key as LayoutType)}
            >
              {icon}
            </div>
          ))}
        </div>
        <div className={s.container}>
          <FilterBar
            user_id={user_id}
            currentTags={currentTags}
            submitTags={setCurrentTags}
            currentSearch={currentSearch}
            submitSearch={setCurrentSearch}
          />
          <div className={s.lower_container}>
            <InfiniteScroll
              pageStart={0}
              hasMore={hasNextPage}
              threshold={400}
              loadMore={() => fetchNextPage()}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            >
              <Masonry
                breakpointCols={breakPointOverride || breakpointColumnsObj}
                className={s.mason_grid}
                columnClassName={s.mason_grid_col}
              >
                {data?.pages
                  ? data.pages.flatMap((page) =>
                      page.map((entity) => (
                        <PapercraftCard
                          entityType={entityType}
                          key={entity!.id}
                          entity={entity}
                        />
                      ))
                    )
                  : null}
              </Masonry>
            </InfiniteScroll>
          </div>
          <CSSTransition
            appear
            in={isPaused || isLoading}
            nodeRef={loadingOverlayRef}
            timeout={300}
          >
            <div className={s.loading_overlay} ref={loadingOverlayRef}>
              loading...
            </div>
          </CSSTransition>
        </div>
      </div>
    );
  };

export default PapercraftGallery;

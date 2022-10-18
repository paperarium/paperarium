/*
 * PapercraftGallery.tsx
 * author: evan kirkiles
 * created on Sun Sep 04 2022
 * 2022 the nobot space,
 */
import React, { useEffect, useRef, useState } from 'react';
import s from './PapercraftGallery.module.scss';
import Masonry, { MasonryProps } from 'react-masonry-css';
import FilterBar from '../FilterBar/FilterBar';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  listPapercrafts,
  papercraftKeys,
} from '../../supabase/api/papercrafts';
import PapercraftCard from '../PapercraftCard/PapercraftCard';
import { CSSTransition } from 'react-transition-group';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import * as APIt from '../../supabase/types';
import { buildKeys, listBuilds } from '../../supabase/api/builds';
import InfiniteScroll from 'react-infinite-scroller';
import getNextPageParam, {
  InfiniteQueryFilter,
} from '../../util/getNextPageParam';
import InfiniteTableView from '../InfiniteTableView/InfiniteTableView';
import { EBuildable, Layout } from '../../util/enums';
import { ENTITY_ICONS, LAYOUT_ICONS } from '../../util/icons';
import { useSessionContext } from '@supabase/auth-helpers-react';

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
  displays?: EBuildable[];
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
    displays = [EBuildable.Papercraft, EBuildable.Build],
  }) {
    const { supabaseClient } = useSessionContext();
    // refs
    const loadingOverlayRef = useRef<HTMLDivElement>(null);

    // statefuls
    const [layoutType, setLayoutType] = useState<Layout>(Layout.Grid);
    const [entityType, setEntityType] = useState<EBuildable>(displays[0]);
    useEffect(() => {
      setEntityType(displays[0]);
      // @ts-ignore
    }, [displays.length]);
    const [currentSearch, setCurrentSearch] = useState<string>('');
    const [currentTags, setCurrentTags] = useState<APIt.Tag[]>([]);
    const [papercraftFilter, setCurrentPapercraftFilter] =
      useState<InfiniteQueryFilter<APIt.Papercraft>['filter']>(undefined);
    const [buildFilter, setCurrentBuildFilter] =
      useState<InfiniteQueryFilter<APIt.Build>['filter']>(undefined);

    // add the tags to the params
    const fullPParams = {
      search: currentSearch,
      username,
      collective,
      tags:
        currentTags.length > 0 ? currentTags.map(({ id }) => id) : undefined,
      filter: papercraftFilter,
    };
    const fullBParams = {
      search: currentSearch,
      username,
      collective,
      tags:
        currentTags.length > 0 ? currentTags.map(({ id }) => id) : undefined,
      filter: buildFilter,
    };

    // maintain two infinite queries, one for papercrafts and one for builds
    const papercraftsQuery = useInfiniteQuery(
      papercraftKeys.list(fullPParams),
      ({ pageParam = 0 }) =>
        listPapercrafts(supabaseClient)(fullPParams, pageParam),
      {
        enabled: !disabled && entityType === EBuildable.Papercraft,
        getNextPageParam: getNextPageParam(fullPParams),
      }
    );
    const buildsQuery = useInfiniteQuery(
      buildKeys.list(fullBParams),
      ({ pageParam = 0 }) => listBuilds(supabaseClient)(fullBParams, pageParam),
      {
        enabled: !disabled && entityType === EBuildable.Build,
        getNextPageParam: getNextPageParam(fullBParams),
      }
    );

    // combine the two types of infinite queries back into one
    const isPapercrafts = entityType === EBuildable.Papercraft;
    const currQuery = isPapercrafts ? papercraftsQuery : buildsQuery;
    const { data, hasNextPage, isLoading, isPaused, fetchNextPage } = currQuery;

    return (
      <div className={s.meta_container}>
        <div className={s.sidebar}>
          {displays.map((key) => (
            <div
              className={`${s.layout_type} ${
                entityType === key ? 'active' : ''
              }`}
              key={key}
              onClick={() => setEntityType(key)}
            >
              {key}s {ENTITY_ICONS[key]}
            </div>
          ))}
          {Object.entries(LAYOUT_ICONS).map(([key, icon]) => (
            <div
              className={`${s.layout_button} ${
                layoutType === key ? 'active' : ''
              }`}
              key={key}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
                });
                setLayoutType(key as Layout);
              }}
            >
              {icon}
            </div>
          ))}
        </div>
        <div className={s.container}>
          <FilterBar
            user_id={user_id}
            collective_titlecode={collective}
            currentTags={currentTags}
            submitTags={setCurrentTags}
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
            {layoutType === Layout.Compact ? (
              <InfiniteTableView
                type={entityType}
                pages={currQuery.data?.pages}
                onColumnClick={(column: keyof APIt.Build | APIt.Papercraft) => {
                  let filter = isPapercrafts ? papercraftFilter : buildFilter;
                  // if no filter, sort by descending
                  if (!filter || filter.column !== column) {
                    filter = {
                      column: column as any,
                      ascending: false,
                    };
                    // if filter, and sorted by ascending, remove filter
                  } else {
                    if (filter.ascending) {
                      filter = undefined;
                      // if filter, and sorted by descending, sort by ascending
                    } else {
                      filter.ascending = true;
                    }
                  }
                  // apply the filter
                  if (isPapercrafts) {
                    setCurrentPapercraftFilter(filter as any);
                  } else {
                    setCurrentBuildFilter(filter as any);
                  }
                }}
              />
            ) : (
              <Masonry
                breakpointCols={breakPointOverride || breakpointColumnsObj}
                className={s.mason_grid}
                columnClassName={s.mason_grid_col}
              >
                {data?.pages
                  ? data.pages.flatMap((page) =>
                      page.data.map((entity) => (
                        <PapercraftCard
                          entityType={entityType}
                          key={entity!.id}
                          entity={entity}
                        />
                      ))
                    )
                  : null}
              </Masonry>
            )}
          </InfiniteScroll>
          <CSSTransition
            appear
            in={layoutType !== Layout.Compact && (isPaused || isLoading)}
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

export default React.memo(PapercraftGallery);

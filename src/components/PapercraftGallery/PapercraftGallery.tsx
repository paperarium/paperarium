/*
 * PapercraftGallery.tsx
 * author: evan kirkiles
 * created on Sun Sep 04 2022
 * 2022 the nobot space,
 */
import React, { useEffect, useRef, useState } from 'react';
import s from './PapercraftGallery.module.scss';
import { Masonry } from 'masonic';
import {
  // Masonry,
  MasonryProps,
} from 'react-masonry-css';
import FilterBar from '../FilterBar/FilterBar';
import { useQuery } from '@tanstack/react-query';
import {
  listPapercrafts,
  papercraftKeys,
} from '../../supabase/api/papercrafts';
import PapercraftCard from '../PapercraftCard/PapercraftCard';
import { CSSTransition } from 'react-transition-group';
import { MdOutlineTableRows } from 'react-icons/md';
import { RiLayoutGridLine, RiLayoutBottomLine } from 'react-icons/ri';
import { IoCubeOutline, IoShapesOutline } from 'react-icons/io5';
import * as APIt from '../../supabase/types';
import { buildKeys, listBuilds } from '../../supabase/api/builds';

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

type EntityMeta = {
  icon: JSX.Element;
  query: typeof listPapercrafts | typeof listBuilds;
  keys: typeof papercraftKeys | typeof buildKeys;
};

const ENTITY_MAP: { [key in EntityType]: EntityMeta } = {
  [EntityType.Papercrafts]: {
    icon: <IoShapesOutline />,
    query: listPapercrafts,
    keys: papercraftKeys,
  },
  [EntityType.Builds]: {
    icon: <IoCubeOutline />,
    query: listBuilds,
    keys: buildKeys,
  },
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
    const params = {
      search: currentSearch,
      username,
      collective,
      tags:
        currentTags.length > 0 ? currentTags.map(({ id }) => id) : undefined,
    };
    const entities = useQuery<APIt.Papercraft[] | APIt.Build[]>(
      ENTITY_MAP[entityType].keys.list(params),
      () => ENTITY_MAP[entityType].query(params),
      { enabled: !disabled }
    );

    // only render grid on client side
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
      setHasMounted(true);
    }, []);

    return (
      <div className={s.meta_container}>
        <div className={s.sidebar}>
          {Object.entries(ENTITY_MAP).map(([key, { icon }]) => (
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
          {/* <div className={s.spacer}></div> */}
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
            {hasMounted && entities.data ? (
              <Masonry
                items={
                  [
                    ...entities.data,
                    ...entities.data,
                    ...entities.data,
                    ...entities.data,
                    ...entities.data,
                    ...entities.data,
                    ...entities.data,
                    ...entities.data,
                  ] as (APIt.Papercraft | APIt.Build)[]
                }
                rowGutter={5}
                columnGutter={5}
                ssrWidth={1440}
                ssrHeight={1080}
                render={({ index, data: entity }) => (
                  <PapercraftCard
                    entityType={entityType}
                    key={entity!.id}
                    entity={entity}
                  />
                )}
                // breakpointCols={breakPointOverride || breakpointColumnsObj}
                className={s.masonic_grid}
                // columnClassName={s.mason_grid_col}
              />
            ) : null}
            {/* {entities.data
                ? entities.data.map((entity) => (
                    <PapercraftCard
                      entityType={entityType}
                      key={entity!.id}
                      entity={entity}
                    />
                  ))
                : null}
            </Masonry> */}
          </div>
          <CSSTransition
            appear
            in={entities.isPaused || entities.isLoading}
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

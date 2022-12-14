/*
 * PapercraftCard.tsx
 * author: evan kirkiles
 * created on Wed Aug 24 2022
 * 2022 the nobot space,
 */
import React, { useState } from 'react';
import s from './PapercraftCard.module.scss';
import * as APIt from '../../supabase/types';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
import Link from 'next/link';
import BuildTitle from '../ResourceTitle/BuildTitle';
import PapercraftTitle from '../ResourceTitle/PapercraftTitle';
import { EBuildable } from '../../util/enums';

interface PapercraftCardProps<T extends APIt.Papercraft | APIt.Build> {
  entity: T;
  entityType: EBuildable;
  priority?: boolean;
}

const PapercraftCard = function PapercraftCard<
  T extends APIt.Papercraft | APIt.Build
>({ entity, entityType }: PapercraftCardProps<T>) {
  // use router for navigating to page
  const [clicked, setClicked] = useState(false);

  return (
    <div className={s.inner_container}>
      <Link
        href={
          entityType === EBuildable.Build
            ? `/papercrafts/${(entity as APIt.Build).papercraft.id}?build=${
                entity.id
              }`
            : `/papercrafts/${entity.id}`
        }
        prefetch={false}
        // className={s.container}
        onClick={() => {
          setClicked(true);
        }}
      >
        <div
          className={s.image_container}
          style={{
            aspectRatio: `${entity.pictures[0].width} / ${entity.pictures[0].height}`,
          }}
        >
          <OptimizedImage
            src={entity.pictures[0].key}
            className={s.inner_image}
            dimensions={{
              width: entity.pictures[0].width,
              height: entity.pictures[0].height,
            }}
            sizes={`
            (max-width: 480px) 50vw,
            (max-width: 767px) 33vw,
            (max-width: 992px) 25vw,
            25vw 
          `}
          />
          <div className={`${s.overlay} ${clicked ? `clicked` : ``}`}>
            ...loading...
            <br />
            [σ﹏σ]
          </div>
        </div>
      </Link>
      <div className={s.info_card}>
        {entityType === EBuildable.Build ? (
          <BuildTitle build={entity as APIt.Build} onClick={setClicked} />
        ) : (
          <PapercraftTitle
            papercraft={entity as APIt.Papercraft}
            onClick={setClicked}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(PapercraftCard);

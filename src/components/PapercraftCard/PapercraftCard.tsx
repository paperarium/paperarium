/*
 * PapercraftCard.tsx
 * author: evan kirkiles
 * created on Wed Aug 24 2022
 * 2022 the nobot space,
 */
import React, { useEffect, useRef, useState } from "react";
import s from "./PapercraftCard.module.scss";
import * as APIt from "../../supabase/types";
import { useRouter } from "next/router";
import OptimizedImage from "../OptimizedImage/OptimizedImage";
import Link from "next/link";
import { EntityType } from "../PapercraftGallery/PapercraftGallery";

interface PapercraftCardProps<T extends APIt.Papercraft | APIt.Build> {
  entity: T;
  entityType: EntityType;
  priority?: boolean;
}

const PapercraftCard = function PapercraftCard<
  T extends APIt.Papercraft | APIt.Build
>({ entity, entityType }: PapercraftCardProps<T>) {
  // use router for navigating to page
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  return (
    <Link
      href={
        entityType === EntityType.Builds
          ? `/papercrafts/${(entity as APIt.Build).papercraft.id}?build=${
              entity.id
            }`
          : `/papercrafts/${entity.id}`
      }
      passHref
    >
      <a
        className={s.container}
        onClick={() => {
          setClicked(true);
        }}
      >
        <div className={s.inner_container}>
          <div className={s.image_container}>
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
          <div className={s.info_card}>
            {/* <div className={s.profile_pic}>
              {papercraft.user.avatar_url ? 
              <OptimizedImage
                src={papercraft.user.avatar_url}
                sizes={"20vw"}
                className={s.profile_pic_image} />
              : null}
            </div> */}
            <div className={s.info_col}>
              <div>
                {entityType === EntityType.Papercrafts
                  ? (entity as APIt.Papercraft).title!
                  : (entity as APIt.Build).papercraft.title}
              </div>
              <div className={s.user_name}>@{entity.user.username}</div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default React.memo(PapercraftCard);

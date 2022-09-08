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

interface PapercraftCardProps<T extends APIt.Papercraft | APIt.Build> {
  entity: T;
  priority?: boolean;
}

const PapercraftCard = function PapercraftCard<
  T extends APIt.Papercraft | APIt.Build
>({ entity }: PapercraftCardProps<T>) {
  // use router for navigating to page
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  return (
    <Link href={`/papercraft/${entity.id}`}>
      <a
        className={s.container}
        onClick={() => {
          setClicked(true);
          router.push(`/papercraft/${entity.id}`);
        }}
      >
        <div className={s.inner_container}>
          <div className={s.image_container}>
            <OptimizedImage
              src={entity.pictures[0]}
              className={s.inner_image}
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
                {Object.hasOwn(entity, "title")
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

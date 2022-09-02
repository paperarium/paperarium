/*
 * PapercraftCard.tsx
 * author: evan kirkiles
 * created on Wed Aug 24 2022
 * 2022 the nobot space,
 */
import React from "react";
import s from "./PapercraftCard.module.scss";
import Image from "next/image";
import { Papercraft } from "../../supabase/types";

type PapercraftCardProps = {
  papercraft: Papercraft;
};

const PapercraftCard: React.FC<PapercraftCardProps> = function PapercraftCard({
  papercraft,
}) {
  return (
    <div className={s.container}>
      <div className={s.inner_container}>
        <Image
          src={`/${papercraft.pictures[0]}`}
          className={s.inner_image}
          // placeholder="blur"
          // blurDataURL={`${process.env.IMGIX}/${papercraft.pictures[0]}?blur=2000`}
          layout="fill"
          objectFit="cover"
          alt={papercraft.title}
        />
        <div className={s.info_card}>
          <div>{papercraft.title}</div>
          <div className={s.user_name}>@{papercraft.user.username}</div>
        </div>
      </div>
    </div>
  );
};

export default PapercraftCard;

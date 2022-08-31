/*
 * PapercraftCard.tsx
 * author: evan kirkiles
 * created on Wed Aug 24 2022
 * 2022 the nobot space,
 */
import React from "react";
import s from "./PapercraftCard.module.scss";
import Image from "next/image";
import { Papercraft } from "../../types/supabase";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

type PapercraftCardProps = {
  papercraft: Papercraft;
};

const PapercraftCard: React.FC<PapercraftCardProps> = function PapercraftCard({
  papercraft,
}) {
  const { data } = supabaseClient.storage
    .from("papercrafts")
    .getPublicUrl(papercraft.pictures[0]);
  const imageURL = data?.publicURL;
  return (
    <div className={s.container}>
      <div className={s.inner_container}>
        {imageURL ? (
          <Image
            src={imageURL}
            placeholder="blur"
            blurDataURL={`${process.env.IMGIX}/${imageURL}?blur=2000`}
            layout="fill"
            objectFit="cover"
            alt={papercraft.title}
          />
        ) : null}

        <div className={s.info_card}>
          <div>{papercraft.title}</div>
          <div>@{papercraft.user_id}</div>
        </div>
      </div>
    </div>
  );
};

export default PapercraftCard;

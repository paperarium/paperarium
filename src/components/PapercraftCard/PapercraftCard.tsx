/*
 * PapercraftCard.tsx
 * author: evan kirkiles
 * created on Wed Aug 24 2022
 * 2022 the nobot space,
 */
import React from "react";
import s from "./PapercraftCard.module.scss";
import * as APIt from "../../API";
import Image from "next/image";

type PapercraftCardProps = {
  papercraft: APIt.Papercraft;
};

const PapercraftCard: React.FC<PapercraftCardProps> = function PapercraftCard({
  papercraft,
}) {
  const imageURL = `protected/${papercraft.pictures[0].identityId.replace(
    ":",
    "%3A"
  )}/${papercraft.pictures[0].key.replaceAll(" ", "+")}`;
  return (
    <div className={s.container}>
      <div className={s.inner_container}>
        <Image
          src={imageURL}
          placeholder="blur"
          blurDataURL={`${process.env.IMGIX}/${imageURL}?blur=2000`}
          layout="fill"
          objectFit="cover"
          alt={papercraft.title}
        />
        <div className={s.info_card}>
          <div>{papercraft.title}</div>
          <div>@{papercraft.user.username}</div>
        </div>
      </div>
    </div>
  );
};

export default PapercraftCard;

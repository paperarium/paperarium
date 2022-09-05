/*
 * PapercraftCard.tsx
 * author: evan kirkiles
 * created on Wed Aug 24 2022
 * 2022 the nobot space,
 */
import React, { useEffect, useState } from "react";
import s from "./PapercraftCard.module.scss";
import Imgix from "react-imgix";
import { Papercraft } from "../../supabase/types";
import { useRouter } from "next/router";

type PapercraftCardProps = {
  papercraft: Papercraft;
  priority?: boolean;
};

const PapercraftCard: React.FC<PapercraftCardProps> = function PapercraftCard({
  papercraft,
  priority,
}) {
  const router = useRouter();
  // initiate lazyload on client side
  const [lazyload, setLazyLoad] = useState<string>('')
  useEffect(() => {
    setLazyLoad('lazyload');
  }, []);

  return (
    <div
      className={s.container}
      onClick={() => {
        router.push(`/papercraft/${papercraft.id}`);
      }}
    >
      <div className={s.inner_container}>
        <div className={s.image_container}>
          <Imgix
            src={`${process.env.IMGIX}/${papercraft.pictures[0]}`}
            className={`${lazyload} ${s.inner_image}`}
            sizes="100vw"
            attributeConfig={{
              src: "data-src",
              srcSet: "data-srcset",
              sizes: "data-sizes",
            }}
            htmlAttributes={{
              src: `${process.env.IMGIX}/${papercraft.pictures[0]}?auto=format&blur=200&px=16&w=150`, // low quality image here
              // "data-lowsrc": `${process.env.IMGIX}/${papercraft.pictures[0]}?auto=format&blur=200&px=16&w=150`,
            }}
          />
        </div>
        {/* <img src={`${process.env.IMGIX}/${papercraft.pictures[0]}`} className={s.inner_image}/> */}
        {/* // <Image
        //   src={`/${papercraft.pictures[0]}`}
        //   className={s.inner_image}
        //   placeholder="blur"
        //   blurDataURL={`${process.env.IMGIX}/${papercraft.pictures[0]}?blur=2000`}
        //   layout="fill"
        //   objectFit="contain"
        //   // objectPosition="top center"
        //   alt={papercraft.title}
        //   priority={priority}
        // /> */}
        <div className={s.info_card}>
          <div>{papercraft.title}</div>
          <div className={s.user_name}>@{papercraft.user.username}</div>
        </div>
      </div>
    </div>
  );
};

export default PapercraftCard;

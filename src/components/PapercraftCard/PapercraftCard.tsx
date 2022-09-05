/*
 * PapercraftCard.tsx
 * author: evan kirkiles
 * created on Wed Aug 24 2022
 * 2022 the nobot space,
 */
import React, { useEffect, useRef, useState } from "react";
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
  const [clicked, setClicked] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  // initiate lazyload on client side
  const [lazyload, setLazyLoad] = useState<string>("");
  useEffect(() => {
    setLazyLoad("lazyload");
  }, []);

  return (
    <div
      className={s.container}
      onClick={() => {
        setClicked(true);
        router.push(`/papercraft/${papercraft.id}`);
      }}
    >
      <div className={s.inner_container}>
        <div className={s.image_container}>
          <Imgix
            src={`${process.env.IMGIX}/${papercraft.pictures[0]}`}
            className={`${lazyload} ${s.inner_image}`}
            sizes={`
              (max-width: 480px) 50vw,
              (max-width: 767px) 33vw,
              (max-width: 992px) 25vw,
              25vw 
            `}
            attributeConfig={{
              src: "data-src",
              srcSet: "data-srcset",
              sizes: "data-sizes",
            }}
            htmlAttributes={{
              src: `${process.env.IMGIX}/${papercraft.pictures[0]}?auto=format&px=16&w=200`, // low quality image here
              "data-lowsrc": `${process.env.IMGIX}/${papercraft.pictures[0]}?auto=format&px=16&w=200`,
            }}
          />
          <div className={`${s.overlay} ${clicked ? `clicked` : ``}`}>
            ...loading...
            <br />
            [σ﹏σ]
          </div>
        </div>
        <div className={s.info_card}>
          <div className={s.profile_pic}>HI</div>
          <div className={s.info_col}>
            <div>{papercraft.title}</div>
            <div className={s.user_name}>@{papercraft.user.username}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PapercraftCard);

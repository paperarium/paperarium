/*
 * PapercraftDisplay.tsx
 * author: evan kirkiles
 * created on Fri Sep 2 2022
 * 2022 the nobot space,
 */
import React, { useEffect, useState } from "react";
import s from "./PapercraftDisplay.module.scss";
import Image from "next/image";
import { Papercraft } from "../../supabase/types";
import TextareaAutosize from "react-textarea-autosize";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import * as APIt from "../../supabase/types";
import Link from "next/link";
import Imgix from "react-imgix";

import { BiArrowBack } from "react-icons/bi";
import { FiShare } from "react-icons/fi";
import { Router, useRouter } from "next/router";
import getPublicUrl from "../../util/getPublicUrl";
import OptimizedImage from "../OptimizedImage/OptimizedImage";

type PapercraftDisplayProps = {
  papercraft: Papercraft;
  preview?: boolean;
};

const PapercraftDisplay: React.FC<PapercraftDisplayProps> =
  function PapercraftCard({ papercraft, preview }) {
    const router = useRouter();
    return (
      <div className={s.container}>
        <div className={s.sticky_header}>
          <div
            className={s.sticky_button}
            onClick={!preview ? () => router.back() : undefined}
          >
            <BiArrowBack />
            BACK
          </div>
          {typeof navigator !== "undefined" && !!navigator.canShare ? (
            <div
              className={`${s.sticky_button} ${s.sticky_button_right}`}
              onClick={() => {
                if (preview) return;
                navigator
                  .share({
                    title: `${papercraft.title} on Paperarium`,
                    text: `check out this papercraft on paperarium (づ◔ ͜ʖ◔)づ`,
                    url: router.asPath,
                  })
                  .then(() => {
                    console.log("shared!");
                  })
                  .catch(() => {
                    console.log("share cancelled.");
                  });
              }}
            >
              <FiShare />
            </div>
          ) : null}
        </div>
        <div className={s.display_column}>
          <div className={s.preview_content_container}>
            <TextareaAutosize
              className={s.preview_title}
              value={papercraft.title || ""}
              placeholder={"Your title..."}
              spellCheck={false}
              readOnly={true}
            ></TextareaAutosize>
            <div className={s.date_input}>{new Date().toDateString()}</div>
            <TextareaAutosize
              className={s.preview_description}
              value={papercraft.description || ""}
              placeholder={"Your description..."}
              spellCheck={false}
              minRows={3}
              readOnly={true}
            ></TextareaAutosize>
            <div className={s.more_info_container}>
              <div className={s.info_col}>
                <div className={s.tags_row}>
                  <div className={s.tags_container}>
                    <div className={s.tag}>
                      {Object.values(APIt.Difficulty)[papercraft.difficulty]}
                    </div>
                    {papercraft.tags.map((tag) => (
                      <div key={tag.id} className={s.tag}>
                        {tag.name}
                      </div>
                    ))}
                  </div>
                  {papercraft.dimensions_cm ? (
                    <div className={s.dimensions_container}>
                      {`${papercraft.dimensions_cm?.join("cm x ")}cm`}
                    </div>
                  ) : null}
                </div>
                <div className={s.profile_container}>
                  <div className={s.container_note}>DESIGNED AND BUILT BY</div>
                  <div className={s.profile_picture}>
                    {papercraft.user.avatar_url ? (
                      <OptimizedImage
                        src={papercraft.user.avatar_url}
                        sizes={"20vw"}
                        className={s.profile_pic_image}
                      />
                    ) : null}
                  </div>
                  <div className={s.profile_name}>
                    <span className={s.user_name}>@evan</span>
                    <span>4 builds</span>
                    <span>3 papercrafts</span>
                  </div>
                </div>
              </div>
              <div className={s.info_col}>
                <div className={s.download_container}>
                  <a
                    href={getPublicUrl(papercraft?.pdo_url)}
                    rel="noreferrer noopener"
                    className={s.download_button}
                    download
                  >
                    .PDO
                  </a>
                  {papercraft.pdf_lined_url ? (
                    <a
                      href={getPublicUrl(papercraft.pdf_lined_url)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={s.download_button}
                    >
                      .PDF - lined
                    </a>
                  ) : null}
                  {papercraft.pdf_lineless_url ? (
                    <a
                      href={getPublicUrl(papercraft.pdf_lineless_url)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={s.download_button}
                    >
                      .PDF - lineless
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={s.divider}></div>
        <div className={s.picture_column}>
          <Swiper
            pagination={true}
            navigation={true}
            className={s.image_container}
            modules={[Pagination, Navigation]}
          >
            {papercraft.pictures.map((imgURL, i) => (
              <SwiperSlide
                key={`${imgURL}_${i}`}
                className={s.inner_image_container}
              >
                {!preview ? (
                  <OptimizedImage
                    src={papercraft.pictures[0]}
                    className={s.inner_image}
                    sizes={`
                    (max-width: 767px) 100vw,
                     50vw
                    `}
                  />
                ) : (
                  <img src={papercraft.pictures[0]} className={s.inner_image} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  };

export default PapercraftDisplay;

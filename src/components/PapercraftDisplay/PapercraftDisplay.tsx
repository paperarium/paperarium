/*
 * PapercraftDisplay.tsx
 * author: evan kirkiles
 * created on Fri Sep 2 2022
 * 2022 the nobot space,
 */
import React from "react";
import s from "./PapercraftDisplay.module.scss";
import Image from "next/image";
import { Papercraft } from "../../supabase/types";
import TextareaAutosize from "react-textarea-autosize";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import * as APIt from "../../supabase/types";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { FiShare } from "react-icons/fi";
import { Router, useRouter } from "next/router";
import getPublicUrl from "../../util/getPublicUrl";

type PapercraftDisplayProps = {
  papercraft?: Papercraft;
  preview?: boolean;
};

const PapercraftDisplay: React.FC<PapercraftDisplayProps> =
  function PapercraftCard({ papercraft, preview }) {
    const router = useRouter();
    return (
      <div className={s.container}>
        <div className={s.display_column}>
          <div className={s.preview_content_container}>
            <TextareaAutosize
              className={s.preview_title}
              value={papercraft?.title || ""}
              placeholder={"Your title..."}
              spellCheck={false}
              disabled={true}
              readOnly={true}
            ></TextareaAutosize>
            <div className={s.date_input}>{new Date().toDateString()}</div>
            <TextareaAutosize
              className={s.preview_description}
              value={papercraft?.description || ""}
              placeholder={"Your description..."}
              spellCheck={false}
              minRows={3}
              disabled={true}
              readOnly={true}
            ></TextareaAutosize>
            <div className={s.more_info_container}>
              <div className={s.info_col}>
                <div className={s.tags_row}>
                  {papercraft ? (
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
                  ) : null}
                  {papercraft?.dimensions_cm ? (
                    <div className={s.dimensions_container}>
                      {`${papercraft.dimensions_cm?.join("cm x ")}cm`}
                    </div>
                  ) : null}
                </div>
                <div className={s.profile_container}>
                  <div className={s.container_note}>DESIGNED AND BUILT BY</div>
                  <div className={s.profile_picture}></div>
                  <div className={s.profile_name}>
                    <span className={s.user_name}>@evan</span>
                    <span>4 builds</span>
                    <span>3 papercrafts</span>
                  </div>
                </div>
              </div>
              <div className={s.info_col}>
                <div className={s.download_container}>
                  {papercraft? 
                  <a href={getPublicUrl(papercraft?.pdo_url)} className={s.download_button} download>
                    .PDO
                  </a> : null}
                  {papercraft?.pdf_lined_url ? (
                    <a href={getPublicUrl(papercraft.pdf_lined_url)} target="_blank" className={s.download_button}>
                      .PDF - lined
                    </a>
                  ) : null}
                  {papercraft?.pdf_lineless_url ? (
                    <a href={getPublicUrl(papercraft.pdf_lineless_url)} target="_blank" className={s.download_button}>
                      .PDF - lineless
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={s.picture_column}>
          <div className={s.preview_content_outline}></div>
          <Swiper
            pagination={true}
            navigation={true}
            className={s.image_container}
            modules={[Pagination, Navigation]}
          >
            {papercraft
              ? papercraft.pictures.map((imgURL, i) => (
                  <SwiperSlide key={`${imgURL}_${i}`}>
                    <Image
                      src={`${papercraft.pictures[i]}`}
                      className={s.inner_image}
                      placeholder="blur"
                      blurDataURL={`${process.env.IMGIX}/${papercraft.pictures[0]}?blur=2000`}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="top center"
                      alt={papercraft.title}
                      priority={i == 0}
                      unoptimized={preview}
                    />
                  </SwiperSlide>
                ))
              : null}
          </Swiper>
        </div>
        <div className={s.sticky_header}>
          <div
            className={s.sticky_button}
            onClick={!preview ? () => router.back() : undefined}
          >
            <BiArrowBack />
          </div>
          <div
            className={s.sticky_button}
            style={{ left: "unset", right: "15px" }}
          >
            <FiShare />
          </div>
        </div>
      </div>
    );
  };

export default PapercraftDisplay;

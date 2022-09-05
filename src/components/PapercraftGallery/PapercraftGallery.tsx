/*
 * PapercraftGallery.tsx
 * author: evan kirkiles
 * created on Sun Sep 04 2022
 * 2022 the nobot space,
 */
import React from "react";
import * as APIt from "../../supabase/types";
import s from "./PapercraftGallery.module.scss";
import Masonry from "react-masonry-css";
import { Papercraft } from "../../supabase/types";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import PapercraftCard from "../PapercraftCard/PapercraftCard";

const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  768: 2,
  // 640: 1
};

type PapercraftGalleryProps = {
  children?: React.ReactNode;
  breakPointOverride?: typeof breakpointColumnsObj;
};

const PapercraftGallery: React.FC<PapercraftGalleryProps> =
  function PapercraftGallery({ children, breakPointOverride }) {
    return (
      <div className={s.container}>
        <Masonry
          breakpointCols={breakPointOverride || breakpointColumnsObj}
          className={s.mason_grid}
          columnClassName={s.mason_grid_col}
        >
          {children}
        </Masonry>
      </div>
    );
  };

export default PapercraftGallery;

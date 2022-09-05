/*
 * PapercraftGallery.tsx
 * author: evan kirkiles
 * created on Sun Sep 04 2022
 * 2022 the nobot space,
 */
import React from "react";
import s from "./PapercraftGallery.module.scss";
import Masonry, { MasonryProps} from "react-masonry-css";

const breakpointColumnsObj = {
  default: 5,
  1200: 5,
  992: 4,
  767: 3,
  480: 2
};

type PapercraftGalleryProps = {
  children?: React.ReactNode;
  breakPointOverride?: MasonryProps["breakpointCols"];
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

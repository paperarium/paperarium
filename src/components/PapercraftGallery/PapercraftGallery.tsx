/*
 * PapercraftGallery.tsx
 * author: evan kirkiles
 * created on Sun Sep 04 2022
 * 2022 the nobot space,
 */
import React, { useRef, useState } from "react";
import s from "./PapercraftGallery.module.scss";
import Masonry, { MasonryProps } from "react-masonry-css";
import FilterBar from "../FilterBar/FilterBar";
import { useQuery } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";
import { listPapercrafts } from "../../supabase/api/papercrafts";
import PapercraftCard from "../PapercraftCard/PapercraftCard";
import { CSSTransition } from "react-transition-group";

const breakpointColumnsObj = {
  default: 5,
  1200: 5,
  992: 4,
  767: 3,
  480: 2,
};

type PapercraftGalleryProps = {
  children?: React.ReactNode;
  breakPointOverride?: MasonryProps["breakpointCols"];
  username?: string;
};

const PapercraftGallery: React.FC<PapercraftGalleryProps> =
  function PapercraftGallery({ breakPointOverride, username }) {
    const loadingOverlayRef = useRef<HTMLDivElement>(null);
    const [currentSearch, setCurrentSearch] = useState<string>("");
    const papercrafts = useQuery(
      ["papercrafts", { search: currentSearch, username }],
      () => listPapercrafts({ search: currentSearch, username })
    );

    return (
      <div className={s.meta_container}>
        <div className={s.sidebar}>AAA</div>
        <div className={s.container}>
          <FilterBar submitSearch={setCurrentSearch} />
          <Masonry
            breakpointCols={breakPointOverride || breakpointColumnsObj}
            className={s.mason_grid}
            columnClassName={s.mason_grid_col}
          >
            {papercrafts.data
              ? papercrafts.data.map((papercraft) => (
                  <PapercraftCard
                    key={papercraft!.id}
                    papercraft={papercraft}
                  />
                ))
              : null}
            {papercrafts.data
              ? papercrafts.data.map((papercraft) => (
                  <PapercraftCard
                    key={papercraft!.id}
                    papercraft={papercraft}
                  />
                ))
              : null}
            {papercrafts.data
              ? papercrafts.data.map((papercraft) => (
                  <PapercraftCard
                    key={papercraft!.id}
                    papercraft={papercraft}
                  />
                ))
              : null}
            {papercrafts.data
              ? papercrafts.data.map((papercraft) => (
                  <PapercraftCard
                    key={papercraft!.id}
                    papercraft={papercraft}
                  />
                ))
              : null}
            {papercrafts.data
              ? papercrafts.data.map((papercraft) => (
                  <PapercraftCard
                    key={papercraft!.id}
                    papercraft={papercraft}
                  />
                ))
              : null}
          </Masonry>
          <CSSTransition
            appear
            in={papercrafts.isPaused || papercrafts.isLoading}
            nodeRef={loadingOverlayRef}
            timeout={300}
          >
            <div className={s.loading_overlay} ref={loadingOverlayRef}>
              loading...
            </div>
          </CSSTransition>
        </div>
      </div>
    );
  };

export default PapercraftGallery;

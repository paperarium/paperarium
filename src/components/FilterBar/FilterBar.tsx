/*
 * FilterBar.tsx
 * author: evan kirkiles
 * created on Tue Sep 06 2022
 * 2022 the nobot space,
 */
import React, { useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilterCircle, BsFilterCircleFill } from "react-icons/bs";
import { CSSTransition } from "react-transition-group";
import s from "./FilterBar.module.scss";

type FilterBarProps = {
  submitSearch: (search: string) => void;
};

const FilterBar: React.FC<FilterBarProps> = function FilterBar({
  submitSearch,
}) {
  // statefuls
  const menuRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={s.container}>
      <CSSTransition appear in={expanded} nodeRef={menuRef} timeout={300}>
        <div className={s.menu} ref={menuRef}>
          <div className={s.menu_content}>HHI</div>
          <div className={s.visible_bar}>
            <input
              type="text"
              className={s.search_input}
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitSearch(search);
                }
              }}
            />
            <div className={s.search_icon}>
              <AiOutlineSearch />
            </div>
            <div
              className={s.filter_button}
              onClick={() => setExpanded(!expanded)}
            >
              FILTER
              {expanded ? <BsFilterCircleFill /> : <BsFilterCircle />}
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default FilterBar;

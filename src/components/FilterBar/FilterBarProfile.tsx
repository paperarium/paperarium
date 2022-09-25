/*
 * FilterBar.tsx
 * author: evan kirkiles
 * created on Tue Sep 06 2022
 * 2022 the nobot space,
 */
import React, { useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { CSSTransition } from 'react-transition-group';
import s from './FilterBar.module.scss';
import { GrClose } from 'react-icons/gr';

type FilterBarProfileProps = {
  currentSearch?: string;
  submitSearch: (search: string) => void;
};

const FilterBarProfile: React.FC<FilterBarProfileProps> = function FilterBar({
  currentSearch,
  submitSearch,
}) {
  // statefuls
  const menuRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');

  return (
    <div className={s.container}>
      <CSSTransition appear in={false} nodeRef={menuRef} timeout={300}>
        <div className={s.menu} ref={menuRef}>
          <div className={s.visible_bar}>
            <input
              type="text"
              className={s.search_input}
              placeholder="Search"
              value={search}
              autoCorrect={'off'}
              autoCapitalize={'off'}
              spellCheck={false}
              tabIndex={1}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  submitSearch(search);
                }
              }}
            />
            <div className={s.search_icon}>
              <AiOutlineSearch />
            </div>
            {currentSearch ? (
              <div
                className={s.search_contents}
                style={{ borderRadius: '5px' }}
              >
                <AiOutlineSearch />
                {currentSearch}
                <GrClose
                  onClick={() => {
                    submitSearch('');
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default React.memo(FilterBarProfile);

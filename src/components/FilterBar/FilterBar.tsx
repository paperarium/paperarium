/*
 * FilterBar.tsx
 * author: evan kirkiles
 * created on Tue Sep 06 2022
 * 2022 the nobot space,
 */
import React, { useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFilterCircle, BsFilterCircleFill } from 'react-icons/bs';
import { CSSTransition } from 'react-transition-group';
import s from './FilterBar.module.scss';
import * as APIt from '../../supabase/types';
import { GrClose } from 'react-icons/gr';
import { useQuery } from '@tanstack/react-query';
import {
  listTags,
  ListTagsQueryVariables,
  tagsKeys,
} from '../../supabase/api/tags';
import { IoPricetagOutline } from 'react-icons/io5';

type FilterBarProps = {
  user_id?: string;
  currentTags: APIt.Tag[];
  submitTags: (newTags: APIt.Tag[]) => void;
  currentSearch?: string;
  submitSearch: (search: string) => void;
};

const FilterBar: React.FC<FilterBarProps> = function FilterBar({
  currentTags,
  submitTags,
  currentSearch,
  submitSearch,
  user_id,
}) {
  // statefuls
  const menuRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [tagSearch, setTagSearch] = useState('');
  const [expanded, setExpanded] = useState(false);
  // list tags
  const qparams: ListTagsQueryVariables = { search: tagSearch, user_id };
  const tags = useQuery<APIt.Tag[]>(tagsKeys.list(qparams), () =>
    listTags(qparams)
  );

  return (
    <div className={s.container}>
      <CSSTransition appear in={expanded} nodeRef={menuRef} timeout={300}>
        <div className={s.menu} ref={menuRef}>
          <div className={s.menu_content}>
            <div className={s.tags_row}>
              <input
                type="text"
                className={s.search_input}
                placeholder="Search for a tag"
                autoCorrect={'off'}
                autoCapitalize={'off'}
                spellCheck={false}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setTagSearch((e.target as HTMLInputElement).value);
                  }
                }}
              />
              <div className={s.search_icon}>
                <AiOutlineSearch />
              </div>
            </div>
            <div className={s.tags_row}>
              <div className={s.tag_row_container}>
                {tags.data
                  ? tags.data.map((tag) => {
                      let active = '';
                      const index = currentTags.findIndex(
                        ({ id: e_id }) => e_id == tag.id
                      );
                      if (index !== -1) active = 'active';
                      return (
                        <div
                          key={tag.id}
                          className={`${s.tag} ${active}`}
                          onClick={
                            index === -1
                              ? () => {
                                  submitTags([...currentTags, tag]);
                                }
                              : () => {
                                  const newTags = [...currentTags];
                                  newTags.splice(index, 1);
                                  submitTags(newTags);
                                }
                          }
                        >
                          <>
                            {tag.name} <i>({tag.n_papercrafts})</i>
                          </>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
          <div className={s.visible_bar}>
            <input
              type="text"
              className={s.search_input}
              placeholder="Search"
              value={search}
              autoCorrect={'off'}
              autoCapitalize={'off'}
              spellCheck={false}
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
            <div
              className={`${s.filter_button} ${expanded ? 'active' : ''}`}
              onClick={() => setExpanded(!expanded)}
            >
              TAGS
              {expanded ? <BsFilterCircleFill /> : <BsFilterCircle />}
            </div>
          </div>
          <div className={s.filter_active_container}>
            {currentTags.map((tag, i) => (
              <div
                key={tag.id}
                className={s.active_tag}
                onClick={() => {
                  const newTags = [...currentTags];
                  newTags.splice(i, 1);
                  submitTags(newTags);
                }}
              >
                <>
                  <IoPricetagOutline />
                  {tag.name} <i>({tag.n_papercrafts})</i>
                  <GrClose />
                </>
              </div>
            ))}
            {currentSearch ? (
              <div className={s.search_contents}>
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

export default React.memo(FilterBar);

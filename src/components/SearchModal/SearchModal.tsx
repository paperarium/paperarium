/*
 * SearchModal.tsx
 * author: evan kirkiles
 * created on Sun Oct 09 2022
 * 2022 the nobot space,
 */
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import InfiniteScroll from 'react-infinite-scroller';
import { EBuildable, ECommunity } from '../../util/enums';
import getNextPageParam from '../../util/getNextPageParam';
import InfiniteTableView from '../InfiniteTableView/InfiniteTableView';
import s from './SearchModal.module.scss';

type SearchModalProps<T, S extends { search: string }> = {
  entityType: EBuildable | ECommunity;
  defaultParams: S;
  query: (arg0: S, arg1: any) => Promise<T[]>;
  keyFactory: { list: (arg0: S) => readonly any[] };
  onCellClick: (cell: T) => void;
};

const SearchModal = function SearchModalProps<
  T extends { id: string | number; created_at: string }, // entity itself
  S extends { search: string } // search props
>({
  entityType,
  defaultParams,
  query,
  keyFactory,
  onCellClick,
}: SearchModalProps<T, S>) {
  // ref to calculate scroll position
  const scrollRef = useRef<HTMLDivElement>(null);

  // query / search functionality
  const [search, setSearch] = useState('');
  const params: S = {
    ...defaultParams,
    search,
  };
  const { hasNextPage, data, fetchNextPage } = useInfiniteQuery<T[]>(
    keyFactory.list(params),
    ({ pageParam = null }) => query(params, pageParam),
    {
      getNextPageParam: getNextPageParam({}),
      keepPreviousData: true,
    }
  );

  return (
    <div className={s.container}>
      <div className={s.search_container}>
        <input
          type="text"
          className={s.search_input}
          placeholder="Search for the papercraft you've built"
          autoCorrect={'off'}
          autoCapitalize={'off'}
          tabIndex={1}
          spellCheck={false}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearch((e.target as HTMLInputElement).value);
            }
          }}
        />
        <div className={s.search_icon}>
          <AiOutlineSearch />
        </div>
      </div>
      <div className={s.results_container}>
        <div className={s.inner_container} ref={scrollRef}>
          <InfiniteScroll
            pageStart={0}
            hasMore={hasNextPage}
            threshold={400}
            loadMore={() => fetchNextPage()}
            className={s.lower_container}
            useWindow={false}
            getScrollParent={() => scrollRef.current}
            loader={
              <div className={s.loader} key={0}>
                <div className={s.loader_text}>
                  Loading <CgSpinnerTwoAlt />
                </div>
              </div>
            }
          >
            <InfiniteTableView
              pages={data?.pages}
              columns={[]}
              type={entityType}
              onColumnClick={() => {}}
              onCellClick={(arg0: any) => onCellClick(arg0)}
              headerStyle={{ top: '0px' }}
            />
            {!hasNextPage ? (
              <div className={s.finished_container}>
                .·͙*̩̩͙˚̩̥̩̥*̩̩̥͙　✩ that&apos;s all the results! ✩　*̩̩̥͙˚̩̥̩̥*̩̩͙‧͙ .
              </div>
            ) : null}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;

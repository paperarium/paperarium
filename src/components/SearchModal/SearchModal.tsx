/*
 * SearchModal.tsx
 * author: evan kirkiles
 * created on Sun Oct 09 2022
 * 2022 the nobot space,
 */
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import s from './SearchModal.module.scss';

type SearchModalProps<T> = {
  query: () => Promise<T[]>;
  listKeys: {};
};

const SearchModal = function SearchModalProps<T>({}: SearchModalProps<T>) {
  const [search, setSearch] = useState('');

  return (
    <div className={s.container}>
      <div className={s.search_container}>
        <input
          type="text"
          className={s.search_input}
          placeholder="Search for a papercraft"
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
    </div>
  );
};

export default SearchModal;

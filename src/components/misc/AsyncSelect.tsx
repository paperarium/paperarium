// @ts-nocheck
/*
 * AsyncSelect.tsx
 * author: evan kirkiles
 * created on Sun Aug 28 2022
 * 2022 the nobot space,
 */

import dynamic from 'next/dynamic';
import type ReactSelect from 'react-select';
import type AsyncSelect from 'react-select/dist/declarations/src/Async';
import type CreatableSelect from 'react-select/dist/declarations/src/Creatable';

export const AsyncSelect: AsyncSelect = dynamic(
  () => import('react-select/async').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  }
);

export const getSelectTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: 'var(--highlight-color)',
    primary25: 'var(--highlight-2-color)',
  },
});

export const Select: RreactSelect = dynamic(
  () => import('react-select').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  }
);

export const CreatableSelect: CreatableSelect = dynamic(
  () => import('react-select/creatable').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  }
);

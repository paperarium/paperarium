// @ts-nocheck
/*
 * AsyncSelect.tsx
 * author: evan kirkiles
 * created on Sun Aug 28 2022
 * 2022 the nobot space,
 */

import dynamic from 'next/dynamic';

export const AsyncSelect: any = dynamic(
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

export const Select: any = dynamic(
  () => import('react-select').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  }
);

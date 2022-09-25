// @ts-nocheck
/*
 * AsyncSelect.tsx
 * author: evan kirkiles
 * created on Sun Aug 28 2022
 * 2022 the nobot space,
 */

import dynamic from 'next/dynamic';

export const DatePicker: any = dynamic(
  () => import('react-datepicker').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  }
);

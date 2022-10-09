/*
 * PapercraftTitle.tsx
 * author: evan kirkiles
 * created on Thu Sep 29 2022
 * 2022 the nobot space,
 */
import Link from 'next/link';
import { HTMLAttributes } from 'react';
import { IoShapesOutline } from 'react-icons/io5';
import * as APIt from '../../supabase/types';
import ProfileLink from '../ProfileLink/ProfileLink';
import s from './ResourceTitle.module.scss';

type PapercraftTitleProps = {
  papercraft: APIt.Papercraft;
  onClick?: (clickState: boolean) => void;
  style?: HTMLAttributes<HTMLDivElement>['style'];
};

const PapercraftTitle: React.FC<PapercraftTitleProps> =
  function PapercraftTitle({ papercraft, onClick, style }) {
    return (
      <div className={s.info_col} style={style}>
        <Link href={`/papercrafts/${papercraft.id}`} prefetch={false}>
          <div
            onClick={() => {
              onClick && onClick(true);
            }}
          >
            {papercraft.title}
          </div>
        </Link>
        <div className={s.user_container}>
          <ProfileLink user={papercraft.user} withIcon={<IoShapesOutline />} />
        </div>
      </div>
    );
  };

export default PapercraftTitle;

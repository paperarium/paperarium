/*
 * BuildTitle.tsx
 * author: evan kirkiles
 * created on Thu Sep 29 2022
 * 2022 the nobot space,
 */
import Link from 'next/link';
import { IoCubeOutline } from 'react-icons/io5';
import * as APIt from '../../supabase/types';
import ProfileLink from '../ProfileLink/ProfileLink';
import s from './ResourceTitle.module.scss';

type BuildTitleProps = {
  build: APIt.Build;
  onClick?: (clickState: boolean) => void;
};

const BuildTitle: React.FC<BuildTitleProps> = function BuildTitle({
  build,
  onClick,
}) {
  return (
    <div className={s.info_col}>
      <Link href={`/builds/${build.id}`} prefetch={false}>
        <div
          onClick={() => {
            onClick && onClick(true);
          }}
        >
          {build.papercraft.title}
        </div>
      </Link>
      <div className={s.user_container}>
        <ProfileLink user={build.user} withIcon={<IoCubeOutline />} />
      </div>
    </div>
  );
};

export default BuildTitle;

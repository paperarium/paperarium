/*
 * ProfileTitle.tsx
 * author: evan kirkiles
 * created on Thu Sep 29 2022
 * 2022 the nobot space,
 */
import Link from 'next/link';
import { IoCubeOutline } from 'react-icons/io5';
import * as APIt from '../../supabase/types';
import ProfileLink from '../ProfileLink/ProfileLink';
import s from './ResourceTitle.module.scss';

type ProfileTitleProps = {
  profile: APIt.Profile;
  onClick?: (clickState: boolean) => void;
};

const ProfileTitle: React.FC<ProfileTitleProps> = function ProfileTitle({
  profile,
  onClick,
}) {
  return (
    <div className={s.info_col}>
      <Link href={`/profiles/${profile.id}`} prefetch={false}>
        <div
          onClick={() => {
            onClick && onClick(true);
          }}
        >
          {profile.name}
        </div>
      </Link>
      <div className={s.user_container}>
        <ProfileLink user={profile} withIcon={<IoCubeOutline />} />
      </div>
    </div>
  );
};

export default ProfileTitle;

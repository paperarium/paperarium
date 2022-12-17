/*
 * ArchiveIcon.tsx
 * author: evan kirkiles
 * created on Sat Sep 17 2022
 * 2022 the nobot space,
 */
import Link from 'next/link';
import { HiOutlineArchive } from 'react-icons/hi';
import * as APIt from '../../supabase/types';
import OptimizedImage from '../OptimizedImage/OptimizedImage';
import s from './ProfileLink.module.scss';

type ProfileLinkProps = {
  user: APIt.Profile;
  full?: boolean;
  children?: React.ReactNode;
  withIcon?: React.ReactNode;
};

const ProfileLink: React.FC<ProfileLinkProps> = function ProfileLink({
  user,
  full,
  children,
  withIcon,
}) {
  const fullClass = full ? 'full' : '';
  return (
    <div className={`${s.profile_container} ${fullClass}`}>
      {children}
      {full ? (
        <Link href={`/profiles/${user.username}`} prefetch={false}>
          <div className={s.profile_picture}>
            {user.avatar_url ? (
              <OptimizedImage
                src={user.avatar_url}
                sizes={'20vw'}
                className={s.profile_pic_image}
              />
            ) : null}
          </div>
        </Link>
      ) : null}
      <Link
        href={`/profiles/${user.username}`}
        prefetch={false}
        className={s.profile_name}
      >
        <span className={s.user_name}>
          {withIcon}@{user.username}
          {user.archived ? <HiOutlineArchive color="#dba000" /> : null}
        </span>
        {full ? (
          <>
            <span>{user.n_builds} builds</span>
            <span>{user.n_papercrafts} papercrafts</span>
          </>
        ) : null}
      </Link>
    </div>
  );
};

export default ProfileLink;

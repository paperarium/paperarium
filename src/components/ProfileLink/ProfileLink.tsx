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
};

const ProfileLink: React.FC<ProfileLinkProps> = function ProfileLink({
  user,
  full,
  children,
}) {
  const fullClass = full ? 'full' : '';
  return (
    <div className={`${s.profile_container} ${fullClass}`}>
      {children}
      {full ? (
        <Link href={`/profiles/${user.username}`} passHref>
          <a>
            <div className={s.profile_picture}>
              {user.avatar_url ? (
                <OptimizedImage
                  src={user.avatar_url}
                  sizes={'20vw'}
                  className={s.profile_pic_image}
                />
              ) : null}
            </div>
          </a>
        </Link>
      ) : null}
      <Link href={`/profiles/${user.username}`} passHref>
        <a className={s.profile_name}>
          <span className={s.user_name}>
            @{user.username}
            {user.archived ? <HiOutlineArchive color="#dba000" /> : null}
          </span>
          {full ? (
            <>
              <span>{user.n_builds[0].count} builds</span>
              <span>{user.n_papercrafts[0].count} papercrafts</span>
            </>
          ) : null}
        </a>
      </Link>
    </div>
  );
};

export default ProfileLink;

/*
 * ProfileDisplay.tsx
 * author: evan kirkiles
 * created on Thu Sep 29 2022
 * 2022 the nobot space,
 */
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getProfile, profileKeys } from '../../supabase/api/profiles';
import s from './ProfileDisplay.module.scss';
import PapercraftGallery from '../../components/PapercraftGallery/PapercraftGallery';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import OptimizedImage from '../../components/OptimizedImage/OptimizedImage';
import useWithFollowing from '../../hooks/useWithFollowing';
import FallbackOverlay from '../../components/FallbackOverlay/FallbackOverlay';
import { BiArrowBack } from 'react-icons/bi';
import { EBuildable } from '../../util/enums';

/* -------------------------------------------------------------------------- */
/*                                   TYPING                                   */
/* -------------------------------------------------------------------------- */
interface ProfileDisplayProps {
  username: string;
}
/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

const ProfileDisplay: React.FC<ProfileDisplayProps> = function ProfileDisplay({
  username,
}) {
  // use a fallback loading indicator
  const router = useRouter();
  const { user } = useUser();
  // get the user's profile and papercrafts
  const profile = useQuery(
    profileKeys.get(username),
    () => getProfile(username),
    {
      enabled: !!username,
    }
  );
  // functions for following / unfollowing
  const { isFollowing, follow, unfollow } = useWithFollowing(
    user?.id,
    profile.data?.id
  );

  return (
    <div className={s.profile_container}>
      <div className={s.profile_bar}>
        <div className={s.profile_information}>
          <div className={s.sticky_header}>
            <div className={s.sticky_button} onClick={() => router.back()}>
              <BiArrowBack />
              <div>BACK</div>
            </div>
          </div>
          <div className={s.profile_picture}>
            {profile.data?.avatar_url ? (
              <OptimizedImage
                src={profile.data.avatar_url}
                sizes={'20vw'}
                className={s.profile_pic_image}
              />
            ) : null}
          </div>
          <div className={s.profile_name}>
            <div className={s.user_name}>@{username}</div>
            <div className={s.user_real_name}>{profile.data?.name}</div>
            <div className={s.user_stat}>{profile.data?.n_builds} builds</div>
            <div className={s.user_stat}>
              {profile.data?.n_papercrafts} papercrafts
            </div>
          </div>
        </div>
        <div className={s.description}>{profile.data?.about}</div>
        <div className={s.following_row}>
          <div>{profile.data?.n_followers || 0} followers</div>
          <div>{profile.data?.n_following || 0} following</div>
        </div>
        {user && user.id === profile.data?.id ? (
          <>
            <Link href="/profiles/edit" passHref>
              <a className={s.profile_button}>edit profile</a>
            </Link>
            <div
              className={s.profile_button}
              onClick={() =>
                supabaseClient.auth.signOut().then(() => router.push('/'))
              }
            >
              sign out
            </div>
          </>
        ) : (
          <>
            <div
              className={s.profile_button}
              onClick={() => {
                if (isFollowing) {
                  unfollow.mutate();
                } else {
                  follow.mutate();
                }
              }}
            >
              {isFollowing ? 'following' : 'follow'}
            </div>
          </>
        )}
        <div className={s.joined_information}>Joined on Aug 21, 2022</div>
      </div>
      <div className={s.main_grid}>
        <PapercraftGallery
          user_id={profile.data?.id}
          breakPointOverride={{
            default: 5,
            2900: 7,
            2300: 6,
            1500: 5,
            1292: 4,
            1067: 3,
            480: 2,
          }}
          username={username}
          displays={[
            ...(!!profile.data?.n_papercrafts ? [EBuildable.Papercraft] : []),
            ...(!!profile.data?.n_builds ? [EBuildable.Build] : []),
            ...(!profile.data?.n_papercrafts && !profile.data?.n_builds
              ? [EBuildable.Papercraft, EBuildable.Build]
              : []),
          ]}
        />
      </div>
      <FallbackOverlay />
    </div>
  );
};

export default ProfileDisplay;

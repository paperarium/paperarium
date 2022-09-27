/*
 * [pid].tsx
 * author: evan kirkiles
 * created on Sun Sep 04 2022
 * 2022 the nobot space,
 */
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'node:querystring';
import { getProfile, profileKeys } from '../../supabase/api/profiles';
import s from '../../styles/profile/Profile.module.scss';
import PapercraftGallery, {
  EntityType,
} from '../../components/PapercraftGallery/PapercraftGallery';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import Layout from '../../components/Layout/Layout';
import { useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import OptimizedImage from '../../components/OptimizedImage/OptimizedImage';
import { NextSeo } from 'next-seo';
import useWithFollowing from '../../hooks/useWithFollowing';
import FallbackOverlay from '../../components/FallbackOverlay/FallbackOverlay';
import { useContext } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { FiShare } from 'react-icons/fi';
import {
  listPapercrafts,
  ListPapercraftsQueryVariables,
  papercraftKeys,
} from '../../supabase/api/papercrafts';
import { PAGE_SIZE } from '../../util/getPagination';
import getNextPageParam from '../../util/getNextPageParam';
import {
  buildKeys,
  listBuilds,
  ListBuildsQueryVariables,
} from '../../supabase/api/builds';

/* -------------------------------------------------------------------------- */
/*                                   TYPING                                   */
/* -------------------------------------------------------------------------- */
interface ProfilePageProps {
  username: string;
}
interface QParams extends ParsedUrlQuery {
  username?: string;
}

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

const ProfilePage: NextPage<ProfilePageProps> = function ProfilePage({
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
    <>
      <Head>
        <title>{`@${username} - paperarium`}</title>
        <NextSeo
          canonical={`https://paperarium.place/profiles/${username}`}
          description={'about paperarium itself.'}
          title={`@${username}`}
          openGraph={{
            url: router.basePath,
            title: `${profile.data?.username} on paperarium`,
            description: `view @${profile.data?.username}'s papercrafts and builds on paperarium`,
          }}
        />
      </Head>
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
              ...(!!profile.data?.n_papercrafts
                ? [EntityType.Papercrafts]
                : []),
              ...(!!profile.data?.n_builds ? [EntityType.Builds] : []),
              ...(!profile.data?.n_papercrafts && !profile.data?.n_builds
                ? [EntityType.Papercrafts, EntityType.Builds]
                : []),
            ]}
          />
        </div>
        <FallbackOverlay />
      </div>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                                     SSG                                    */
/* -------------------------------------------------------------------------- */

/**
 * Generate profile pages for all profiles,
 * @returns
 */
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

/**
 * Run the intiial profile query on the server. This only queries for public
 * profiles. Any increased functionality is done on the client
 * @param context
 * @returns
 */
export const getStaticProps: GetStaticProps<
  ProfilePageProps,
  QParams
> = async ({ params }) => {
  const queryClient = new QueryClient();
  const username = params!.username!;
  const papercraftParams: ListPapercraftsQueryVariables &
    ListBuildsQueryVariables = {
    search: '',
    username,
    collective: undefined,
    tags: [],
  };
  await Promise.all([
    queryClient.prefetchQuery(profileKeys.get(username), () =>
      getProfile(username)
    ),
    queryClient.prefetchInfiniteQuery(
      papercraftKeys.list(papercraftParams),
      ({ pageParam = null }) => listPapercrafts(papercraftParams, pageParam),
      { getNextPageParam: getNextPageParam(papercraftParams) }
    ),
    queryClient.prefetchInfiniteQuery(
      buildKeys.list(papercraftParams),
      ({ pageParam = null }) => listBuilds(papercraftParams, pageParam),
      { getNextPageParam: getNextPageParam(papercraftParams) }
    ),
  ]);
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      username,
    },
    revalidate: false,
  };
};

(ProfilePage as any).getLayout = (page: React.ReactNode) => (
  <Layout footerMarginLeft={'var(--profile-bar-width)'}>{page}</Layout>
);

export default ProfilePage;

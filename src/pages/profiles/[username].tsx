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
import Layout from '../../components/Layout/Layout';
import { NextSeo } from 'next-seo';
import {
  listPapercrafts,
  ListPapercraftsQueryVariables,
  papercraftKeys,
} from '../../supabase/api/papercrafts';
import getNextPageParam from '../../util/getNextPageParam';
import {
  buildKeys,
  listBuilds,
  ListBuildsQueryVariables,
} from '../../supabase/api/builds';
import ProfileDisplay from '../../components/ProfileDisplay/ProfileDisplay';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../supabase/API';
import { useSessionContext } from '@supabase/auth-helpers-react';
import supabaseClient from '../../supabase/client';

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
  const { supabaseClient } = useSessionContext();
  // use a fallback loading indicator
  const router = useRouter();
  // get the user's profile and papercrafts
  const profile = useQuery(
    profileKeys.get(username),
    () => getProfile(supabaseClient)(username),
    {
      enabled: !!username,
    }
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
      <ProfileDisplay username={username} />
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
      getProfile(supabaseClient)(username)
    ),
    queryClient.prefetchInfiniteQuery(
      papercraftKeys.list(papercraftParams),
      ({ pageParam = 0 }) =>
        listPapercrafts(supabaseClient)(papercraftParams, pageParam),
      { getNextPageParam: getNextPageParam(papercraftParams) }
    ),
    queryClient.prefetchInfiniteQuery(
      buildKeys.list(papercraftParams),
      ({ pageParam = 0 }) =>
        listBuilds(supabaseClient)(papercraftParams, pageParam),
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

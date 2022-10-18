/*
 * community.tsx
 * author: evan kirkiles
 * created on Tue Sep 20 2022
 * 2022 the nobot space,
 */
import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { NextPage } from 'next';
import Head from 'next/head';
import s from '../styles/Explore.module.scss';
import { NextSeo } from 'next-seo';
import {
  listProfiles,
  ListProfilesQueryVariables,
  profileKeys,
} from '../supabase/api/profiles';
import ProfileGallery from '../components/ProfileGallery/ProfileGallery';
import getNextPageParam from '../util/getNextPageParam';
import {
  collectiveKeys,
  listCollectives,
  ListCollectivesQueryVariables,
} from '../supabase/api/collectives';
import { ECommunity } from '../util/enums';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../supabase/API';
import supabaseClient from '../supabase/client';

const CommunityPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>community - paperarium</title>
        <NextSeo
          canonical={'https://paperarium.place/community'}
          description={'see members of the paperarium community.'}
        />
      </Head>
      <div className={s.main_grid}>
        <ProfileGallery
          displays={[ECommunity.Profile, ECommunity.Collective]}
        />
      </div>
    </>
  );
};

/**
 * Run the intiial papercraft query on the server. This only queries for public
 * papercrafts, not worrying about RLS.
 * @param context
 * @returns
 */
export async function getStaticProps(context: any) {
  const queryClient = new QueryClient();
  const profileParams: ListProfilesQueryVariables = {
    search: '',
    filter: {
      column: 'n_papercrafts',
      ascending: false,
    },
  };
  const collectiveParams: ListCollectivesQueryVariables = {
    search: '',
    filter: {
      column: 'n_members',
      ascending: false,
    },
  };
  await Promise.all([
    queryClient.prefetchInfiniteQuery(
      profileKeys.list(profileParams),
      ({ pageParam = 0 }) =>
        listProfiles(supabaseClient)(profileParams, pageParam),
      { getNextPageParam: getNextPageParam(profileParams) }
    ),
    queryClient.prefetchInfiniteQuery(
      collectiveKeys.list(collectiveParams),
      ({ pageParam = 0 }) =>
        listCollectives(supabaseClient)(collectiveParams, pageParam),
      { getNextPageParam: getNextPageParam(collectiveParams) }
    ),
  ]);
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 10,
  };
}

// (ExplorePage as any).getLayout = (page: React.ReactNode) => (
//   <Layout footerMarginLeft={"var(--search-bar-width)"}>{page}</Layout>
// );

export default CommunityPage;

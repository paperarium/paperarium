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
import { listProfiles, profileKeys } from '../supabase/api/profiles';
import ProfileGallery from '../components/ProfileGallery/ProfileGallery';

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
        <ProfileGallery />
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
  const params = { search: '' };
  await queryClient.prefetchQuery(profileKeys.list(params), () =>
    listProfiles(params)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
}

// (ExplorePage as any).getLayout = (page: React.ReactNode) => (
//   <Layout footerMarginLeft={"var(--search-bar-width)"}>{page}</Layout>
// );

export default CommunityPage;

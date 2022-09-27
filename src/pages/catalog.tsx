import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { NextPage } from 'next';
import Head from 'next/head';
import s from '../styles/Explore.module.scss';
import {
  listPapercrafts,
  ListPapercraftsQueryVariables,
  papercraftKeys,
} from '../supabase/api/papercrafts';
import PapercraftGallery from '../components/PapercraftGallery/PapercraftGallery';
import { NextSeo } from 'next-seo';
import { PAGE_SIZE } from '../util/getPagination';
import getNextPageParam from '../util/getNextPageParam';

const ExplorePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>explore - paperarium</title>
        <NextSeo
          canonical={'https://paperarium.place/catalog'}
          description={'see other papercrafts from the community.'}
        />
      </Head>
      <div className={s.main_grid}>
        <PapercraftGallery></PapercraftGallery>
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
export async function getStaticProps() {
  const queryClient = new QueryClient();
  const params: ListPapercraftsQueryVariables = { search: '' };
  await queryClient.prefetchInfiniteQuery(
    papercraftKeys.list(params),
    ({ pageParam = null }) => listPapercrafts(params, pageParam),
    { getNextPageParam: getNextPageParam(params) }
  );
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

export default ExplorePage;

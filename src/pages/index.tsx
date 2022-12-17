import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import Link from 'next/link';
import PapercraftGallery from '../components/PapercraftGallery/PapercraftGallery';
import s from '../styles/Home.module.scss';
import getNextPageParam from '../util/getNextPageParam';
import { listAnnouncements } from '../supabase/api/announcements';
import {
  buildKeys,
  listBuilds,
  ListBuildsQueryVariables,
} from '../supabase/api/builds';
import {
  listPapercrafts,
  ListPapercraftsQueryVariables,
  papercraftKeys,
} from '../supabase/api/papercrafts';
import { PAGE_SIZE } from '../util/getPagination';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../supabase/API';
import supabaseClient from '../supabase/client';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Paperarium – a papercraft compendium.</title>
        <NextSeo
          canonical={'https://paperarium.place'}
          description={'cut, fold, and glue 3d models into the real world!'}
        />
      </Head>
      <div className={s.styled_container}>
        <div className={s.page_row}>
          <div className={s.page_col}>
            <div className={s.content_container}>
              <i>
                <h1>
                  welcome to the <br />
                  <span className={s.title_big}>paperarium</span>.
                </h1>
              </i>
              <p>
                here you can explore both original and unofficial fan-made 3d
                models you can print out and assemble in real life, for free.
                after printing, just follow the three steps:
              </p>
              <ol>
                <li>cut out each piece...</li>
                <li>fold along the dotted lines...</li>
                <li>and glue the pieces together.</li>
              </ol>
              <p>
                then you will have a little figurine of the model you can love
                forever! (づ◔ ͜ʖ◔)づ if you are really creative, see if you can
                design your own papercraft and contribute to our community. we
                have written guides to help you on your way.
              </p>
              <p>
                want to see the full collection? click here and check it out ❦
              </p>
              <Link href="/catalog" legacyBehavior>
                <div className={s.continue_button}>CATALOG</div>
              </Link>
            </div>
          </div>
          <div className={s.divider}></div>
          <div className={s.page_col}>
            <div className={s.main_grid}>
              <PapercraftGallery
                breakPointOverride={{
                  default: 4,
                  3000: 7,
                  2400: 6,
                  1600: 5,
                  1392: 4,
                  1167: 3,
                  992: 2,
                  767: 3,
                  480: 2,
                }}
              ></PapercraftGallery>
            </div>
          </div>
        </div>
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
  const params: ListPapercraftsQueryVariables & ListBuildsQueryVariables = {
    search: '',
    username: undefined,
    collective: undefined,
    tags: undefined,
    filter: undefined,
  };
  await Promise.all([
    queryClient.prefetchInfiniteQuery(
      papercraftKeys.list(params),
      ({ pageParam = 0 }) => listPapercrafts(supabaseClient)(params, pageParam),
      { getNextPageParam: getNextPageParam(params) }
    ),
    queryClient.prefetchInfiniteQuery(
      buildKeys.list(params),
      ({ pageParam = 0 }) => listBuilds(supabaseClient)(params, pageParam),
      { getNextPageParam: getNextPageParam(params) }
    ),
    queryClient.prefetchQuery(
      ['announcements'],
      listAnnouncements(supabaseClient)
    ),
  ]);
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 10,
  };
}

export default Home;

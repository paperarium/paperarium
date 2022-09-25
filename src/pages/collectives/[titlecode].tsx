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
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import s from '../../styles/profile/Profile.module.scss';
import PapercraftGallery from '../../components/PapercraftGallery/PapercraftGallery';
import {
  listPapercrafts,
  papercraftKeys,
} from '../../supabase/api/papercrafts';
import Layout from '../../components/Layout/Layout';
import OptimizedImage from '../../components/OptimizedImage/OptimizedImage';
import { collectiveKeys, getCollective } from '../../supabase/api/collectives';
import { BiArrowBack } from 'react-icons/bi';

/* -------------------------------------------------------------------------- */
/*                                   TYPING                                   */
/* -------------------------------------------------------------------------- */
interface ProfilePageProps {
  titlecode: string;
}
interface QParams extends ParsedUrlQuery {
  titlecode?: string;
}

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

const CollectivePage: NextPage<ProfilePageProps> = function CollectivePage({
  titlecode,
}) {
  // use a fallback loading indicator
  const router = useRouter();
  const seeFallback = useRef(router.isFallback);
  const fallbackRef = useRef<HTMLDivElement>(null);
  // get the user's profile and papercrafts
  const collective = useQuery(
    collectiveKeys.get(titlecode),
    () => getCollective(titlecode),
    {
      enabled: !!titlecode,
    }
  );

  return (
    <>
      <Head>
        <title>{`@${titlecode} - paperarium`}</title>
        <meta property="og:url" content={router.asPath} />
        <meta property="og:type" content="website" />
        {/* <meta property="fb:app_id" content="your fb id" /> */}
        <meta
          property="og:title"
          content={`${collective.data?.title} on paperarium`}
        />
        <meta
          property="og:description"
          content="a modern compendium and community for everything papercrafting."
        />
        <meta name="twitter:card" content="summary" />
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
              {collective.data?.avatar_url ? (
                <OptimizedImage
                  src={collective.data.avatar_url}
                  sizes={'20vw'}
                  className={s.profile_pic_image}
                />
              ) : null}
            </div>
            <div className={s.profile_name}>
              <div className={s.user_name}>@{titlecode}</div>
              <div className={s.user_real_name}>{collective.data?.title}</div>
              <div className={s.user_stat}>
                {collective.data?.n_members} members
              </div>
              <div className={s.user_stat}>
                {collective.data?.n_papercrafts} papercrafts
              </div>
            </div>
          </div>
          <div className={s.description}>{collective.data?.description}</div>
          <div className={s.joined_information}>Joined on Aug 21, 2022</div>
        </div>
        <div className={s.main_grid}>
          <PapercraftGallery
            breakPointOverride={{
              default: 5,
              2900: 7,
              2300: 6,
              1500: 5,
              1292: 4,
              1067: 3,
              480: 2,
            }}
            collective={titlecode}
            disabled={!titlecode}
          />
        </div>
        {seeFallback.current ? (
          <CSSTransition
            in={router.isFallback}
            nodeRef={fallbackRef}
            timeout={300}
          >
            <div className={s.loading_indicator} ref={fallbackRef}>
              loading...
            </div>
          </CSSTransition>
        ) : null}
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
  const titlecode = params!.titlecode!;
  const qparams = { search: '', titlecode };
  const requests = [
    queryClient.prefetchQuery(collectiveKeys.get(titlecode), () =>
      getCollective(titlecode)
    ),
    queryClient.prefetchQuery(papercraftKeys.list(qparams), () =>
      listPapercrafts(qparams)
    ),
  ];
  await Promise.all(requests);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      titlecode,
    },
    revalidate: false,
  };
};
(CollectivePage as any).getLayout = (page: React.ReactNode) => (
  <Layout footerMarginLeft={'var(--profile-bar-width)'}>{page}</Layout>
);

export default CollectivePage;

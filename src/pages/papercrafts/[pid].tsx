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
import PapercraftDisplay from '../../components/PapercraftDisplay/PapercraftDisplay';
import { getPapercraft, papercraftKeys } from '../../supabase/api/papercrafts';
import s from '../../components/PapercraftDisplay/PapercraftDisplay.module.scss';
import { ParsedUrlQuery } from 'node:querystring';
import { NextSeo } from 'next-seo';
import FallbackOverlay from '../../components/FallbackOverlay/FallbackOverlay';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { Database } from '../../supabase/API';
import supabaseClient from '../../supabase/client';

/* -------------------------------------------------------------------------- */
/*                                   TYPING                                   */
/* -------------------------------------------------------------------------- */
interface PapercraftPageProps {
  pid: string;
}
interface QParams extends ParsedUrlQuery {
  pid?: string;
}

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

const PapercraftPage: NextPage<PapercraftPageProps> = function PapercraftPage({
  pid,
}) {
  const { supabaseClient } = useSessionContext();
  // use a fallback loading indicator
  const router = useRouter();
  // get the cached papercraft query. we will also re-get the papercraft likes
  const papercraft = useQuery(
    papercraftKeys.get(pid),
    () => getPapercraft(supabaseClient)(pid),
    {
      enabled: !!pid,
    }
  );

  return (
    <>
      <Head>
        <title>{`${papercraft.data?.title} - paperarium`}</title>
        <meta property="og:url" content={router.asPath} />
        <NextSeo
          canonical={`https://paperarium.place/papercrafts/${pid}`}
          description={'edit your profile here.'}
          title={papercraft.data ? `${papercraft.data.title}` : undefined}
          openGraph={{
            url: router.basePath,
            title: papercraft.data
              ? `${papercraft.data.title} on paperarium`
              : undefined,
            description: papercraft.data
              ? `view @${papercraft.data.user.username}'s ${papercraft.data.title} on paperarium!`
              : undefined,
            images: papercraft.data
              ? papercraft.data.pictures.map((pic) => ({
                  url: `${process.env.IMGIX}/${pic.key}`,
                  width: pic.width,
                  height: pic.height,
                }))
              : undefined,
          }}
        />
      </Head>
      <div className={s.page_container}>
        {papercraft.data ? (
          <PapercraftDisplay papercraft={papercraft.data} />
        ) : null}
        <FallbackOverlay />
      </div>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                                     SSG                                    */
/* -------------------------------------------------------------------------- */

/**
 * Generate papercraft pages for all papercrafts,
 * @returns
 */
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

/**
 * Run the intiial papercraft query on the server. This only queries for public
 * papercrafts, not worrying about RLS.
 * @param context
 * @returns
 */
export const getStaticProps: GetStaticProps<
  PapercraftPageProps,
  QParams
> = async ({ params }) => {
  const queryClient = new QueryClient();
  const pid = params!.pid!;
  await queryClient.prefetchQuery(papercraftKeys.get(pid), () =>
    getPapercraft(supabaseClient)(pid)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      pid,
    },
    revalidate: false,
  };
};

export default PapercraftPage;

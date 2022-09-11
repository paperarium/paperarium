/*
 * [pid].tsx
 * author: evan kirkiles
 * created on Sun Sep 04 2022
 * 2022 the nobot space,
 */
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import PapercraftDisplay from "../../components/PapercraftDisplay/PapercraftDisplay";
import { getPapercraft, papercraftKeys } from "../../supabase/api/papercrafts";
import s from "../../components/PapercraftDisplay/PapercraftDisplay.module.scss";
import { ParsedUrlQuery } from "node:querystring";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

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
  // use a fallback loading indicator
  const router = useRouter();
  const seeFallback = useRef(router.isFallback);
  const fallbackRef = useRef<HTMLDivElement>(null);
  // get the cached papercraft query. we will also re-get the papercraft likes
  const papercraft = useQuery(
    papercraftKeys.get(pid),
    () => getPapercraft(pid),
    {
      enabled: !!pid,
    }
  );

  return (
    <>
      <Head>
        <title>{`${papercraft.data?.title} - paperarium`}</title>
        <meta property="og:url" content={router.asPath} />
        <meta property="og:type" content="website" />
        {/* <meta property="fb:app_id" content="your fb id" /> */}
        <meta
          property="og:title"
          content={`${papercraft.data?.title} on paperarium`}
        />
        <meta
          property="og:description"
          content="a modern compendium and community for everything papercrafting."
        />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:image"
          content={`${process.env.IMGIX}/${papercraft.data?.pictures[0]}`}
        />
      </Head>
      <div className={s.page_container}>
        {papercraft.data ? (
          <PapercraftDisplay papercraft={papercraft.data} />
        ) : null}
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
    getPapercraft(pid)
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
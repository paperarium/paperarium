import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { NextPage, } from "next";
import Head from "next/head";
import s from "../styles/Explore.module.scss";
import { listPapercrafts } from "../supabase/api/papercrafts";
import PapercraftGallery from "../components/PapercraftGallery/PapercraftGallery";

const ExplorePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>explore - paperarium</title>
        <meta
          name="description"
          content="see other papercrafts from the community."
        />
      </Head>
      <div className={s.main_grid}>
        <PapercraftGallery>
        </PapercraftGallery>
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
  await queryClient.prefetchQuery(["papercrafts", { search: "" }], () =>
    listPapercrafts({ search: "" })
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

export default ExplorePage;

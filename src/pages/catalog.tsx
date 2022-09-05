import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import PapercraftCard from "../components/PapercraftCard/PapercraftCard";
import s from "../styles/Explore.module.scss";
import { useState } from "react";
import Layout from "../components/Layout/Layout";
import {
  listPapercrafts,
  searchPapercrafts,
} from "../supabase/api/papercrafts";
import PapercraftGallery from "../components/PapercraftGallery/PapercraftGallery";

const ExplorePage: NextPage = () => {
  const [search, setSearch] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>(search);
  const papercrafts = useQuery(["papercrafts", { search: currentSearch }], () =>
    searchPapercrafts(currentSearch)
  );

  return (
    <>
      <Head>
        <title>explore - paperarium</title>
        <meta
          name="description"
          content="see other papercrafts from the community."
        />
      </Head>
      <div className={s.search_container}>
        search
        <input
          type="text"
          className={s.search_bar}
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setCurrentSearch(search);
            }
          }}
        />
        filter by tag
      </div>
      <div className={s.main_grid}>
        <PapercraftGallery>
          {papercrafts.data
            ? papercrafts.data.map((papercraft) => (
                <PapercraftCard key={papercraft!.id} papercraft={papercraft} />
              ))
            : null}
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
  await queryClient.prefetchQuery(["papercrafts", ""], listPapercrafts);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
}

(ExplorePage as any).getLayout = (page: React.ReactNode) => (
  <Layout footerMarginLeft={"var(--search-bar-width)"}>{page}</Layout>
);

export default ExplorePage;

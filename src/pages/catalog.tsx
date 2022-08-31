import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import PapercraftCard from "../components/PapercraftCard/PapercraftCard";
import s from "../styles/Explore.module.scss";
import { useState } from "react";
import {
  supabaseClient,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";
import { Papercraft } from "../types/supabase";

const fetchPapercrafts = async (search: string) => {
  const { data: papercrafts, error } = await supabaseClient
    .from<Papercraft>("papercrafts")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return papercrafts;
};

const ExplorePage: NextPage = () => {
  const [search, setSearch] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>(search);
  const papercrafts = useQuery(["papercrafts", currentSearch], () =>
    fetchPapercrafts(currentSearch)
  );

  return (
    <>
      <Head>
        <title>explore - papercraft club</title>
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
        {papercrafts.data
          ? papercrafts.data.map((papercraft) => (
              <PapercraftCard key={papercraft!.id} papercraft={papercraft} />
            ))
          : null}
        {papercrafts.data
          ? papercrafts.data.map((papercraft) => (
              <PapercraftCard key={papercraft!.id} papercraft={papercraft} />
            ))
          : null}
      </div>
    </>
  );
};

/**
 * Run the intiial papercraft query on the server.
 * @param context
 * @returns
 */
export async function getStaticProps(context: any) { 
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["papercrafts", ""], async () => {
    const { data: papercrafts, error } = await supabaseServerClient(context)
      .from<Papercraft>("papercrafts")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) throw error;
    return papercrafts;
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
}

export default ExplorePage;

import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { API } from "@aws-amplify/api";
import { Auth } from "@aws-amplify/auth";
import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import PapercraftCard from "../components/PapercraftCard/PapercraftCard";
import s from "../styles/Explore.module.scss";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import * as APIt from "../API";
import { listPapercrafts, searchPapercrafts } from "../graphql/custom-queries";
import { useState } from "react";
import useDebounce from "../util/useDebounce";
import { APIClass, withSSRContext } from "aws-amplify";

const getPapercrafts = async (api: typeof API, search: string) => {
  const { data } = (await api.graphql({
    ...graphqlOperation(searchPapercrafts, {
      filter: {
        title:
          search !== ""
            ? {
                wildcard: `*${search}*`,
              }
            : {
                exists: true,
              },
      },
      sort: [
        {
          field: "createdAt",
          direction: "asc",
        },
      ],
    }),
    authMode: "API_KEY",
  })) as GraphQLResult<APIt.SearchPapercraftsPCPQuery>;
  return data;
};

const ExplorePage: NextPage = () => {
  const [search, setSearch] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>(search);
  const papercrafts = useQuery(["papercrafts", currentSearch], () =>
    getPapercrafts(API, currentSearch)
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
        {papercrafts.data?.searchPapercrafts
          ? papercrafts.data.searchPapercrafts.items.map((papercraft) => (
              <PapercraftCard
                key={papercraft!.id}
                papercraft={papercraft as APIt.Papercraft}
              />
            ))
          : null}
        {papercrafts.data?.searchPapercrafts
          ? papercrafts.data.searchPapercrafts.items.map((papercraft) => (
              <PapercraftCard
                key={papercraft!.id}
                papercraft={papercraft as APIt.Papercraft}
              />
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
export async function getStaticProps(context: NextPageContext) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["papercrafts", ""], () =>
    getPapercrafts(API, "")
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10
  };
}

export default ExplorePage;

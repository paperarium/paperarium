import { useQuery } from "@tanstack/react-query";
import { API } from "@aws-amplify/api";
import { Auth } from "@aws-amplify/auth";
import type { NextPage } from "next";
import Head from "next/head";
import PapercraftCard from "../components/PapercraftCard/PapercraftCard";
import s from "../styles/Explore.module.scss";
import { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import * as APIt from "../API";
import { listPapercrafts } from "../graphql/custom-queries";

const ExplorePage: NextPage = () => {
  const papercrafts = useQuery([], async () => {
    const { data } = (await API.graphql(
      graphqlOperation(listPapercrafts)
    )) as GraphQLResult<APIt.ListPapercraftsPCPQuery>;
    return data;
  });

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
        <input type="text" className={s.search_bar} placeholder="Search" />
        filter by tag
      </div>
      <div className={s.main_grid}>
        {papercrafts.data?.listPapercrafts
          ? papercrafts.data.listPapercrafts.items.map((papercraft) => (
              <PapercraftCard
                key={papercraft!.id}
                papercraft={papercraft as APIt.Papercraft}
              />
            ))
          : null}
          {papercrafts.data?.listPapercrafts
            ? papercrafts.data.listPapercrafts.items.map((papercraft) => (
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

export default ExplorePage;

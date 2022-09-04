/*
 * [pid].tsx
 * author: evan kirkiles
 * created on Sun Sep 04 2022
 * 2022 the nobot space,
 */
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import PapercraftDisplay from "../../components/PapercraftDisplay/PapercraftDisplay";
import { getPapercraft } from "../../supabase/api/papercrafts";
import s from "../../components/PapercraftDisplay/PapercraftDisplay.module.scss";

const PapercraftPage: NextPage = function PapercraftPage() {
  // get the papercraft id from the route
  const router = useRouter();
  const { pid } = router.query;
  // run the query
  const papercraft = useQuery(
    ["papercraft", pid],
    () => getPapercraft(parseInt(pid! as string)),
    { enabled: !!pid }
  );

  return (
    <>
      <Head>
        <title>{} - papercraft club</title>
      </Head>
      <div className={s.page_container}>
        <PapercraftDisplay papercraft={papercraft.data} />
      </div>
    </>
  );
};

export default PapercraftPage;

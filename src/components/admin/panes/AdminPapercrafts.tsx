import { supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient, useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AdminPaneProps } from "..";
import * as APIt from "../../../supabase/types";
import s from "../../../styles/admin/Admin.module.scss";
import {
  getPapercraft,
  listPapercrafts,
  papercraftKeys,
} from "../../../supabase/api/papercrafts";
import PapercraftDisplay from "../../PapercraftDisplay/PapercraftDisplay";
import Imgix from "react-imgix";
import OptimizedImage from "../../OptimizedImage/OptimizedImage";

/**
 * The home page for admin papercraft activities
 * @returns
 */
const AdminPapercraftsPane: React.FC<AdminPaneProps> = ({
  activeProfile,
  setActiveProfile,
}) => {
  // search for papercrafts
  const [search, setSearch] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>(search);
  const [currPapercraft, setCurrPapercraft] = useState<APIt.Papercraft | null>(
    null
  );
  const papercrafts = useQuery(
    ["admin", "papercrafts", { search: currentSearch }],
    () => listPapercrafts({ search: currentSearch })
  );
  const selectedPapercraft = useQuery(
    ["admin", papercraftKeys.get(currPapercraft?.id || "")],
    () => getPapercraft(currPapercraft!.id),
    { enabled: !!currPapercraft }
  );

  return (
    <>
      <Head>
        <title>admin.papercrafts - paperarium</title>
        <meta name="description" content="about us." />
      </Head>
      <div className={s.container}>
        <div className={s.query_col}>
          PAPERCRAFTS
          <input
            type="text"
            value={search}
            placeholder={"Search by title..."}
            className={s.search_bar}
            autoComplete={"off"}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setCurrentSearch(search);
              }
            }}
          />
          <div className={s.results_container}>
            {papercrafts.data
              ? papercrafts.data.map((papercraft) => (
                  <div
                    className={`${s.result} ${
                      currPapercraft && currPapercraft.id === papercraft.id
                        ? "active"
                        : null
                    }`}
                    key={papercraft.id}
                    onClick={() => setCurrPapercraft(papercraft)}
                  >
                    <div className={s.result_pic}>
                      <OptimizedImage
                        src={papercraft.pictures[0].key}
                        className={s.inner_image}
                        sizes={`20px`}
                      />
                    </div>
                    {papercraft.title}
                    <div className={s.result_username}>
                      @{papercraft.user.username}
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className={s.control_col}>
          {selectedPapercraft.data ? (
            <PapercraftDisplay papercraft={selectedPapercraft.data} />
          ) : (
            <div>SELECT A PAPERCRAFT TO SHOW IT HERE</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPapercraftsPane;

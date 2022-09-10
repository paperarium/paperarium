import { supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient, useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AdminPaneProps } from "..";
import * as APIt from "../../../supabase/types";
import s from "../../../styles/admin/Admin.module.scss";
import { buildKeys, listBuilds } from "../../../supabase/api/builds";
import OptimizedImage from "../../OptimizedImage/OptimizedImage";
import PapercraftDisplay from "../../PapercraftDisplay/PapercraftDisplay";
import {
  getPapercraft,
  papercraftKeys,
} from "../../../supabase/api/papercrafts";

/**
 * The home page for admin papercraft activities
 * @returns
 */
const AdminBuildsPane: React.FC<AdminPaneProps> = ({
  activeProfile,
  setActiveProfile,
}) => {
  // search for builds
  const [search, setSearch] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>(search);
  const [currBuild, setCurrBuild] = useState<APIt.Build | null>(null);
  const builds = useQuery(
    ["admin", ...buildKeys.list({ search: currentSearch })],
    () => listBuilds({ search: currentSearch })
  );
  const selectedPapercraft = useQuery(
    ["admin", papercraftKeys.get(currBuild?.papercraft_id || "")],
    () => getPapercraft(currBuild!.papercraft_id),
    { enabled: !!currBuild }
  );

  return (
    <>
      <Head>
        <title>admin.builds - paperarium</title>
        <meta name="description" content="about us." />
      </Head>
      <div className={s.container}>
        <div className={s.query_col}>
          BUILDS
          <input
            type="text"
            value={search}
            placeholder={"Search by title..."}
            className={s.search_bar}
            autoComplete={"off"}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setCurrentSearch(search);
              }
            }}
          />
          <div className={s.results_container}>
            {builds.data
              ? builds.data.map((build) => (
                  <div
                    className={`${s.result} ${
                      currBuild && currBuild.id === build.id ? "active" : null
                    }`}
                    key={build.id}
                    onClick={() => setCurrBuild(build)}
                  >
                    <div className={s.result_pic}>
                      <OptimizedImage
                        src={build.pictures[0].key}
                        className={s.inner_image}
                        sizes={`20px`}
                      />
                    </div>
                    {build.papercraft.title}
                    <div className={s.result_username}>
                      @{build.user.username}
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
            <div>SELECT A BUILD TO SHOW IT HERE</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminBuildsPane;

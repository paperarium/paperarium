import { supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import { QueryClient, useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AdminPaneProps } from "..";
import * as APIt from "../../../supabase/types";
import s from "../../../styles/admin/Admin.module.scss";
import { listBuilds } from "../../../supabase/api/builds";

/**
 * The home page for admin papercraft activities
 * @returns
 */
const AdminBuildsPane: React.FC<AdminPaneProps> = ({
  currProfile,
  setCurrProfile,
}) => {
  // search for builds
  const [search, setSearch] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>(search);
  const [currBuild, setCurrBuild] = useState<APIt.Build | null>(null);
  const builds = useQuery(
    ["admin", "builds", { search: currentSearch }],
    () => listBuilds({ search: currentSearch })
  );

  return (
    <>
      <Head>
        <title>admin - paperarium</title>
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
            onKeyPress={(e) => {
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
                      currBuild && currBuild.id === build.id
                        ? "active"
                        : null
                    }`}
                    key={build.id}
                    onClick={() => setCurrBuild(build)}
                  >
                    - {build.papercraft.title}
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className={s.control_col}></div>
      </div>
    </>
  );
};

export default AdminBuildsPane;

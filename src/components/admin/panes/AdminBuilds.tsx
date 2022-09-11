import { supabaseServerClient } from "@supabase/auth-helpers-nextjs";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AdminPaneProps } from "..";
import * as APIt from "../../../supabase/types";
import s from "../../../styles/admin/Admin.module.scss";
import {
  buildKeys,
  listBuilds,
  updateBuild,
} from "../../../supabase/api/builds";
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

  // queries
  const builds = useQuery(
    ["admin", ...buildKeys.list({ search: currentSearch })],
    () => listBuilds({ search: currentSearch })
  );
  const selectedPapercraft = useQuery(
    ["admin", papercraftKeys.get(currBuild?.papercraft_id || "")],
    () => getPapercraft(currBuild!.papercraft_id),
    { enabled: !!currBuild }
  );

  // mutation for transferring ownership of a build / updating it
  const queryClient = useQueryClient();
  const updateBuildMutation = useMutation(
    async ({ id, input }: { id: string; input: Partial<APIt.Papercraft> }) => {
      return updateBuild(id, input);
    },
    {
      onSuccess: (build) => {
        queryClient.invalidateQueries(["admin", buildKeys.lists]);
        queryClient.invalidateQueries([
          "admin",
          papercraftKeys.get(build[0].papercraft_id),
        ]);
      },
    }
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
          {activeProfile ? (
            <div className={s.profile_container}>
              SELECTED PROFILE
              <div className={s.profile_picture}>
                <OptimizedImage
                  src={activeProfile.avatar_url}
                  className={s.inner_image}
                  sizes={`200px`}
                />
              </div>
              <div className={s.result_username}>@{activeProfile.username}</div>
              {activeProfile.name}
              <div
                className={`${s.action_button} ${
                  currBuild &&
                  currBuild.user_id !== activeProfile.id &&
                  !updateBuildMutation.isLoading
                    ? ""
                    : "disabled"
                }`}
                onClick={() => {
                  if (!currBuild) return;
                  updateBuildMutation.mutate({
                    id: currBuild.id,
                    input: { user_id: activeProfile.id },
                  });
                }}
              >
                TRANSFER
                <br />
                OWNERSHIP
              </div>
              <div className={s.action_button_note}>
                makes @{activeProfile.username} the creator of this build.
                use this for moving archived papercrafts into their respective
                builders&apos; profiles.
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default AdminBuildsPane;

import {
  supabaseClient,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";
import { QueryClient, useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AdminPaneProps } from "..";
import s from "../../../styles/admin/Admin.module.scss";
import es from "../../../styles/Profile.module.scss";
import { listProfiles } from "../../../supabase/api/profiles";
import rectifyDateFormat from "../../../util/rectifyDateFormat";
import FormEditProfile from "../../FormEditProfile/FormEditProfile";

/**
 * The home page for admin activities
 * @returns
 */
const AdminProfilesPane: React.FC<AdminPaneProps> = ({
  currProfile,
  setCurrProfile,
}) => {
  // search for profiles
  const [search, setSearch] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>(search);
  const profiles = useQuery(
    ["admin", "profiles", { search: currentSearch }],
    () => listProfiles({ search: currentSearch })
  );

  return (
    <>
      <Head>
        <title>admin - paperarium</title>
        <meta name="description" content="about us." />
      </Head>
      <div className={s.container}>
        <div className={s.query_col}>
          PROFILES
          <input
            type="text"
            value={search}
            placeholder={"Search by profile..."}
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
            {profiles.data
              ? profiles.data.map((profile) => (
                  <div
                    className={`${s.result} ${
                      currProfile && currProfile.id === profile.id
                        ? "active"
                        : null
                    }`}
                    key={profile.id}
                    onClick={() => setCurrProfile(profile)}
                    style={{ paddingLeft: "5px" }}
                  >
                    @{profile.username}
                    <div className={s.result_username}>
                      {new Date(
                        rectifyDateFormat(profile.created_at)
                      ).toDateString()}
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div
            className={s.add_button}
            onClick={async () => {
              await supabaseClient.rpc("generate_user");
            }}
          >
            GENERATE A PROFILE
          </div>
        </div>
        <div className={s.control_col}>
          <div className={s.colored_background}>
            {currProfile ? <FormEditProfile profile={currProfile} /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfilesPane;

import {
  supabaseClient,
  supabaseServerClient,
} from "@supabase/auth-helpers-nextjs";
import * as APIt from "../../../supabase/types";
import { QueryClient, useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { AdminPaneProps } from "..";
import s from "../../../styles/admin/Admin.module.scss";
import es from "../../../styles/Profile.module.scss";
import { listProfiles } from "../../../supabase/api/profiles";
import { listTags, tagsKeys } from "../../../supabase/api/tags";
import rectifyDateFormat from "../../../util/rectifyDateFormat";
import FormEditProfile from "../../FormEditProfile/FormEditProfile";
import OptimizedImage from "../../OptimizedImage/OptimizedImage";

/**
 * The home page for admin tag activities
 * @returns
 */
const AdminTagsPane: React.FC<AdminPaneProps> = () => {
  // search for tags
  const [search, setSearch] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>(search);
  const [currTag, setCurrTag] = useState<APIt.Tag | null>(null);
  const tags = useQuery(
    ["admin", ...tagsKeys.list({ search: currentSearch })],
    () => listTags({ search: currentSearch })
  );

  return (
    <>
      <Head>
        <title>admin.tags - paperarium</title>
        <meta name="description" content="about us." />
      </Head>
      <div className={s.container}>
        <div className={s.query_col}>
          TAGS
          <input
            type="text"
            value={search}
            placeholder={"Search by tag name..."}
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
            {tags.data
              ? tags.data.map((tag) => (
                  <div
                    className={`${s.result} ${
                      currTag && currTag.id === tag.id
                        ? "active"
                        : null
                    }`}
                    key={tag.id}
                    onClick={() => setCurrTag(tag)}
                    style={{ paddingLeft: "5px"}}
                  >
                    {/* <div
                      className={s.result_pic}
                      style={{ borderRadius: "50%", overflow: "hidden" }}
                    >
                      <OptimizedImage
                        src={profile.avatar_url}
                        className={s.inner_image}
                        sizes={`20px`}
                      />
                    </div> */}
                    {tag.name}
                    <div className={s.result_username}>
                      {tag.code}
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div
            className={s.add_button}
            onClick={async () => {
              // await supabaseClient.rpc("generate_user");
            }}
          >
            ADD A TAG
          </div>
        </div>
        <div className={s.control_col}>
          <div className={s.colored_background}>
            {currTag ? currTag.name : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTagsPane;

/*
 * profile.tsx
 * author: evan kirkiles
 * created on Tue Aug 23 2022
 * 2022 papercraft club
 */

import { NextPage } from "next";
import Head from "next/head";
import es from "../styles/Explore.module.scss";
import s from "../styles/Profile.module.scss";
import { useRouter } from "next/router";
import {
  supabaseClient,
  withPageAuth,
  User,
} from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import PapercraftCard from "../components/PapercraftCard/PapercraftCard";
import Layout from "../components/Layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { searchUserPapercrafts } from "../supabase/api/papercrafts";
import { AiOutlineDownSquare } from 'react-icons/ai';

type ProfilePageProps = {
  user: User;
};

const ProfilePage: NextPage<ProfilePageProps> = ({ user }) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>(search);
  const papercrafts = useQuery(["papercrafts", currentSearch], () =>
    searchUserPapercrafts(user.id, true, currentSearch)
  );

  return (
    <>
      <Head>
        <title>my profile - papercraft club</title>
      </Head>
      <div className={s.profile_container}>
        <div className={s.profile_bar}>
          <div className={s.profile_information}>
            <div className={s.profile_picture}>
              LS
            </div>
            <div className={s.profile_name}>
              <span className={s.user_name}>@lordstingray</span>
              <span>Lord Stingray</span>
              <span className={s.user_stat}>4 builds</span>
              <span className={s.user_stat}>3 papercrafts</span>
            </div>
          </div>
          <div className={s.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          </div>
          <div className={s.profile_button}>
            edit profile
          </div>
          <div className={s.profile_button} onClick={() => supabaseClient.auth.signOut().then(() => router.push('/'))}>
            sign out
          </div>
          <div className={s.joined_information}>
            Joined on Aug 21, 2022
          </div>
        </div>
        <div className={s.search_bar}>
          search
          <input
            type="text"
            className={es.search_bar}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setCurrentSearch(search);
              }
            }}
          />
          <AiOutlineDownSquare />
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
      </div>
    </>
  );
};

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });

(ProfilePage as any).getLayout = (page: React.ReactNode) => (
  <Layout footerMarginLeft={"var(--profile-bar-width)"}>{page}</Layout>
);

export default ProfilePage;

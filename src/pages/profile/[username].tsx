/*
 * [pid].tsx
 * author: evan kirkiles
 * created on Sun Sep 04 2022
 * 2022 the nobot space,
 */
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
  NextPageContext,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "node:querystring";
import { CSSTransition } from "react-transition-group";
import { useRef, useState } from "react";
import { getProfile } from "../../supabase/api/profiles";
import es from "../../styles/Explore.module.scss";
import s from "../../styles/profile/Profile.module.scss";
import PapercraftGallery from "../../components/PapercraftGallery/PapercraftGallery";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { AiOutlineDownSquare } from "react-icons/ai";
import PapercraftCard from "../../components/PapercraftCard/PapercraftCard";
import { searchUserPapercrafts } from "../../supabase/api/papercrafts";
import Layout from "../../components/Layout/Layout";
import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import OptimizedImage from "../../components/OptimizedImage/OptimizedImage";

/* -------------------------------------------------------------------------- */
/*                                   TYPING                                   */
/* -------------------------------------------------------------------------- */
interface ProfilePageProps {
  username: string;
}
interface QParams extends ParsedUrlQuery {
  username?: string;
}

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

const ProfilePage: NextPage<ProfilePageProps> = function ProfilePage({
  username,
}) {
  // use a fallback loading indicator
  const router = useRouter();
  const { user } = useUser();
  const seeFallback = useRef(router.isFallback);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>(search);
  // get the cached papercraft query. we will also re-get the papercraft likes
  const profile = useQuery(["profile", username], () => getProfile(username), {
    enabled: !!username,
  });
  const papercrafts = useQuery(
    ["papercraftsbyuser", username, currentSearch],
    () => searchUserPapercrafts(username, false, currentSearch),
    {
      enabled: !!username,
    }
  );

  return (
    <>
      <Head>
        <title>{`@${username} - paperarium`}</title>
        <meta property="og:url" content={router.asPath} />
        <meta property="og:type" content="website" />
        {/* <meta property="fb:app_id" content="your fb id" /> */}
        <meta
          property="og:title"
          content={`${profile.data?.username} on paperarium`}
        />
        <meta
          property="og:description"
          content="a modern compendium and community for everything papercrafting."
        />
        <meta name="twitter:card" content="summary" />
        {/* <meta property="og:image" content={`${process.env.IMGIX}/${papercraft.data?.pictures[0]}`} /> */}
      </Head>
      <div className={s.profile_container}>
        <div className={s.profile_bar}>
          <div className={s.profile_information}>
            <div className={s.profile_picture}>
              {profile.data?.avatar_url ? (
                <OptimizedImage
                  src={profile.data.avatar_url}
                  sizes={"20vw"}
                  className={s.profile_pic_image}
                />
              ) : null}
            </div>
            <div className={s.profile_name}>
              <span className={s.user_name}>@{username}</span>
              <span className={s.user_real_name}>{profile.data?.name}</span>
              <span className={s.user_stat}>
                {profile.data?.builds[0].count} builds
              </span>
              <span className={s.user_stat}>
                {profile.data?.papercrafts[0].count} papercrafts
              </span>
            </div>
          </div>
          <div className={s.description}>{profile.data?.about}</div>
          {user && user.id === profile.data?.id ? (
            <>
              <Link href="/profile/edit" passHref>
                <a className={s.profile_button}>edit profile</a>
              </Link>
              <div
                className={s.profile_button}
                onClick={() =>
                  supabaseClient.auth.signOut().then(() => router.push("/"))
                }
              >
                sign out
              </div>
            </>
          ) : null}
          <div className={s.joined_information}>Joined on Aug 21, 2022</div>
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
          <PapercraftGallery
            breakPointOverride={{
              default: 5,
              1500: 5,
              1292: 4,
              1067: 3,
              480: 2,
            }}
          >
            {papercrafts.data
              ? papercrafts.data.map((papercraft) => (
                  <PapercraftCard
                    key={papercraft!.id}
                    papercraft={papercraft}
                  />
                ))
              : null}
          </PapercraftGallery>
        </div>
        {seeFallback.current ? (
          <CSSTransition
            in={router.isFallback}
            nodeRef={fallbackRef}
            timeout={300}
          >
            <div className={s.loading_indicator} ref={fallbackRef}>
              loading...
            </div>
          </CSSTransition>
        ) : null}
      </div>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                                     SSG                                    */
/* -------------------------------------------------------------------------- */

/**
 * Generate profile pages for all profiles,
 * @returns
 */
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

/**
 * Run the intiial profile query on the server. This only queries for public
 * profiles. Any increased functionality is done on the client
 * @param context
 * @returns
 */
export const getStaticProps: GetStaticProps<
  ProfilePageProps,
  QParams
> = async ({ params }) => {
  const queryClient = new QueryClient();
  const username = params!.username!;
  await queryClient.prefetchQuery(["profile", username], () =>
    getProfile(username)
  );
  await queryClient.prefetchQuery(["papercraftsbyuser", username], () =>
    searchUserPapercrafts(username, false, "")
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      username,
    },
    revalidate: false,
  };
};

(ProfilePage as any).getLayout = (page: React.ReactNode) => (
  <Layout footerMarginLeft={"var(--profile-bar-width)"}>{page}</Layout>
);

export default ProfilePage;

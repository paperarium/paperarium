/*
 * profile.tsx
 * author: evan kirkiles
 * created on Tue Aug 23 2022
 * 2022 papercraft club
 */

import { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { useRouter } from "next/router";
import { supabaseClient, withPageAuth, User } from '@supabase/auth-helpers-nextjs';

type ProfilePageProps = {
  user: User;
};

const Profile: NextPage<ProfilePageProps> = ({ user }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>my profile - papercraft club</title>
        <meta name="description" content="your profile page." />
      </Head>
      <h1 className={styles.title}>this is the profile page.</h1>
      <p>your username is: {user.email}</p>
      <div
        onClick={() =>
          supabaseClient.auth.signOut().then(() => {
            router.push("/");
          })
        }
      >
        click here to sign out
      </div>
    </>
  );
};

export const getServerSideProps = withPageAuth({redirectTo: '/login'});

export default Profile;

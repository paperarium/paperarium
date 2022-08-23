/*
 * profile.tsx
 * author: evan kirkiles
 * created on Tue Aug 23 2022
 * 2022 papercraft club
 */

import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { withSSRContext } from "aws-amplify";
import { Auth } from "@aws-amplify/auth";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

type ProfilePageProps = {
  username: string;
};

const Profile: NextPage<ProfilePageProps> = ({ username }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>my profile - papercraft club</title>
        <meta name="description" content="your profile page." />
      </Head>
      <h1 className={styles.title}>this is the profile page.</h1>
      <p>your username is: {username}</p>
      <div
        onClick={() =>
          Auth.signOut().then(() => {
            router.push("/");
          })
        }
      >
        click here to sign out
      </div>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { Auth } = withSSRContext(context);
  try {
    const user = await Auth.currentAuthenticatedUser();
    return {
      props: {
        username: user.username,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/login?redirect=/profile",
      },
    };
  }
}

export default Profile;

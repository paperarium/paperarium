/*
 * profile.tsx
 * author: evan kirkiles
 * created on Tue Aug 23 2022
 * 2022 papercraft club
 */

import { NextPage } from "next";
import Head from "next/head";
import { Auth, CognitoUser } from '@aws-amplify/auth'
import NavBar from "../components/NavBar/NavBar";
import styles from "../styles/Home.module.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Profile: NextPage = () => {
  const [user, setUser] = useState<CognitoUser | null>(null)
  const router = useRouter()
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => setUser(user))
      // if there is no authenticated user, redirect to login page
      .catch(() => router.push('/login?redirect=profile'))
  }, []);
  if (!user) return null;
  return (
    <>
      <Head>
        <title>my profile - papercraft club</title>
        <meta name="description" content="your profile page." />
      </Head>
      <h1 className={styles.title}>this is the profile page.</h1>
      <p>your username is: {user.getUsername()}</p>
    </>
  );
};

export default Profile;

/*
 * login.tsx
 * author: evan kirkiles
 * created on Tue Aug 23 2022
 * 2022 papercraft club
 */
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import s from "../styles/Home.module.css";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const LoginPage: NextPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  return (
    <>
      <Head>
        <title>login - papercraft club</title>
        <meta name="description" content="login" />
      </Head>
      <div className={s.page_container}>
        <Authenticator />
      </div>
    </>
  );
};

export default LoginPage;

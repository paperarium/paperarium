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
import s from "../styles/Home.module.scss";
import Layout from "../components/Layout/Layout";
import Authenticator from "../components/Authenticator/Authenticator";
import { Auth } from "aws-amplify";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>login - papercraft club</title>
        <meta name="description" content="login" />
      </Head>
      <div className={s.login_page_container}>
        <Authenticator>you should now be logged in!</Authenticator>
      </div>
    </>
  );
};

(LoginPage as any).getLayout = (page: React.ReactNode) => (
  <Layout hideFooter>{page}</Layout>
);

export default LoginPage;

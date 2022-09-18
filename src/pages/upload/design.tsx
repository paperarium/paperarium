/*
 * design.tsx
 * author: evan kirkiles
 * created on Sat Sep 03 2022
 * 2022 paperarium
 */
import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import { withPageAuth, User } from "@supabase/auth-helpers-nextjs";
import FlowPapercraft from "../../components/FlowPapercraft/FlowPapercraft";

const UploadDesignPage: NextPage<{ user: User }> = ({ user }) => {
  return (
    <>
      <Head>
        <title>upload - papercraft place</title>
        <meta
          name="description"
          content="submit a papercraft for publication!"
        />
      </Head>
      <FlowPapercraft user={user} />
    </>
  );
};

// use authentication on this page
export const getServerSideProps = withPageAuth({ redirectTo: "/login" });

export default UploadDesignPage;

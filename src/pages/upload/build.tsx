/*
 * design.tsx
 * author: evan kirkiles
 * created on Sat Sep 03 2022
 * 2022 paperarium
 */
import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { withPageAuth, User } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';
import { getIsAdmin } from '../../supabase/api/profiles';
import { useQuery } from '@tanstack/react-query';
import FlowBuild from '../../components/_flows/FlowBuild/FlowBuild';

const UploadBuildPage: NextPage<{ user: User }> = ({ user }) => {
  const router = useRouter();
  const isAdmin = useQuery(['isAdmin'], () => getIsAdmin());

  return (
    <>
      <Head>
        <title>upload a build - papercraft place</title>
        <meta name="description" content="submit a papercraft build!" />
      </Head>
      <FlowBuild
        user={user}
        isAdmin={isAdmin.data}
        onSuccess={(pid, bid) => router.push(`/papercrafts/${pid}`)}
        onBackButtonClick={() => router.push(`/upload`)}
      />
    </>
  );
};

// use authentication on this page
export const getServerSideProps = withPageAuth({ redirectTo: '/login' });

export default UploadBuildPage;

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
import FlowPapercraft from '../../components/_flows/FlowPapercraft/FlowPapercraft';
import { useRouter } from 'next/router';
import { getIsAdmin } from '../../supabase/api/profiles';
import { useQuery } from '@tanstack/react-query';
import { useSessionContext } from '@supabase/auth-helpers-react';

const UploadDesignPage: NextPage<{ user: User }> = ({ user }) => {
  const { supabaseClient } = useSessionContext();
  const router = useRouter();
  const isAdmin = useQuery(['isAdmin'], () => getIsAdmin(supabaseClient)());

  return (
    <>
      <Head>
        <title>upload - papercraft place</title>
        <meta
          name="description"
          content="submit a papercraft for publication!"
        />
      </Head>
      <FlowPapercraft
        user={user}
        isAdmin={isAdmin.data}
        onSuccess={(pid) => router.push(`/papercrafts/${pid}`)}
        onBackButtonClick={() => router.push(`/upload`)}
      />
    </>
  );
};

// use authentication on this page
export const getServerSideProps = withPageAuth({ redirectTo: '/login' });

export default UploadDesignPage;

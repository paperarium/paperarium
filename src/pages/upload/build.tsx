import type { NextPage } from 'next';
import Head from 'next/head';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

const UploadBuildPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>upload - papercraft place</title>
        <meta
          name="description"
          content="submit a papercraft for publication!"
        />
      </Head>
      <div></div>
    </>
  );
};

// use authentication on this page
export const getServerSideProps = withPageAuth({ redirectTo: '/login' });

export default UploadBuildPage;

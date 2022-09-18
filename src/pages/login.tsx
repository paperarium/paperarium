/*
 * login.tsx
 * author: evan kirkiles
 * created on Tue Aug 23 2022
 * 2022 papercraft club
 */
import type { NextPage } from 'next';
import Head from 'next/head';
// import { Auth } from "@supabase/ui";
import Auth from '../components/Auth/Auth';
import { useUser } from '@supabase/auth-helpers-react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import s from '../styles/Login.module.scss';
import Layout from '../components/Layout/Layout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <>
      <Head>
        <title>login - paperarium</title>
        <meta name="description" content="login" />
      </Head>
      <div className={s.login_page_container}>
        <div className={s.login_card}>
          <Auth
            supabaseClient={supabaseClient}
            providers={['google']}
            redirectTo={'/'}
          ></Auth>
        </div>
      </div>
    </>
  );
};

// (LoginPage as any).getLayout = (page: React.ReactNode) => (
//   <Layout hideFooter>{page}</Layout>
// );

export default LoginPage;

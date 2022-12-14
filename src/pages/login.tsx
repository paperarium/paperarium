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
import { useSessionContext, useUser } from '@supabase/auth-helpers-react';
import s from '../styles/Login.module.scss';
import Layout from '../components/Layout/Layout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

const LoginPage: NextPage = () => {
  const { supabaseClient } = useSessionContext();
  const router = useRouter();
  const user = useUser();
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <>
      <Head>
        <title>login - paperarium</title>
        <NextSeo
          canonical={'https://paperarium.place/login'}
          description={'log in to paperarium.'}
        />
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

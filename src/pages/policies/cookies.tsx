/*
 * cookies.tsx
 * author: evan kirkiles
 * created on Fri Sep 09 2022
 * 2022 the nobot space,
 */
import type { NextPage } from 'next';
import Head from 'next/head';
import s from '../../styles/policies/Policies.module.scss';

const CookiesPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>privacy - paperarium</title>
        <meta name="description" content="about us." />
      </Head>
      <div className={s.container}>
        <div className={s.terms_container}>
          <h2>
            <strong>Cookie policy</strong>
          </h2>

          <p>to do.</p>
        </div>
      </div>
    </>
  );
};

export default CookiesPage;

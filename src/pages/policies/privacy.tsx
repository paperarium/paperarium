/*
 * privacy.tsx
 * author: evan kirkiles
 * created on Fri Sep 09 2022
 * 2022 the nobot space,
 */
import type { NextPage } from 'next';
import Head from 'next/head';
import s from '../../styles/policies/Policies.module.scss';
import { useEffect } from 'react';

const PrivacyPolicyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>privacy - paperarium</title>
        <meta name="description" content="about us." />
      </Head>
      <div className={s.container}>
        <iframe
          className={s.embed}
          src="https://app.termly.io/document/privacy-policy/dd621107-2523-488f-8ef4-fa512eeb0a7f"
        ></iframe>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;

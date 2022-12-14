/*
 * privacy.tsx
 * author: evan kirkiles
 * created on Fri Sep 09 2022
 * 2022 the nobot space,
 */
import type { NextPage } from 'next';
import Head from 'next/head';
import s from '../../styles/policies/Policies.module.scss';

const TermsOfUsePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>terms of use - paperarium</title>
        <meta name="description" content="about us." />
      </Head>
      <div className={s.container}>
        <div className={s.terms_container}>
          <h2>
            <strong>Terms and Conditions</strong>
          </h2>

          <p>Please be nice!</p>
          <p>
            All rights and intellectual property for the characters and models
            on this site go to their respective owners. We are in no way
            affiliated with any corporation.
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsOfUsePage;

/*
 * privacy.tsx
 * author: evan kirkiles
 * created on Fri Sep 09 2022
 * 2022 the nobot space,
 */
import type { NextPage } from "next";
import Head from "next/head";
import s from "../../styles/policies/Policies.module.scss";

const TermsOfUsePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>terms of use - paperarium</title>
        <meta name="description" content="about us." />
      </Head>
      <div className={s.container}>
        please be nice! 
        {/* <iframe
          className={s.embed}
          src="https://app.termly.io/document/terms-of-use-for-website/ec5945d4-8b9a-4e12-b300-cfc80e3e1772"
        ></iframe> */}
      </div>
    </>
  );
};

export default TermsOfUsePage;

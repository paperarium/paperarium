import type { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.scss";

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
      <h1 className={styles.title}>this is the build upload page.</h1>
    </>
  );
};

export default UploadBuildPage;

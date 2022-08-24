import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar/NavBar";
import styles from "../styles/Home.module.scss";

const UploadPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>upload - papercraft place</title>
        <meta
          name="description"
          content="submit a papercraft for publication!"
        />
      </Head>
      <h1 className={styles.title}>this is the upload page.</h1>
    </>
  );
};

export default UploadPage;

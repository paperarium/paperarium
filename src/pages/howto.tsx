import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar/NavBar";
import styles from "../styles/Home.module.scss";

const HowToPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>how to - paperarium</title>
        <meta
          name="description"
          content="a guide on how to build nice papercrafts!"
        />
      </Head>
      <h1 className={styles.title}>this is the how-to page.</h1>
    </>
  );
};

export default HowToPage;

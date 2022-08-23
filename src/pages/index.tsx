import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar/NavBar";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>papercraft place</title>
        <meta
          name="description"
          content="cut, fold, and glue 3d models into the real world!"
        />
      </Head>

      <h1 className={styles.title}>welcome to the papercraft place!</h1>
    </>
  );
};

export default Home;

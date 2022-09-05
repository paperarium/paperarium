import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>explore - paperarium</title>
        <meta
          name="description"
          content="about us."
        />
      </Head>
      <h1 className={styles.title}>this is the about page.</h1>
    </>
  );
};

export default AboutPage;


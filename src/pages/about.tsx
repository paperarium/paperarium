import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/NavBar/NavBar'
import styles from '../styles/Home.module.css'

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>explore - papercraft club</title>
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


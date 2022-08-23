import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/NavBar/NavBar'
import styles from '../styles/Home.module.css'

const ExplorePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>explore - papercraft club</title>
        <meta
          name="description"
          content="see other papercrafts from the community."
        />
      </Head>
      <h1 className={styles.title}>this is the explore page.</h1>
    </>
  );
};

export default ExplorePage;


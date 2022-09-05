import type { NextPage } from "next";
import Head from "next/head";
import PapercraftGallery from "../components/PapercraftGallery/PapercraftGallery";
import styles from "../styles/Home.module.scss";
import {
  listPapercrafts,
  searchPapercrafts,
} from "../supabase/api/papercrafts";

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>explore - paperarium</title>
        <meta name="description" content="about us." />
      </Head>
      <h1> about page</h1>
    </>
  );
};

export default AboutPage;

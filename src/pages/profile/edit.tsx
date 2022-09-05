import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Profile.module.scss";

const EditProfilePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>how to - paperarium</title>
        <meta
          name="description"
          content="a guide on how to build nice papercrafts!"
        />
      </Head>
      edit your profile here
    </>
  );
};

export default EditProfilePage;

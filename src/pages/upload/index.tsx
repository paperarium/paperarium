import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import s from "../../styles/Upload.module.scss";

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
      <div className={s.container}>
        <h1>this is the upload page.</h1>
        <Link href="/upload/design" passHref>
          <a>
            upload a design
          </a>
        </Link>
        <Link href="/upload/build" passHref>
          <a>
            upload a build
          </a>
        </Link>
      </div>

    </>
  );
};

export default UploadPage;

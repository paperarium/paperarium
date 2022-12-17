import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import s from '../../styles/Upload.module.scss';
import { IoCubeOutline, IoShapesOutline } from 'react-icons/io5';

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
        <Link href="/upload/design" legacyBehavior>
          <div className={s.half}>
            <div className={s.choice_icon}>
              <IoShapesOutline />
            </div>
            <a>upload a design</a>
          </div>
        </Link>
        <Link href="/upload/build" legacyBehavior>
          <div className={s.half}>
            <div className={s.choice_icon}>
              <IoCubeOutline />
            </div>
            <a>upload a build</a>
          </div>
        </Link>
      </div>
    </>
  );
};

// use authentication on this page
export const getServerSideProps = withPageAuth({ redirectTo: '/login' });

export default UploadPage;

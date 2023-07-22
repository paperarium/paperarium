import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';
import s from '../styles/About.module.scss';

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>about - paperarium</title>
        <NextSeo
          canonical={'https://paperarium.place/about'}
          description={'about paperarium itself.'}
        />
      </Head>
      <div className={s.login_page_container}>
        <h1>The History of Papercrafting</h1>
      </div>
    </>
  );
};

export default AboutPage;

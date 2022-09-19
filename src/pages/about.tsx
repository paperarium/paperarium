import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

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
      <h1> about page</h1>
    </>
  );
};

export default AboutPage;

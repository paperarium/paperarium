import type { NextPage } from 'next'
import Head from 'next/head'
import PapercraftCard from '../components/PapercraftCard/PapercraftCard';
import s from '../styles/Explore.module.scss'

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
      <div className={s.search_container}>
        search
        <input type="text" className={s.search_bar} placeholder="Search" />
        filter by tag
      </div>
      <div className={s.main_grid}>
        <PapercraftCard />
        <PapercraftCard />
        <PapercraftCard />
        <PapercraftCard />
        <PapercraftCard />
        <PapercraftCard />
        <PapercraftCard />
        <PapercraftCard />
      </div>
    </>
  );
};

export default ExplorePage;


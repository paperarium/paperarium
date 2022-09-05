import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import PapercraftCard from "../components/PapercraftCard/PapercraftCard";
import PapercraftGallery from "../components/PapercraftGallery/PapercraftGallery";
import s from "../styles/Home.module.scss";
import { listPapercrafts } from "../supabase/api/papercrafts";

const Home: NextPage = () => {
  const papercrafts = useQuery(["papercrafts", {}], () => listPapercrafts());
  return (
    <>
      <Head>
        <meta
          name="description"
          content="cut, fold, and glue 3d models into the real world!"
        />
      </Head>
      <div className={s.styled_container}>
        <div className={s.page_row}>
          <div className={s.page_col}>
            <div className={s.main_grid}>
              <PapercraftGallery
                breakPointOverride={{
                  default: 5,
                  1600: 5,
                  1392: 4,
                  1167: 3,
                  480: 2
                }}>
                {papercrafts.data
                  ? papercrafts.data.map((papercraft, i) => (
                      <PapercraftCard
                        key={papercraft!.id}
                        papercraft={papercraft}
                        priority={i <= 1}
                      />
                    ))
                  : null}
                  {papercrafts.data
                    ? papercrafts.data.map((papercraft, i) => (
                        <PapercraftCard
                          key={papercraft!.id}
                          papercraft={papercraft}
                          priority={i <= 1}
                        />
                      ))
                    : null}
                    {papercrafts.data
                      ? papercrafts.data.map((papercraft, i) => (
                          <PapercraftCard
                            key={papercraft!.id}
                            papercraft={papercraft}
                            priority={i <= 1}
                          />
                        ))
                      : null}
                      {papercrafts.data
                        ? papercrafts.data.map((papercraft, i) => (
                            <PapercraftCard
                              key={papercraft!.id}
                              papercraft={papercraft}
                              priority={i <= 1}
                            />
                          ))
                        : null}
              </PapercraftGallery>
            </div>
          </div>
          <div className={s.divider}></div>
          <div className={s.page_col}>
            <div className={s.content_container}>
              <i>
                <h1>
                  welcome to the <br />
                  <span className={s.title_big}>paperarium</span>.
                </h1>
              </i>
              <p>
                here you can explore both original and unofficial fan-made 3d
                models you can print out and assemble in real life, for free.
                after printing, just follow the three steps:
              </p>
              <ol>
                <li>cut out each piece...</li>
                <li>fold along the dotted lines...</li>
                <li>and glue the pieces together.</li>
              </ol>
              <p>
                then you will have a little figurine of the model you can love
                forever! (づ◔ ͜ʖ◔)づ if you are really creative, see if you can
                design your own papercraft and contribute to our community. we
                have written guides to help you on your way.
              </p>
              <p>
                are you interested to see the catalog? click here and check it
                out ❦
              </p>
              <Link href="/catalog">
                <div className={s.continue_button}>CATALOG</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/**
 * Run the intiial papercraft query on the server. This only queries for public
 * papercrafts, not worrying about RLS.
 * @param context
 * @returns
 */
export async function getStaticProps(context: any) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["papercrafts", ""], async () => {
    return await listPapercrafts();
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
}

export default Home;

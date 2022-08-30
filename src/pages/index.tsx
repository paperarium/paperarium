import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import s from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>papercraft place</title>
        <meta
          name="description"
          content="cut, fold, and glue 3d models into the real world!"
        />
      </Head>
      <div className={s.styled_container}>
        <div className={s.page_row}>
          <div className={s.page_col}>
            <div className={s.content_container}>
              some more content goes here.
            </div>
          </div>
          <div className={s.page_col}>
            <div className={s.content_container}>
              <h1>welcome to our paper world.</h1>
              <p>
                here you can explore original or unofficial fan-made 3d models
                you can print out and assemble in real life, for free. after
                printing, just follow the three steps:
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
              <Link href="/explore">
                <div className={s.continue_button}>EXPLORE</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

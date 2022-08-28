/*
 * _app.tsx
 * author: evan kirkiles
 * created on Tue Aug 23 2022
 * 2022 papercraft club
 */
import type { AppProps } from "next/app";
import { Amplify } from "@aws-amplify/core";
import awsExports from "../aws-exports";
import "@aws-amplify/ui-react/styles.css"; // default theme
import "../styles/globals.scss";
import "../styles/fonts.scss";
import "../components/AuthCard/AuthCard.scss";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Layout from "../components/Layout/Layout";
import { Authenticator } from "@aws-amplify/ui-react";
import { NextPage } from "next";
import React from "react";

// Configure Amplify + redux state listener
Amplify.configure({
  ...awsExports,
  ssr: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as any).getLayout || ((page: React.ReactNode) => <Layout>{page}</Layout>);
  return (
    <Authenticator.Provider>
      {getLayout(<Component {...pageProps} />)}
    </Authenticator.Provider>
  );
}

export default MyApp;

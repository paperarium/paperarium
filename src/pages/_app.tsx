/*
 * _app.tsx
 * author: evan kirkiles
 * created on Tue Aug 23 2022
 * 2022 papercraft club
 */
import type { AppProps } from "next/app";
import { Amplify } from "@aws-amplify/core";
import awsExports from "../aws-exports";
import "../styles/globals.scss";
import "../styles/fonts.scss";
import Layout from "../components/Layout/Layout";

// Configure Amplify + redux state listener
Amplify.configure({
  ...awsExports,
  ssr: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  );
}

export default MyApp;

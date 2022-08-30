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
import "../components/Authenticator/Authenticator.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Layout from "../components/Layout/Layout";
import { Authenticator } from "@aws-amplify/ui-react";
import { NextPage } from "next";
import { Hub } from "@aws-amplify/core";
import { Auth } from "@aws-amplify/auth";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Configure Amplify
Amplify.configure({
  ...awsExports,
  ssr: true,
});

// on no user logged in, just use API key for requests
// Hub.listen('auth', async (authState) => {
//   try {
//     await Auth.currentAuthenticatedUser();
//     Amplify.configure({
//       aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS"
//     });
//   } catch {
//     Amplify.configure({
//       aws_appsync_authenticationType: "API_KEY"
//     });
//   }
// });

// configure react-query
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout =
    (Component as any).getLayout ||
    ((page: React.ReactNode) => <Layout>{page}</Layout>);
  return (
    <Authenticator.Provider>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </Authenticator.Provider>
  );
}

export default MyApp;

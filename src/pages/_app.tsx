/*
 * _app.tsx
 * author: evan kirkiles
 * created on Tue Aug 23 2022
 * 2022 papercraft club
 */
import type { AppProps } from "next/app";
import "../styles/globals.scss";
import "../styles/fonts.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { UserProvider } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import Layout from "../components/Layout/Layout";
import { NextPage } from "next";
import React from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// configure react-query

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const getLayout =
    (Component as any).getLayout ||
    ((page: React.ReactNode) => <Layout>{page}</Layout>);
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <Hydrate state={pageProps.dehydratedState}>
          {getLayout(<Component {...pageProps} />)}
        </Hydrate>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;

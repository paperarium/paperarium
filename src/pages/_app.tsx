/*
 * _app.tsx
 * author: evan kirkiles
 * created on Tue Aug 23 2022
 * 2022 papercraft club
 */
import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import '../styles/fonts.scss';
import '../styles/lazyloadimgs.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import { ImgixProvider } from 'react-imgix';
import { UserProvider } from '@supabase/auth-helpers-react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import Layout from '../components/Layout/Layout';
import React, { useEffect, useState } from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import SEO from '../../next-seo.config';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const getLayout =
    (Component as any).getLayout ||
    ((page: React.ReactNode) => <Layout>{page}</Layout>);

  // prevent focus zoom on input fields
  const [disableInputZoom, setDisableInputZoom] = useState(false);
  useEffect(() => {
    // check if on iOS
    if (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    ) {
      setDisableInputZoom(true);
    }
  }, [setDisableInputZoom]);

  return (
    <>
      <Head>
        {/* <!-- Viewport --> */}
        <meta
          name="viewport"
          content={`width=device-width, initial-scale=1${
            disableInputZoom ? ', maximum-scale=1.0' : ''
          }`}
        />
      </Head>
      <DefaultSeo {...SEO} />
      <ImgixProvider domain={process.env.IMGIX}>
        <UserProvider supabaseClient={supabaseClient}>
          <QueryClientProvider client={queryClient} contextSharing={true}>
            <Hydrate state={pageProps.dehydratedState}>
              {getLayout(<Component {...pageProps} />)}
            </Hydrate>
          </QueryClientProvider>
        </UserProvider>
      </ImgixProvider>
    </>
  );
}

export default MyApp;

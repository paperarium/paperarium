/*
 * _document.tsx
 * author: evan kirkiles
 * created on Tue Aug 23 2022
 * 2022 papercraft club
 */
import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="title" content="paperarium"></meta>
          <meta
            name="description"
            content="a modern compendium and community for everything papercrafting."
          ></meta>
          <meta
            name="keywords"
            content="art, artist, painting, paper, papercraft, papercrafting, scissors, cut, glue, fold, visuals, graphic design, blender, 3d, 2d, concept, sculpture, game, video, videogame "
          ></meta>
          <meta name="robots" content="index, follow"></meta>
          <meta
            httpEquiv="Content-Type"
            content="text/html; charset=utf-8"
          ></meta>
          <meta name="language" content="en-us"></meta>
          <meta name="author" content="evan kirkiles"></meta>
          <meta name="apple-mobile-web-app-title" content="papercraft club" />
          <meta name="application-name" content="papercraft club" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          {/* <Script
            type="text/javascript"
            src="https://app.termly.io/embed.min.js"
            data-auto-block="on"
            data-website-uuid="f2ea0f83-ff36-4cd4-8567-feb699b6a45e"
            strategy="beforeInteractive"
          /> */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6b9a74" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

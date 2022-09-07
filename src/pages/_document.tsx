/*
 * _document.tsx
 * author: evan kirkiles
 * created on Tue Aug 23 2022
 * 2022 papercraft club
 */
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      // <!-- eslint-disable max-len array-element-newline -->
      <Html>
        <Head>
          {/* META */}
          <meta lang="en" />
          <meta name="language" content="en-us"></meta>
          <meta name="author" content="evan kirkiles"></meta>

          {/* <!-- Primary Meta Tags --> */}
          <meta name="title" content="Paperarium – a papercraft compendium." />
          <meta name="description" content="a modern archive and community for everything papercrafting. cut, fold, and glue pieces together into figurines of all of your favorite characters!"/>
          <meta name="keywords" content="art, artist, painting, paper, papercraft, papercrafting, scissors, cut, glue, fold, visuals, graphic design, blender, 3d, 2d, concept, sculpture, game, video, videogame "></meta>

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.paperarium.place/" />
          <meta property="og:title" content="Paperarium – a papercraft compendium." />
          <meta property="og:description" content="a modern archive and community for everything papercrafting. cut, fold, and glue pieces together into figurines of all of your favorite characters!" />
          <meta property="og:image" content="" />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://www.paperarium.place/" />
          <meta property="twitter:title" content="Paperarium – a papercraft compendium."/>
          <meta property="twitter:description" content="a modern archive and community for everything papercrafting. cut, fold, and glue pieces together into figurines of all of your favorite characters!"/>
          <meta property="twitter:image" content=""></meta>

          {/* <!-- Robots --> */}
          <meta name="robots" content="index, follow"></meta>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"></meta>

          {/* <!-- Favicon --> */}
          <link rel="icon" href="/favicon.ico" />
          <meta name="apple-mobile-web-app-title" content="papercraft club" />
          <meta name="application-name" content="papercraft club" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff"></meta>
          {/* <Script
            type="text/javascript"
            src="https://app.termly.io/embed.min.js"
            data-auto-block="on"
            data-website-uuid="f2ea0f83-ff36-4cd4-8567-feb699b6a45e"
            strategy="beforeInteractive"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
      // <!-- eslint-enable max-len array-element-newline -->
    );
  }
}

export default MyDocument;

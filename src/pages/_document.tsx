/*
 * _document.tsx
 * author: evan kirkiles
 * created on Tue Aug 23 2022
 * 2022 papercraft club
 */
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Kosugi+Maru:wght@400&display=optional"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta name="title" content="papercraft club"></meta>
          <meta name="description" content="big brains in little bodies, from an art space with cyber qualities. bridging the gap between the digital world and the physical world, one byte at a time."></meta>
          <meta name="keywords" content="art, artist, painting, robots, tech, robots, automation, visuals, graphic design, blender, 3d, 2d, concept, sculpture, game, video, "></meta>
          <meta name="robots" content="index, follow"></meta>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"></meta>
          <meta name="language" content="en-us"></meta>
          <meta name="author" content="evan kirkiles"></meta>
          <meta name="apple-mobile-web-app-title" content="papercraft club" />
          <meta name="application-name" content="papercraft club" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffffff" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;
/*
 * Layout.tsx
 * author: evan kirkiles
 * created on Tue Aug 23 2022
 * 2022 the nobot space,
 */
import React from "react";
import NavBar from "../NavBar/NavBar";
import s from "./Layout.module.scss";

type LayoutProps = {
  children: React.ReactNode;
  hideFooter?: boolean;
};

const Layout: React.FC<LayoutProps> = function Layout({
  children,
  hideFooter,
}) {
  return (
    <>
      <main className={s.main}>
        <NavBar />
        {/* <Cursor /> */}
        {children}
      </main>
      {!hideFooter ? (
        <footer className={s.footer}>
          <a
            href="https://evankirkiles.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            website designed by evan kirkiles
          </a>
          <button
            className="termly-cookie-preference-button"
            type="button"
            style={{
              background: "white",
              width: "165px",
              height: "30px",
              borderRadius: "3px",
              border: "1px solid #5f7d9c",
              fontSize: "10px",
              color: "#5f7d9c",
              cursor: "pointer",
              outline: "none",
              padding: "0",
            }}
            // @ts-ignore
            onClick={() => displayPreferenceModal()}
          >
            Manage Cookie Preferences
          </button>
        </footer>
      ) : null}
    </>
  );
};

export default Layout;
